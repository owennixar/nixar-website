import type { Config } from "@netlify/functions";

/**
 * Scheduled Netlify Function that fires the Meta insights pull once per day.
 * It does NOT do the work itself — it just hits the existing Next.js route
 * /api/cron/meta-pull with the CRON_SECRET header. The route then pulls
 * Meta campaigns + insights into Supabase.
 *
 * Schedule: 08:00 UTC daily (= 03:00 Dallas CDT / 02:00 Dallas CST).
 */
export default async (req: Request) => {
  const secret = Netlify.env.get("CRON_SECRET");
  const siteUrl =
    Netlify.env.get("URL") ?? "https://nixarsolutions.com";

  if (!secret) {
    console.error("meta-pull-cron: CRON_SECRET not set");
    return new Response("misconfigured", { status: 500 });
  }

  const target = `${siteUrl}/api/cron/meta-pull`;
  const res = await fetch(target, {
    method: "GET",
    headers: { "x-cron-secret": secret },
  });

  const text = await res.text();
  console.log(`meta-pull-cron: ${res.status} ${text.slice(0, 500)}`);
  return new Response(text, { status: res.status });
};

export const config: Config = {
  schedule: "0 8 * * *",
};
