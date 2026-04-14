import { supabaseAdmin } from "@/lib/db/supabase";

export const dynamic = "force-dynamic";

export default async function MeetingsPage() {
  const db = supabaseAdmin();
  const { data: meetings } = await db
    .from("meetings")
    .select("*, clients(name, slug)")
    .order("meeting_date", { ascending: false, nullsFirst: false })
    .limit(100);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Fathom · Otter · Manual</p>
        <h1 className="mt-1 font-[var(--font-bebas)] text-4xl tracking-wide md:text-5xl">
          Meetings <span className="text-[#E71840]">·</span>
        </h1>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        {!meetings?.length ? (
          <p className="py-8 text-center text-xs text-white/30">
            No meetings yet. Fathom transcripts will auto-import once we wire <code>scripts/fathom-import.ts</code>.
          </p>
        ) : (
          <ul className="divide-y divide-white/5">
            {meetings.map((m) => (
              <li key={m.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{m.title ?? "(untitled)"}</div>
                    <div className="mt-0.5 text-xs text-white/50">
                      {(m as any).clients?.name ?? "No client"} · {m.meeting_date ? new Date(m.meeting_date).toLocaleString() : "no date"}
                    </div>
                  </div>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">{m.source ?? "manual"}</span>
                </div>
                {m.summary && <p className="mt-2 text-xs text-white/60">{m.summary}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
