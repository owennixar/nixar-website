// Fires a test event to Meta CAPI using our lib
// Run: node scripts/test-capi.mjs
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const PIXEL = env.META_PIXEL_ID;
const TOKEN = env.META_CAPI_ACCESS_TOKEN;

if (!PIXEL || !TOKEN) {
  console.error("Missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN");
  process.exit(1);
}

const sha = (s) => createHash("sha256").update(s.trim().toLowerCase()).digest("hex");

const payload = {
  data: [
    {
      event_name: "PageView",
      event_time: Math.floor(Date.now() / 1000),
      event_id: `test_${Date.now()}`,
      event_source_url: "https://nixar-website.vercel.app/",
      action_source: "website",
      user_data: {
        em: [sha("test@nixarsolutions.com")],
        client_user_agent: "Mozilla/5.0 (Nixar CAPI Test)",
        client_ip_address: "203.0.113.1",
      },
      custom_data: { source: "nixar-portal-hackathon-test" },
    },
  ],
  test_event_code: "TEST12345",
};

const url = `https://graph.facebook.com/v20.0/${PIXEL}/events?access_token=${encodeURIComponent(TOKEN)}`;
const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
const body = await res.json();
console.log("Status:", res.status);
console.log("Response:", JSON.stringify(body, null, 2));
