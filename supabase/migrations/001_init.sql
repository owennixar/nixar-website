-- Nixar Agency Portal — initial schema
-- Tables: clients, visitors, events, meta_campaigns, meta_insights, contracts, meetings, admin_users
-- RLS: locked down to admin_users allow-list; service_role bypasses for server writes

set search_path = public;

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- ============================================================
-- admin_users: allow-list of humans who can see the dashboard
-- ============================================================
create table if not exists admin_users (
  email       text primary key,
  name        text,
  role        text not null default 'admin',
  created_at  timestamptz not null default now()
);

-- ============================================================
-- clients: one row per agency client (including Nixar itself)
-- ============================================================
create table if not exists clients (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  name                text not null,
  website             text,
  meta_ad_account_id  text,
  meta_pixel_id       text,
  meta_business_id    text,
  status              text not null default 'active',
  created_at          timestamptz not null default now()
);

create index if not exists clients_status_idx on clients(status);

-- ============================================================
-- visitors: one row per signed nx_vid cookie, with attribution
-- ============================================================
create table if not exists visitors (
  visitor_id    text primary key,
  client_id     uuid references clients(id) on delete set null,
  first_seen    timestamptz not null default now(),
  last_seen     timestamptz not null default now(),
  fbclid        text,
  gclid         text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  utm_term      text,
  referrer      text,
  ua            text,
  country       text,
  event_count   int not null default 0
);

create index if not exists visitors_client_idx   on visitors(client_id);
create index if not exists visitors_fbclid_idx   on visitors(fbclid) where fbclid is not null;
create index if not exists visitors_utm_src_idx  on visitors(utm_source) where utm_source is not null;
create index if not exists visitors_last_seen    on visitors(last_seen desc);

-- ============================================================
-- events: every pageview / click / form_submit etc.
-- ============================================================
create table if not exists events (
  id          uuid primary key default gen_random_uuid(),
  visitor_id  text not null references visitors(visitor_id) on delete cascade,
  client_id   uuid references clients(id) on delete set null,
  type        text not null,
  path        text not null,
  referrer    text,
  ua          text,
  props       jsonb not null default '{}'::jsonb,
  ts          timestamptz not null default now()
);

create index if not exists events_visitor_idx on events(visitor_id);
create index if not exists events_client_ts   on events(client_id, ts desc);
create index if not exists events_type_ts     on events(type, ts desc);
create index if not exists events_ts          on events(ts desc);

-- ============================================================
-- meta_campaigns: pulled from Meta Marketing API nightly
-- ============================================================
create table if not exists meta_campaigns (
  id              text primary key,
  client_id       uuid references clients(id) on delete cascade,
  name            text,
  objective       text,
  status          text,
  daily_budget    numeric,
  lifetime_budget numeric,
  start_time      timestamptz,
  stop_time       timestamptz,
  raw             jsonb,
  synced_at       timestamptz not null default now()
);

create index if not exists meta_campaigns_client on meta_campaigns(client_id);

-- ============================================================
-- meta_insights: per-day per-ad performance snapshot
-- ============================================================
create table if not exists meta_insights (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid references clients(id) on delete cascade,
  campaign_id     text,
  adset_id        text,
  ad_id           text,
  date_start      date not null,
  date_stop       date not null,
  spend           numeric,
  impressions     bigint,
  reach           bigint,
  clicks          bigint,
  unique_clicks   bigint,
  ctr             numeric,
  cpc             numeric,
  cpm             numeric,
  frequency       numeric,
  conversions     bigint,
  conv_value      numeric,
  actions         jsonb,
  action_values   jsonb,
  raw             jsonb,
  synced_at       timestamptz not null default now(),
  unique(client_id, campaign_id, adset_id, ad_id, date_start)
);

create index if not exists meta_insights_client_date on meta_insights(client_id, date_start desc);
create index if not exists meta_insights_campaign    on meta_insights(campaign_id);

-- ============================================================
-- contracts: YAML frontmatter mirror from vault
-- ============================================================
create table if not exists contracts (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid not null references clients(id) on delete cascade,
  start_date      date,
  end_date        date,
  monthly_value   numeric,
  services        text[],
  status          text not null default 'active',
  obsidian_path   text,
  created_at      timestamptz not null default now()
);

create index if not exists contracts_client on contracts(client_id);

-- ============================================================
-- meetings: imported from Fathom/Otter
-- ============================================================
create table if not exists meetings (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid references clients(id) on delete set null,
  meeting_date    timestamptz,
  title           text,
  transcript_path text,
  summary         text,
  attendees       text[],
  source          text,
  created_at      timestamptz not null default now()
);

create index if not exists meetings_client_date on meetings(client_id, meeting_date desc);

-- ============================================================
-- consent_log: append-only record of consent decisions (GDPR)
-- ============================================================
create table if not exists consent_log (
  id          uuid primary key default gen_random_uuid(),
  visitor_id  text not null,
  analytics   text not null,
  marketing   text not null,
  ip_hash     text,
  ua          text,
  ts          timestamptz not null default now()
);

create index if not exists consent_log_visitor on consent_log(visitor_id, ts desc);

-- ============================================================
-- RLS: lock everything. Service role bypasses automatically.
-- ============================================================
alter table admin_users     enable row level security;
alter table clients         enable row level security;
alter table visitors        enable row level security;
alter table events          enable row level security;
alter table meta_campaigns  enable row level security;
alter table meta_insights   enable row level security;
alter table contracts       enable row level security;
alter table meetings        enable row level security;
alter table consent_log     enable row level security;

-- Helper: is the current authed user on the admin allow-list?
create or replace function is_admin() returns boolean
  language sql stable
  security definer
  set search_path = public
as $$
  select exists (
    select 1 from admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- Admins can read everything
create policy "admins read admin_users"    on admin_users    for select using (is_admin());
create policy "admins read clients"        on clients        for select using (is_admin());
create policy "admins read visitors"       on visitors       for select using (is_admin());
create policy "admins read events"         on events         for select using (is_admin());
create policy "admins read meta_campaigns" on meta_campaigns for select using (is_admin());
create policy "admins read meta_insights"  on meta_insights  for select using (is_admin());
create policy "admins read contracts"      on contracts      for select using (is_admin());
create policy "admins read meetings"       on meetings       for select using (is_admin());
create policy "admins read consent_log"    on consent_log    for select using (is_admin());

-- No anon insert/update/delete policies: only service_role can write.

-- Seed Nixar as the first client (for dogfooding)
insert into clients (slug, name, website, status)
values ('nixar', 'Nixar Solutions', 'https://nixarsolutions.com', 'active')
on conflict (slug) do nothing;
