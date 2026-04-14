import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const db = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const { data, error } = await db.from("clients").select("slug, name, status");
if (error) {
  console.error("❌", error);
  process.exit(1);
}
console.log("✅ clients:", data);

const tables = ["events", "visitors", "meta_insights", "contracts", "meetings", "admin_users", "consent_log"];
for (const t of tables) {
  const { error, count } = await db.from(t).select("*", { count: "exact", head: true });
  console.log(error ? `❌ ${t}: ${error.message}` : `✅ ${t}: ${count} rows`);
}
