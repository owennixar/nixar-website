# Nixar Agency Portal — Deploy Checklist

One-time setup for when we flip from `nixar-website.vercel.app` to the custom Nixar domain.

## 1. Vercel Environment Variables

Project Settings → Environment Variables. Add each to **Production** + **Preview** scope.

Copy from `.env.local` (local file, not committed). The values currently in use:

```
SESSION_SECRET              (generate fresh: openssl rand -hex 32)
DEBUG_KEY                   (any random string)
CRON_SECRET                 (any random string — Vercel cron uses this)

SUPABASE_URL                https://oodslehfdrgkpanhfffa.supabase.co
SUPABASE_ANON_KEY           sb_publishable_IOg1Z3iNPjEA__d3oQbBMQ_SvUuDZqt
SUPABASE_SERVICE_ROLE_KEY   (from .env.local)
NEXT_PUBLIC_SUPABASE_URL    https://oodslehfdrgkpanhfffa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY sb_publishable_IOg1Z3iNPjEA__d3oQbBMQ_SvUuDZqt

META_PIXEL_ID               1922111728439268
NEXT_PUBLIC_META_PIXEL_ID   1922111728439268
META_CAPI_ACCESS_TOKEN      (from .env.local — the EAANN... long token)
META_BUSINESS_ID            1121517152475470
META_AD_ACCOUNT_ID          act_1283887153693634

VAULT_PATH                  /Users/jarvis/Nixar-Vault   (only for local scripts; not needed on Vercel)
```

**Security**: rotate `SESSION_SECRET`, `CRON_SECRET`, `DEBUG_KEY` to fresh random strings before prod.

## 2. Supabase Auth Redirect URLs

Supabase Dashboard → Authentication → URL Configuration → **Redirect URLs** allow-list:

- `https://nixarsolutions.com/admin/dashboard` (or whichever custom domain you pick)
- `https://www.nixarsolutions.com/admin/dashboard`
- `https://nixar-website.vercel.app/admin/dashboard` (keep until fully migrated)
- `https://*-owennixar.vercel.app/admin/dashboard` (preview branches)

Set **Site URL** to the primary custom domain.

## 3. Supabase Auth Email Templates (optional polish)

Authentication → Email Templates → **Magic Link** → customize subject + body to mention "Nixar Portal" instead of "Supabase."

## 4. Domain Cutover Steps

1. Point DNS (A / AAAA / CNAME) from registrar → Vercel. Vercel will auto-issue SSL.
2. In `src/app/layout.tsx`, update `metadataBase` if pointing at a new apex.
3. Verify the site loads at the new domain.
4. **No cookie code changes needed** — host-only cookies automatically scope to the new hostname.
5. Update Meta Pixel → Events Manager → **Website Activity** domain to the new one.
6. Run `k6 run -e BASE_URL=https://<new-domain> tests/load/k6-baseline.js` → record new baseline.

## 5. Vercel Cron Verification

After deploy, check **Vercel Dashboard → Cron Jobs**. You should see `/api/cron/meta-pull` scheduled `0 8 * * *`.

Manual test: `curl -H "x-cron-secret: $CRON_SECRET" https://<your-domain>/api/cron/meta-pull`

## 6. Smoke Test

1. Visit `/` in incognito → grant "Accept all" in consent banner
2. Check Supabase `events` table → row should appear
3. Check Supabase `visitors` table → row should appear with `ua`, `referrer`
4. Visit `/?fbclid=TEST_FBCLID&utm_source=meta&utm_campaign=spring` → check `visitors.fbclid` populated
5. Open Meta Events Manager → **Test Events** tab → real PageView should appear, marked "Deduplicated" (browser + server matched)
6. Visit `/admin/dashboard` → magic link email arrives → click → admin dashboard loads with stats

## 7. Client Onboarding (later)

For each client:

1. Business Manager → **Request Access** to their ad account (Business Settings → Ad Accounts → Request Access)
2. Once approved, their ad account automatically works with our existing token
3. Insert client row in Supabase `clients` table:

```sql
INSERT INTO clients (slug, name, website, meta_ad_account_id, meta_pixel_id, meta_business_id, status)
VALUES ('tire-geeks', 'Tire Geeks', 'https://tiregeeks.com', 'act_THEIR_AD_ACCOUNT', 'THEIR_PIXEL_ID', 'THEIR_BM_ID', 'active');
```

4. Their next-day cron pull will populate `meta_campaigns` + `meta_insights`
5. If we want to track their website too, paste our consent-gated tracking snippet on their site

## 8. Rollback

If something breaks after cutover:
- Revert DNS → back to vercel.app
- Or: `git revert <commit>` + redeploy
- Supabase is unaffected by deploys — data persists

## Local dev runbook

```bash
cd /Users/jarvis/nixar-website
npm install
npm run dev                              # http://localhost:3000
node scripts/test-supabase.mjs           # verify schema
node scripts/test-capi.mjs               # fire test event to Meta
node scripts/test-meta-pull.mjs          # pull ad data from Meta → Supabase
node scripts/seed-admins.mjs             # seed admin_users if wiped
```
