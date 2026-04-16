# Nixar Analytics & Agency Dashboard — Handoff Doc

**Date:** 2026-04-16
**Status:** Foundation complete. Env vars not yet pushed to Netlify → production is NOT recording data yet.
**Pick up here in a fresh Claude Code context.**

---

## 1. Context — what this project is

Private, self-hosted analytics + agency command center built INTO the Nixar marketing site (`nixarsolutions.com`). The goals:

1. **First-party visitor tracking.** Every visitor gets a signed cookie (`nx_vid`). Every pageview / click / scroll / form submit writes to our own Supabase. No Google Analytics. No third-party sharing. Ever.
2. **Jira-level internal dashboard at `/admin`** — so Anwar and Owen (only) can see in real time: who's visiting, from where, what they're doing, and who converted.
3. **Per-page heatmaps** — click heatmap + scroll heatmap overlaid on page screenshots.
4. **Meta ad outcome tracking** — CAPI events go outbound (respecting consent); Meta Marketing API pulls ad spend/results inbound via hourly cron. Appears in dashboard as "channel ROI."

**Primary conversion = form submission.** Free Audit, Contact, and Newsletter forms all fire `form_submit` events with PII (email/phone → server-hashed for CAPI).

**Access control:** Only `anwarm@nixarsolutions.com` and `owen@nixarsolutions.com` can log into `/admin`. Supabase OTP + allowlist against `admin_users` table.

---

## 2. Current state — what's live

### ✅ Already built (on `foundation` branch, pushed to `owennixar/nixar-website`)

**Tracking layer (code only — not recording in prod yet because env vars missing):**
- Signed `nx_vid` cookie, HMAC-SHA256, host-only, 1-year, `Secure HttpOnly SameSite=Lax` → [src/middleware.ts](src/middleware.ts)
- GDPR consent banner with separate analytics + marketing toggles → [src/components/analytics/ConsentBanner.tsx](src/components/analytics/ConsentBanner.tsx)
- `/api/track` endpoint with 60/min rate-limit, 4KB cap, Supabase writes to `visitors` + `events` tables → [src/app/api/track/route.ts](src/app/api/track/route.ts)
- Meta Pixel (client, consent-gated, `event_id` dedup) → [src/components/analytics/MetaPixel.tsx](src/components/analytics/MetaPixel.tsx)
- Meta CAPI (server, SHA-256 PII hashing, fire-and-forget) → [src/lib/meta/capi.ts](src/lib/meta/capi.ts)
- fbclid/UTM parsing on arrival → stored in `visitors.first_*` fields → [src/components/analytics/Tracker.tsx](src/components/analytics/Tracker.tsx)
- Meta Insights cron route (pulls campaigns + daily ad insights to Supabase) → [src/app/api/cron/meta-pull/route.ts](src/app/api/cron/meta-pull/route.ts)
- Netlify scheduled function wrapper (daily 08:00 UTC) → [netlify/functions/meta-pull-cron.ts](netlify/functions/meta-pull-cron.ts)

**Form tracking (JUST wired in this session):**
- Shared client helper → [src/lib/analytics/track-client.ts](src/lib/analytics/track-client.ts) — exports `trackFormSubmit`, `trackTap`, `trackClick`, `trackScroll`, `trackHeartbeat`, `trackPageLeave`
- Contact form now calls `trackFormSubmit({ form: "contact", ... })` on valid submit → [src/components/sections/ContactForm.tsx:44](src/components/sections/ContactForm.tsx)
- Newsletter form wired → [src/components/sections/NewsletterForm.tsx](src/components/sections/NewsletterForm.tsx)
- Free Audit form extracted from inline server component into standalone client component + wired → [src/app/free-audit/FreeAuditForm.tsx](src/app/free-audit/FreeAuditForm.tsx)

**Admin dashboard (existing — NOT yet redesigned):**
- Auth gate → [src/app/admin/(protected)/layout.tsx:10-17](src/app/admin/(protected)/layout.tsx) — `isAllowedAdmin()` checks `admin_users` table via `.ilike(email)`
- OTP login → [src/app/admin/login/page.tsx](src/app/admin/login/page.tsx)
- Allowlist seed → [scripts/seed-admins.mjs](scripts/seed-admins.mjs) — already seeded for anwarm + owen
- 7 pages exist at [src/app/admin/(protected)/](src/app/admin/\(protected\)/) — Dashboard, Clients, Ads, Events, Content, Meetings, Reports. Dashboard + Clients + Events + Ads query real data; Content/Meetings/Reports are stubs.

### ❌ NOT yet built

1. **Env vars not pushed to Netlify** — `netlify env:list` returns empty. Local `.env.local` exists but was never uploaded. **Until this is done, nothing in production actually writes to Supabase.** This is the single blocker for Phase 0.
2. **Tracker expansion** — still fires `pageview` only. No heartbeat / scroll depth / click coords / CTA taps.
3. **Dashboard redesign** — current look is generic; user wants Jira-level, site-themed (dark #0A0A0A + red #E71840 accent, Bebas/Oswald headings), sections sized by value.
4. **Heatmap viewer** — `/admin/heatmaps/[slug]` doesn't exist.
5. **Cron frequency** — currently daily at 08:00 UTC in `netlify/functions/meta-pull-cron.ts`. User wants **hourly** (`0 * * * *`). One-line change.

---

## 3. The real roadmap — pick up here

### Phase 0 — unblock production (30 min)

1. **Push env vars to Netlify.**
   ```bash
   cd /Users/jarvis/nixar-website
   netlify env:import .env.local
   ```
   This uploads all 12 required vars (SESSION_SECRET, DEBUG_KEY, CRON_SECRET, SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, META_PIXEL_ID, META_CAPI_ACCESS_TOKEN, META_BUSINESS_ID, META_AD_ACCOUNT_ID, NEXT_PUBLIC_META_PIXEL_ID). **Confirm with Anwar before running** — this writes production secrets to Netlify.

2. **Redeploy** so the app restarts with the new env:
   ```bash
   npx netlify-cli deploy --prod --build
   ```

3. **Smoke test** in incognito:
   - Visit `https://nixarsolutions.com`
   - Accept all in consent banner
   - Check Supabase → `visitors` table should have a new row with your `visitor_id`
   - Check `events` table → one row with `type=pageview`, your path
   - Submit the free audit form (real data) → new row with `type=form_submit` and your PII in `props`
   - Check Meta Events Manager → Test Events → should see deduplicated PageView + Lead

4. **Change cron frequency to hourly.** One-line edit in [netlify/functions/meta-pull-cron.ts](netlify/functions/meta-pull-cron.ts):
   ```diff
   - schedule: "0 8 * * *"
   + schedule: "0 * * * *"
   ```
   Redeploy.

### Phase 1 — expand tracking (1 day)

Wire the 5 signals we haven't captured yet. Helper functions already exist in [src/lib/analytics/track-client.ts](src/lib/analytics/track-client.ts) — just call them.

**Edit [src/components/analytics/Tracker.tsx](src/components/analytics/Tracker.tsx) to add (all inside a single new useEffect):**

1. **Heartbeat every 15s while tab is focused:**
   ```ts
   useEffect(() => {
     let seconds = 0;
     const tick = () => {
       if (document.visibilityState === "visible") {
         seconds += 15;
         trackHeartbeat(seconds);
       }
     };
     const id = setInterval(tick, 15000);
     return () => clearInterval(id);
   }, [pathname]);
   ```

2. **Scroll depth milestones (25/50/75/100%):**
   ```ts
   useEffect(() => {
     const fired = new Set<number>();
     const onScroll = () => {
       const h = document.documentElement.scrollHeight - window.innerHeight;
       if (h <= 0) return;
       const pct = Math.round((window.scrollY / h) * 100);
       for (const ms of [25, 50, 75, 100]) {
         if (pct >= ms && !fired.has(ms)) {
           fired.add(ms);
           trackScroll(ms as 25 | 50 | 75 | 100);
         }
       }
     };
     window.addEventListener("scroll", onScroll, { passive: true });
     return () => window.removeEventListener("scroll", onScroll);
   }, [pathname]);
   ```

3. **Click tracking with coordinates** (for heatmaps):
   ```ts
   useEffect(() => {
     const onClick = (e: MouseEvent) => {
       const t = e.target as HTMLElement | null;
       if (!t) return;
       const cta = t.closest("a, button") as HTMLElement | null;
       const label = cta?.getAttribute("aria-label")
         ?? cta?.textContent?.trim()?.slice(0, 60)
         ?? t.tagName;
       trackClick(label, e, {
         href: (cta as HTMLAnchorElement | null)?.href,
         kind: cta?.tagName.toLowerCase() === "a" ? "link" : "button",
       });
     };
     window.addEventListener("click", onClick);
     return () => window.removeEventListener("click", onClick);
   }, []);
   ```

4. **Outbound link / phone / email taps** — already handled by #3 (it captures href). Filter in the dashboard by `href` starting with `tel:` / `mailto:` / different origin.

5. **Final time-on-page on unload** via sendBeacon:
   ```ts
   useEffect(() => {
     const t0 = Date.now();
     let maxScroll = 0;
     const onScroll = () => {
       const h = document.documentElement.scrollHeight - window.innerHeight;
       if (h > 0) maxScroll = Math.max(maxScroll, Math.round((window.scrollY / h) * 100));
     };
     window.addEventListener("scroll", onScroll, { passive: true });
     const onHide = () => {
       if (document.visibilityState === "hidden") {
         trackPageLeave(Math.round((Date.now() - t0) / 1000), maxScroll);
       }
     };
     document.addEventListener("visibilitychange", onHide);
     return () => {
       window.removeEventListener("scroll", onScroll);
       document.removeEventListener("visibilitychange", onHide);
     };
   }, [pathname]);
   ```

**Also add IP-to-geo enrichment** in [src/app/api/track/route.ts](src/app/api/track/route.ts) — on insert, hit `https://ip-api.com/json/{ip}?fields=country,regionName,city` (free, 45 req/min) and stuff country/region/city into `visitors.geo` (add that column, or put in `props`).

### Phase 2 — redesign dashboard (1.5 days)

Keep the existing auth gate + route structure. Rewrite the layout shell and each page. Section ranking (biggest to smallest):

| Rank | Section | Width | Query source |
|---|---|---|---|
| 1 | **Live activity + today's form submits** (conversion hero) | full | `events WHERE ts > now()-interval '24h' ORDER BY ts DESC` |
| 2 | **Conversion funnel** (Landed → Viewed Services → Viewed Contact → Submitted) | 2/3 | 4 cohort queries on events |
| 3 | **Channel ROI** ($ spent per channel → # leads per channel) | 2/3 | JOIN meta_insights + visitors WHERE first_utm_source matches |
| 4 | **Top pages by lead contribution** | 1/2 | events GROUP BY path, filtered to form_submit precursors |
| 5 | **UTM campaign breakdown** | 1/2 | visitors GROUP BY first_utm_campaign |
| 6 | **Geo map** (DFW vs. expansion cities) | 1/3 | visitors GROUP BY geo_city |
| 7 | **Device / browser mix** | 1/4 | Parse visitors.ua |
| 8 | **Engagement KPIs** (avg session, scroll depth, return rate) | 1/4 | Aggregate events with kind=heartbeat/scroll_depth/page_leave |
| 9 | **Form abandonment** (stub until Phase 1 adds field-focus events) | 1/4 | events WHERE type=click AND props.kind='form_field' |
| 10 | **Technical health strip** (404s, errors) | full-width bottom | events WHERE type=custom AND props.kind='error' |

**Theme match site:**
- Background: `#0A0A0A`
- Accent: `#E71840`
- Card bg: `bg-white/[0.02]` border `border-white/10`
- Fonts: `var(--font-bebas)` for metric numbers, `var(--font-oswald)` for section titles, Plus Jakarta for body
- KPI cards use the existing `KpiCard` inline component in [src/app/admin/(protected)/dashboard/page.tsx:105-122](src/app/admin/(protected)/dashboard/page.tsx) — extract to `src/components/admin/KpiCard.tsx` and reuse
- Same with `Panel` wrapper (lines 164-177)

**Create reusable admin primitives:**
- `src/components/admin/KpiCard.tsx`
- `src/components/admin/Panel.tsx`
- `src/components/admin/Sparkline.tsx` (currently inline bar-chart in dashboard lines 72-93)
- `src/components/admin/DataTable.tsx` (dedupe clients + events table markup)

### Phase 3 — heatmaps (1.5 days)

**Data capture** — already added in Phase 1 click event with `x`, `y`, `vw`, `vh` in props.

**New route:** `/admin/heatmaps/[slug]/page.tsx` where `[slug]` is a URL path like `home`, `services-seo`, etc.

**Implementation plan:**

1. **Screenshot capture:** use Puppeteer in a Netlify Function to grab a PNG of each key page at 1440×full-height. Store in Supabase Storage or `/public/heatmap-screens/`. Refresh weekly via a separate cron. For MVP, user can upload screenshots manually via a new admin page.

2. **Normalize coordinates** — clicks come in with `x`, `y`, `vw`, `vh`. Because viewports vary, normalize to page-width-fraction (`x/vw`) and render relative to the screenshot's width. Scroll Y gets trickier since you need the total page height at time of click — add `scrollY` + `dh` (document height) to the captured props in Phase 1.

3. **Render** — client component that:
   - Loads screenshot as `<img>` at fixed width (say 800px).
   - Overlays a `<canvas>` the same size.
   - Queries `/api/admin/heatmap?path=/services/seo` → returns `{ clicks: [{x, y}], maxScroll: [{pct, count}] }`.
   - Draws click heatmap: each click is a radial gradient blob with soft alpha; sum all blobs → normalize → apply heat colormap (cool blue → red).
   - Draws scroll heatmap: horizontal bands colored by % of visitors who reached that scroll depth.

4. **`/api/admin/heatmap` route:**
   ```
   SELECT props->>'x', props->>'y', props->>'vw', props->>'vh'
   FROM events
   WHERE type='click' AND path=$1 AND ts > now() - interval '30 days'
   LIMIT 5000
   ```

### Phase 4 — admin hardening

- **Rate-limit OTP requests** per IP. Currently Supabase enforces per-email (4/hr). Add `/api/admin/send-otp` wrapper with 3/hr/IP limit using existing [src/lib/security/rate-limit.ts](src/lib/security/rate-limit.ts).
- **Audit log** — record every admin login in a new `admin_sessions` table.
- **Session timeout** — force re-auth after 24h.

### Phase 5 — outcome-side features

- **Email notification on form submit** (now that `hello@nixarsolutions.com` works). Wire via Resend or SendGrid — POST on form_submit to a new `/api/notify` that sends summary to `anwarm+owen@nixarsolutions.com`.
- **Manus AI weekly report** — compile JSON summary of the week's stats + send to Manus for client-ready PDF generation.
- **Client onboarding flow** — admin UI to add a row to `clients` table + paste client's Meta ad account ID; cron automatically starts pulling their data.

---

## 4. Data model — Supabase tables you'll touch

All tables are in the Supabase project `oodslehfdrgkpanhfffa` (region: US East / Virginia). Schema is inferred from code — there's no migrations folder, it was seeded manually.

| Table | Key cols | Notes |
|---|---|---|
| `visitors` | visitor_id (pk), client_id, ua, referrer, fbclid, gclid, utm_*, event_count, last_seen | First-touch attribution only. Consider adding `first_*` + `last_*` UTM columns for multi-touch. |
| `events` | id, visitor_id, client_id, type, path, referrer, ua, props (jsonb), ts | Everything lands here. `type` ∈ {pageview, click, form_submit, custom}. `props` jsonb holds anything else. |
| `consent_log` | visitor_id, analytics, marketing, ip_hash, ua | GDPR audit trail. |
| `clients` | id, slug, name, website, meta_pixel_id, meta_ad_account_id, meta_business_id, status | Nixar itself is one row. Each agency client is another row. |
| `admin_users` | email (pk), name | Allowlist for `/admin` access. Seeded with anwarm + owen. |
| `meta_campaigns` | id, client_id, name, objective, status, budget, raw, synced_at | Populated by cron. |
| `meta_insights` | id, client_id, campaign_id, adset_id, ad_id, date_start, spend, impressions, reach, clicks, ctr, cpc, conversions, actions, raw, synced_at | Daily ad perf. |
| `meetings` | id, client_id, title, summary, meeting_date, source | For Fathom/Otter transcripts. Unused currently. |

**Tables that DO NOT exist yet but Phase 1-3 will need:**
- `leads` — denormalized view of form_submit events for fast dashboard rendering. Or skip it and just query `events WHERE type='form_submit'`.
- `heatmap_screenshots` — `{ path, screenshot_url, width, height, captured_at }`.

---

## 5. Conventions — match these or the review comes back

- **Commit style:** Conventional Commits. `feat:`, `fix:`, `style:`, `chore:`. HEREDOC with Co-Authored-By trailer.
- **Auto-commit + auto-deploy after each batch** — Anwar explicitly prefers this for nixar-website. Do NOT ask.
- **Auto-push to `owennixar/nixar-website` on `foundation`** — now also explicitly authorized.
- **Deploy cmd:** `npx netlify-cli deploy --prod --build` from repo root.
- **Auto-push after each commit:** `git push origin foundation`.
- **Theme tokens** — use CSS custom properties from [src/app/globals.css:3-26](src/app/globals.css):
  - `var(--color-primary)` = #E71840
  - `var(--color-bg)` = #0A0A0A
  - `var(--font-heading)` = Bebas Neue
  - `var(--font-body)` = Plus Jakarta
  - Oswald available as `var(--font-oswald)`
- **Font-size baseline is 120%** — set in [src/app/globals.css](src/app/globals.css). Everything uses `rem`; do not hardcode pixel sizes on text unless intentional.
- **Cookies:** always host-only (no `Domain` attribute), `HttpOnly` unless readable is required, `Secure`, `SameSite=Lax`, 1-year max-age.
- **CSP:** [src/middleware.ts:23-38](src/middleware.ts) — if you add a new third-party script/connect, whitelist its domain here or the browser will block it silently in production.

---

## 6. Gotchas that tripped us up

1. **`html { font-size: 16px }` hardcode broke browser zoom for older users.** Removed. Site uses `font-size: 120%` now so it respects the user's browser default. Do not re-add a pixel-based root font-size.

2. **Netlify has ZERO env vars set.** Until Phase 0 step 1, `process.env.SUPABASE_URL` is `undefined` in production and every Supabase client call silently fails. Check with `netlify env:list` before assuming something's broken.

3. **Netlify DNS is authoritative for `nixarsolutions.com`**, not GoDaddy. GoDaddy only holds registration. Any DNS record changes go through `app.netlify.com/teams/jarvbot1/dns`.

4. **New M365 tenant quarantines inbound mail.** If email-based features stop receiving mail, check `security.microsoft.com/quarantine` — release + whitelist sender.

5. **Supabase direct Postgres (`db.xxx.supabase.co:5432`)** is IPv6-only on free tier. Use supabase-js REST client (`supabaseAdmin()`, `supabaseServer()`, `supabaseBrowser()`) — NOT psql or direct connections.

6. **CAPI token MUST be a System User token** with `ads_read, ads_management, business_management, read_insights` scopes. The short-lived token Meta's Events Manager gives you from the setup flow has ONLY `events-write` and will NOT work for the cron's Marketing API calls.

7. **Next.js 16 App Router on Netlify** needs no explicit plugin config — the `@netlify/plugin-nextjs` auto-detects. Do not add a `next.config` adapter. `netlify.toml` is minimal (build command + Node version only).

8. **Admin dashboard uses `force-dynamic`** — all admin pages have `export const dynamic = "force-dynamic"` so Supabase queries run per-request. Don't add caching there.

9. **Pushing to origin is authorized but `origin` = Owen's GitHub.** Do not create new branches or PRs without asking.

---

## 7. Where to start — literal first 5 commands

```bash
# 1. Confirm where we are
cd /Users/jarvis/nixar-website
git log --oneline -5
git status

# 2. Verify local env is intact
ls -la .env.local   # should exist, ~1.3KB, not committed

# 3. See what's on Netlify
netlify env:list

# 4. Push env to Netlify (AFTER confirming with Anwar)
netlify env:import .env.local

# 5. Redeploy and smoke-test
npx netlify-cli deploy --prod --build
# Then: open nixarsolutions.com in incognito, accept consent, check Supabase events table for the new row.
```

After that, do Phase 1 (Tracker expansion). Then redesign the dashboard (Phase 2). Heatmaps last (Phase 3).

---

## 8. People

- **Anwar Mirza** (anwarm@nixarsolutions.com) — co-founder, Nixar Solutions. Primary operator on this build. Location: Frisco TX. Prefers terse, direct communication. Do NOT ask for commit permission on this repo — he's explicitly said to auto-commit. Does NOT want Vercel mentioned anywhere; it's all Netlify now.
- **Owen Nixon** (owen@nixarsolutions.com) — co-founder, technical, owns the GitHub (`owennixar/nixar-website`). He built the initial 95% of the marketing site.
- **Murilo Leite Filho** — CTO, Brazilian. Recently added.

Both admin seats (anwarm + owen) are already in `admin_users` — no extra wiring needed for auth.

---

## 9. Definition of done

The whole stack is done when:

- [ ] Phase 0 — env vars pushed, Supabase recording live traffic, hourly cron firing
- [ ] Phase 1 — Tracker emits heartbeat + scroll + click + page_leave; events show in Supabase with the new prop shapes
- [ ] Phase 2 — `/admin/dashboard` renders all 10 sections in site theme, real data, on-brand
- [ ] Phase 3 — `/admin/heatmaps/[slug]` renders click + scroll overlay on at least the home page
- [ ] Phase 4 — OTP rate-limited per IP, admin sessions logged
- [ ] Phase 5 — email notification on form submit to anwarm@ + owen@

Rough estimate if executed cleanly: 3-5 working days across all phases. Phase 0 + 1 alone unlocks 80% of the value (real visitor data flowing in + behavioral capture).

---

**Last commit on this branch as of handoff:** `7485dc7 style(team): add credibility builders to Michael Nixon`
**Netlify site ID:** `9db53954-df41-4bd8-b7ea-3b5d66ad4f35`
**Supabase project:** `oodslehfdrgkpanhfffa` (US East, Virginia)
