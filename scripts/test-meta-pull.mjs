// Tests the Meta Marketing API pull end-to-end by running the same code the cron would.
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const token = env.META_CAPI_ACCESS_TOKEN;
const adAcct = env.META_AD_ACCOUNT_ID;

console.log("▶ ad account:", adAcct);

// 1. campaigns
const campaignsRes = await fetch(
  `https://graph.facebook.com/v20.0/${adAcct}/campaigns?fields=id,name,objective,status,daily_budget,lifetime_budget,start_time,stop_time&access_token=${encodeURIComponent(token)}`
);
const campaignsJson = await campaignsRes.json();
console.log("\n━━ CAMPAIGNS ━━");
if (!campaignsRes.ok) { console.error(campaignsJson); process.exit(1); }
console.log(`Found ${campaignsJson.data?.length ?? 0} campaigns`);
for (const c of campaignsJson.data ?? []) {
  console.log(`  • ${c.name} — ${c.status} — ${c.objective}`);
}

// 2. insights last 7 days
const since = new Date(Date.now() - 7 * 86_400_000).toISOString().slice(0, 10);
const until = new Date().toISOString().slice(0, 10);
const insightsRes = await fetch(
  `https://graph.facebook.com/v20.0/${adAcct}/insights?fields=campaign_name,spend,impressions,clicks,ctr,cpc,cpm&level=campaign&time_range=${encodeURIComponent(JSON.stringify({since, until}))}&access_token=${encodeURIComponent(token)}`
);
const insightsJson = await insightsRes.json();
console.log("\n━━ INSIGHTS (last 7 days, campaign level) ━━");
if (!insightsRes.ok) { console.error(insightsJson); process.exit(1); }
const rows = insightsJson.data ?? [];
console.log(`Found ${rows.length} insight rows`);
for (const r of rows) {
  console.log(`  • ${r.campaign_name}: $${r.spend} spend, ${r.impressions} imps, ${r.clicks} clicks, CTR ${r.ctr}%`);
}

// 3. write to Supabase
const db = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const { data: client } = await db.from("clients").select("id").eq("slug", "nixar").single();
if (campaignsJson.data?.length) {
  const toInsert = campaignsJson.data.map((k) => ({
    id: k.id, client_id: client.id, name: k.name, objective: k.objective ?? null,
    status: k.status ?? null,
    daily_budget: k.daily_budget ? Number(k.daily_budget) / 100 : null,
    lifetime_budget: k.lifetime_budget ? Number(k.lifetime_budget) / 100 : null,
    start_time: k.start_time ?? null, stop_time: k.stop_time ?? null,
    raw: k, synced_at: new Date().toISOString(),
  }));
  const { error } = await db.from("meta_campaigns").upsert(toInsert, { onConflict: "id" });
  console.log(error ? `\n❌ meta_campaigns upsert: ${error.message}` : `\n✅ upserted ${toInsert.length} campaigns to Supabase`);
}
