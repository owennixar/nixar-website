import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db/supabase";
import { fetchAdAccountInsights, fetchCampaigns, mapInsightRow } from "@/lib/meta/insights";

export const runtime = "nodejs";
export const maxDuration = 300;

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = req.headers.get("x-cron-secret");
  // Accept either x-cron-secret header or Authorization: Bearer <secret>
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return header === secret || bearer === secret;
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "META_CAPI_ACCESS_TOKEN missing" }, { status: 500 });
  }

  const db = supabaseAdmin();
  const { data: clients, error: clientsErr } = await db
    .from("clients")
    .select("id, slug, name, meta_ad_account_id")
    .eq("status", "active")
    .not("meta_ad_account_id", "is", null);

  if (clientsErr) return NextResponse.json({ error: clientsErr.message }, { status: 500 });
  if (!clients?.length) return NextResponse.json({ ok: true, message: "no clients with meta_ad_account_id" });

  const since = ymd(new Date(Date.now() - 7 * 86_400_000));
  const until = ymd(new Date());
  const summary: Record<string, { campaigns: number; insights: number; error?: string }> = {};

  for (const c of clients) {
    const adAccountId = c.meta_ad_account_id!;
    try {
      const campaigns = await fetchCampaigns({ adAccountId, accessToken: token });
      if (campaigns.length) {
        const rows = campaigns.map((k) => ({
          id: k.id,
          client_id: c.id,
          name: k.name,
          objective: k.objective ?? null,
          status: k.status ?? null,
          daily_budget: k.daily_budget ? Number(k.daily_budget) / 100 : null,
          lifetime_budget: k.lifetime_budget ? Number(k.lifetime_budget) / 100 : null,
          start_time: k.start_time ?? null,
          stop_time: k.stop_time ?? null,
          raw: k,
          synced_at: new Date().toISOString(),
        }));
        await db.from("meta_campaigns").upsert(rows, { onConflict: "id" });
      }

      const insights = await fetchAdAccountInsights({
        adAccountId, accessToken: token, since, until, level: "ad",
      });
      if (insights.length) {
        const mapped = insights.map((row) => ({
          client_id: c.id,
          ...mapInsightRow(row),
          synced_at: new Date().toISOString(),
        }));
        await db.from("meta_insights").upsert(mapped, {
          onConflict: "client_id,campaign_id,adset_id,ad_id,date_start",
          ignoreDuplicates: false,
        });
      }

      summary[c.slug] = { campaigns: campaigns.length, insights: insights.length };
    } catch (err) {
      summary[c.slug] = { campaigns: 0, insights: 0, error: (err as Error).message };
    }
  }

  return NextResponse.json({ ok: true, since, until, summary });
}
