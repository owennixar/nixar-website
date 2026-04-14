import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const db = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const admins = [
  { email: "anwarm@nixarsolutions.com", name: "Anwar Mirza", role: "admin" },
  { email: "owen@nixarsolutions.com", name: "Owen Nixon", role: "admin" },
];

const { data, error } = await db.from("admin_users").upsert(admins, { onConflict: "email" }).select();
if (error) { console.error("❌", error); process.exit(1); }
console.log("✅ admin_users:", data);
