import { supabaseAdmin } from "@/lib/db/supabase";

export const dynamic = "force-dynamic";

export default async function AdsPage() {
  const db = supabaseAdmin();
  const [campaigns, insights] = await Promise.all([
    db.from("meta_campaigns").select("*, clients(name, slug)").order("synced_at", { ascending: false }),
    db.from("meta_insights")
      .select("*, clients(name, slug)")
      .order("date_start", { ascending: false })
      .limit(100),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Meta Marketing API</p>
        <h1 className="mt-1 font-[var(--font-bebas)] text-4xl tracking-wide md:text-5xl">
          Ad <span className="text-[#E71840]">Performance</span>
        </h1>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Campaigns</h3>
          <span className="text-xs text-white/40">{campaigns.data?.length ?? 0} synced</span>
        </div>
        {!campaigns.data?.length ? (
          <p className="py-8 text-center text-xs text-white/30">
            No campaigns yet. Once your clients launch ads, the nightly cron <code className="text-white/50">/api/cron/meta-pull</code> syncs here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[10px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="py-2 pr-4 font-medium">Campaign</th>
                  <th className="py-2 pr-4 font-medium">Client</th>
                  <th className="py-2 pr-4 font-medium">Objective</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium">Daily Budget</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.data.map((c) => (
                  <tr key={c.id} className="border-t border-white/5">
                    <td className="py-2.5 pr-4">{c.name}</td>
                    <td className="py-2.5 pr-4 text-white/60">{(c as any).clients?.name ?? "—"}</td>
                    <td className="py-2.5 pr-4 text-white/60"><code className="text-xs">{c.objective ?? "—"}</code></td>
                    <td className="py-2.5 pr-4 text-xs text-white/60">{c.status}</td>
                    <td className="py-2.5 font-mono text-white/80">{c.daily_budget ? `$${c.daily_budget}` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Recent Daily Insights</h3>
          <span className="text-xs text-white/40">{insights.data?.length ?? 0} rows</span>
        </div>
        {!insights.data?.length ? (
          <p className="py-8 text-center text-xs text-white/30">No insights yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[10px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="py-2 pr-4 font-medium">Date</th>
                  <th className="py-2 pr-4 font-medium">Client</th>
                  <th className="py-2 pr-4 font-medium">Spend</th>
                  <th className="py-2 pr-4 font-medium">Impr.</th>
                  <th className="py-2 pr-4 font-medium">Clicks</th>
                  <th className="py-2 pr-4 font-medium">CTR</th>
                  <th className="py-2 font-medium">CPC</th>
                </tr>
              </thead>
              <tbody>
                {insights.data.map((r, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="py-2.5 pr-4 font-mono text-xs text-white/60">{r.date_start}</td>
                    <td className="py-2.5 pr-4 text-white/80">{(r as any).clients?.name ?? "—"}</td>
                    <td className="py-2.5 pr-4 font-mono">${Number(r.spend ?? 0).toFixed(2)}</td>
                    <td className="py-2.5 pr-4 font-mono text-white/70">{r.impressions ?? 0}</td>
                    <td className="py-2.5 pr-4 font-mono text-white/70">{r.clicks ?? 0}</td>
                    <td className="py-2.5 pr-4 font-mono text-white/70">{r.ctr ? `${Number(r.ctr).toFixed(2)}%` : "—"}</td>
                    <td className="py-2.5 font-mono text-white/70">{r.cpc ? `$${Number(r.cpc).toFixed(2)}` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
