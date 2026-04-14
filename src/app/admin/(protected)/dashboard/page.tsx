import { supabaseAdmin } from "@/lib/db/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const db = supabaseAdmin();
  const sinceIso = new Date(Date.now() - 7 * 86_400_000).toISOString();

  const [eventsCount, visitorsCount, clients, recentEvents, topReferrers, typeBreakdown, metaTotals] = await Promise.all([
    db.from("events").select("*", { count: "exact", head: true }).gte("ts", sinceIso),
    db.from("visitors").select("*", { count: "exact", head: true }).gte("last_seen", sinceIso),
    db.from("clients").select("id, slug, name, status, meta_ad_account_id"),
    db.from("events").select("ts, type, path, visitor_id").order("ts", { ascending: false }).limit(20),
    db.from("events").select("referrer").gte("ts", sinceIso).not("referrer", "is", null).limit(500),
    db.from("events").select("type").gte("ts", sinceIso).limit(1000),
    db.from("meta_insights").select("spend, impressions, clicks, conversions").gte("date_start", sinceIso.slice(0, 10)),
  ]);

  const refs = (topReferrers.data ?? []).reduce<Record<string, number>>((acc, r) => {
    try {
      const host = new URL(r.referrer!).hostname;
      acc[host] = (acc[host] || 0) + 1;
    } catch {}
    return acc;
  }, {});
  const topRefs = Object.entries(refs).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const types = (typeBreakdown.data ?? []).reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});

  const meta = (metaTotals.data ?? []).reduce(
    (acc, r) => {
      acc.spend += Number(r.spend || 0);
      acc.impressions += Number(r.impressions || 0);
      acc.clicks += Number(r.clicks || 0);
      acc.conversions += Number(r.conversions || 0);
      return acc;
    },
    { spend: 0, impressions: 0, clicks: 0, conversions: 0 },
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Last 7 Days</h2>
        <p className="text-xs text-white/40">First-party analytics + Meta ad performance</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Events" value={eventsCount.count ?? 0} />
        <Stat label="Visitors" value={visitorsCount.count ?? 0} />
        <Stat label="Clients" value={clients.data?.length ?? 0} />
        <Stat label="Meta Spend" value={`$${meta.spend.toFixed(2)}`} />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Impressions" value={meta.impressions.toLocaleString()} />
        <Stat label="Ad Clicks" value={meta.clicks.toLocaleString()} />
        <Stat label="Conversions" value={meta.conversions.toLocaleString()} />
        <Stat label="CPC" value={meta.clicks ? `$${(meta.spend / meta.clicks).toFixed(2)}` : "—"} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Event Types">
          <List items={Object.entries(types).sort((a, b) => b[1] - a[1])} />
        </Panel>
        <Panel title="Top Referrers">
          <List items={topRefs} />
        </Panel>
      </div>

      <Panel title="Clients">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-white/40">
            <tr><th className="py-2">Name</th><th>Slug</th><th>Status</th><th>Meta Ad Acct</th></tr>
          </thead>
          <tbody>
            {clients.data?.map((c) => (
              <tr key={c.id} className="border-t border-white/5">
                <td className="py-2">{c.name}</td>
                <td className="text-white/60">{c.slug}</td>
                <td className="text-white/60">{c.status}</td>
                <td className="font-mono text-xs text-white/50">{c.meta_ad_account_id ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title="Recent Events (20)">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-white/40">
            <tr><th className="py-2">Time</th><th>Type</th><th>Path</th><th>Visitor</th></tr>
          </thead>
          <tbody>
            {recentEvents.data?.map((e, i) => (
              <tr key={i} className="border-t border-white/5">
                <td className="py-2 text-white/60">{new Date(e.ts).toLocaleString()}</td>
                <td>{e.type}</td>
                <td className="text-white/70">{e.path}</td>
                <td className="font-mono text-xs text-white/40">{e.visitor_id.slice(0, 12)}…</td>
              </tr>
            )) ?? null}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wider text-white/40">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/60">{title}</h3>
      {children}
    </div>
  );
}

function List({ items }: { items: [string, number][] }) {
  if (!items.length) return <p className="text-sm text-white/40">No data yet.</p>;
  return (
    <ul className="space-y-1 text-sm">
      {items.map(([k, v]) => (
        <li key={k} className="flex justify-between border-b border-white/5 py-1">
          <span className="truncate pr-2">{k}</span>
          <span className="font-mono text-white/60">{v}</span>
        </li>
      ))}
    </ul>
  );
}
