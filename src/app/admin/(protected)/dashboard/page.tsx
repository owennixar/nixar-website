import { supabaseAdmin } from "@/lib/db/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

function startOfDay(offsetDays = 0): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - offsetDays);
  return d.toISOString();
}

export default async function DashboardPage() {
  const db = supabaseAdmin();
  const since7 = new Date(Date.now() - 7 * 86_400_000).toISOString();

  const [
    eventsCount, visitorsCount, clients, recentEvents,
    topReferrers, typeBreakdown, metaTotals, last14days,
    topSources,
  ] = await Promise.all([
    db.from("events").select("*", { count: "exact", head: true }).gte("ts", since7),
    db.from("visitors").select("*", { count: "exact", head: true }).gte("last_seen", since7),
    db.from("clients").select("id, slug, name, status, meta_ad_account_id, website"),
    db.from("events").select("ts, type, path, visitor_id").order("ts", { ascending: false }).limit(15),
    db.from("events").select("referrer").gte("ts", since7).not("referrer", "is", null).limit(500),
    db.from("events").select("type").gte("ts", since7).limit(1000),
    db.from("meta_insights").select("spend, impressions, clicks, conversions, date_start").gte("date_start", since7.slice(0, 10)),
    db.from("events").select("ts").gte("ts", startOfDay(13)),
    db.from("visitors").select("utm_source").not("utm_source", "is", null).gte("last_seen", since7).limit(500),
  ]);

  const refs = (topReferrers.data ?? []).reduce<Record<string, number>>((acc, r) => {
    try {
      const host = new URL(r.referrer!).hostname.replace(/^www\./, "");
      acc[host] = (acc[host] || 0) + 1;
    } catch {}
    return acc;
  }, {});
  const topRefs = Object.entries(refs).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const sources = (topSources.data ?? []).reduce<Record<string, number>>((acc, s) => {
    const k = s.utm_source || "unknown";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const topSourcesList = Object.entries(sources).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const types = (typeBreakdown.data ?? []).reduce<Record<string, number>>((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {});
  const typesList = Object.entries(types).sort((a, b) => b[1] - a[1]);
  const typesMax = Math.max(1, ...typesList.map(([, v]) => v));

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

  // 14-day sparkline
  const buckets = new Array(14).fill(0);
  const now = Date.now();
  for (const e of last14days.data ?? []) {
    const daysAgo = Math.floor((now - new Date(e.ts).getTime()) / 86_400_000);
    if (daysAgo >= 0 && daysAgo < 14) buckets[13 - daysAgo] += 1;
  }
  const sparkMax = Math.max(1, ...buckets);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Last 7 Days</p>
          <h1 className="mt-1 font-[var(--font-bebas)] text-4xl tracking-wide md:text-5xl">
            Command <span className="text-[#E71840]">Center</span>
          </h1>
        </div>
        <div className="text-xs text-white/40">
          {clients.data?.length ?? 0} {clients.data?.length === 1 ? "client" : "clients"} tracked · First-party + Meta integrated
        </div>
      </div>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Events" value={fmt(eventsCount.count ?? 0)} accent />
        <KpiCard label="Visitors" value={fmt(visitorsCount.count ?? 0)} />
        <KpiCard label="Meta Spend" value={`$${meta.spend.toFixed(2)}`} />
        <KpiCard label="Conversions" value={fmt(meta.conversions)} />
        <KpiCard label="Impressions" value={fmt(meta.impressions)} />
        <KpiCard label="Ad Clicks" value={fmt(meta.clicks)} />
        <KpiCard label="CPC" value={meta.clicks ? `$${(meta.spend / meta.clicks).toFixed(2)}` : "—"} />
        <KpiCard label="CTR" value={meta.impressions ? `${((meta.clicks / meta.impressions) * 100).toFixed(2)}%` : "—"} />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Traffic — 14 days" className="lg:col-span-2">
          <div className="flex h-32 items-end gap-1">
            {buckets.map((v, i) => (
              <div key={i} className="group relative flex-1" title={`${v} events`}>
                <div
                  className="w-full rounded-t bg-gradient-to-t from-[#E71840]/60 to-[#E71840] transition group-hover:opacity-80"
                  style={{ height: `${(v / sparkMax) * 100}%` }}
                />
                <div className="absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] text-white group-hover:block">
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-white/30">
            <span>14d ago</span><span>today</span>
          </div>
        </Panel>

        <Panel title="Event Types">
          {typesList.length === 0 ? (
            <Empty>No events in range yet.</Empty>
          ) : (
            <ul className="space-y-2.5">
              {typesList.map(([k, v]) => (
                <li key={k} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{k}</span>
                    <span className="font-mono text-white/50">{v}</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full bg-[#E71840]"
                      style={{ width: `${(v / typesMax) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Top Referrers">
          {topRefs.length === 0 ? <Empty>No referrers yet.</Empty> : (
            <ol className="space-y-1">
              {topRefs.map(([host, n], i) => (
                <li key={host} className="flex items-center justify-between border-b border-white/5 py-1.5 text-sm last:border-0">
                  <span className="flex items-center gap-3">
                    <span className="inline-block w-6 text-right font-mono text-[10px] text-white/30">{i + 1}</span>
                    <span>{host}</span>
                  </span>
                  <span className="font-mono text-xs text-white/50">{n}</span>
                </li>
              ))}
            </ol>
          )}
        </Panel>
        <Panel title="Top UTM Sources">
          {topSourcesList.length === 0 ? <Empty>No UTM-tagged traffic yet.</Empty> : (
            <ol className="space-y-1">
              {topSourcesList.map(([src, n], i) => (
                <li key={src} className="flex items-center justify-between border-b border-white/5 py-1.5 text-sm last:border-0">
                  <span className="flex items-center gap-3">
                    <span className="inline-block w-6 text-right font-mono text-[10px] text-white/30">{i + 1}</span>
                    <span className="rounded bg-[#E71840]/10 px-1.5 py-0.5 font-mono text-xs text-[#ff6884]">{src}</span>
                  </span>
                  <span className="font-mono text-xs text-white/50">{n}</span>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </section>

      <section>
        <Panel title="Clients">
          {!clients.data?.length ? <Empty>No clients yet.</Empty> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-[10px] uppercase tracking-wider text-white/40">
                  <tr>
                    <th className="py-2 pr-4 font-medium">Name</th>
                    <th className="py-2 pr-4 font-medium">Slug</th>
                    <th className="py-2 pr-4 font-medium">Website</th>
                    <th className="py-2 pr-4 font-medium">Meta Ad Acct</th>
                    <th className="py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.data.map((c) => (
                    <tr key={c.id} className="border-t border-white/5 transition hover:bg-white/[0.02]">
                      <td className="py-3 pr-4 font-medium">{c.name}</td>
                      <td className="py-3 pr-4 text-white/50">
                        <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs">{c.slug}</code>
                      </td>
                      <td className="py-3 pr-4 text-white/60">{c.website ?? "—"}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-white/40">{c.meta_ad_account_id ?? "—"}</td>
                      <td className="py-3">
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                          c.status === "active"
                            ? "border-green-500/30 bg-green-500/10 text-green-300"
                            : "border-white/10 bg-white/5 text-white/50"
                        }`}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </section>

      <section>
        <Panel title="Recent Events" action={<Link href="/admin/events" className="text-xs text-[#E71840] hover:underline">View all →</Link>}>
          {!recentEvents.data?.length ? <Empty>No events captured yet. Visit the live site and grant analytics consent.</Empty> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-[10px] uppercase tracking-wider text-white/40">
                  <tr>
                    <th className="py-2 pr-4 font-medium">Time</th>
                    <th className="py-2 pr-4 font-medium">Type</th>
                    <th className="py-2 pr-4 font-medium">Path</th>
                    <th className="py-2 font-medium">Visitor</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.data.map((e, i) => (
                    <tr key={i} className="border-t border-white/5 transition hover:bg-white/[0.02]">
                      <td className="py-2.5 pr-4 font-mono text-[11px] text-white/40">
                        {new Date(e.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                      </td>
                      <td className="py-2.5 pr-4">
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[11px]">{e.type}</span>
                      </td>
                      <td className="py-2.5 pr-4 text-white/80">{e.path}</td>
                      <td className="py-2.5 font-mono text-[11px] text-white/40">{e.visitor_id.slice(0, 10)}…</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </section>
    </div>
  );
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}

function KpiCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-xl border bg-white/[0.02] p-4 transition hover:bg-white/[0.04] ${
      accent ? "border-[#E71840]/30" : "border-white/10"
    }`}>
      {accent && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#E71840]/10 to-transparent opacity-60" />
      )}
      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.15em] text-white/40">{label}</div>
        <div className="mt-2 font-[var(--font-bebas)] text-3xl tracking-wide md:text-4xl">{value}</div>
      </div>
    </div>
  );
}

function Panel({ title, children, className = "", action }: {
  title: string; children: React.ReactNode; className?: string; action?: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/[0.02] p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="py-6 text-center text-xs text-white/30">{children}</p>;
}
