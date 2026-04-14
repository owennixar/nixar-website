import { supabaseAdmin } from "@/lib/db/supabase";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const db = supabaseAdmin();
  const { data: events } = await db
    .from("events")
    .select("ts, type, path, visitor_id, referrer")
    .order("ts", { ascending: false })
    .limit(200);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Real-time stream</p>
          <h1 className="mt-1 font-[var(--font-bebas)] text-4xl tracking-wide md:text-5xl">
            Live <span className="text-[#E71840]">Events</span>
          </h1>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-white/60">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          {events?.length ?? 0} latest
        </span>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        {!events?.length ? (
          <p className="py-8 text-center text-xs text-white/30">No events yet. Visit the site and grant consent.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[10px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="py-2 pr-4 font-medium">Time</th>
                  <th className="py-2 pr-4 font-medium">Type</th>
                  <th className="py-2 pr-4 font-medium">Path</th>
                  <th className="py-2 pr-4 font-medium">Referrer</th>
                  <th className="py-2 font-medium">Visitor</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={i} className="border-t border-white/5 transition hover:bg-white/[0.02]">
                    <td className="py-2.5 pr-4 font-mono text-[11px] text-white/40 whitespace-nowrap">
                      {new Date(e.ts).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className="rounded bg-white/5 px-1.5 py-0.5 text-[11px]">{e.type}</span>
                    </td>
                    <td className="py-2.5 pr-4 text-white/80">{e.path}</td>
                    <td className="py-2.5 pr-4 text-white/50 text-xs">{e.referrer ? new URL(e.referrer).hostname : "—"}</td>
                    <td className="py-2.5 font-mono text-[11px] text-white/40">{e.visitor_id.slice(0, 10)}…</td>
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
