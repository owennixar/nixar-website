import { supabaseAdmin } from "@/lib/db/supabase";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const db = supabaseAdmin();
  const { data: clients } = await db.from("clients").select("*").order("created_at", { ascending: true });

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Agency Clients</p>
        <h1 className="mt-1 font-[var(--font-bebas)] text-4xl tracking-wide md:text-5xl">
          Clients <span className="text-[#E71840]">·</span>
        </h1>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        {!clients?.length ? (
          <p className="py-8 text-center text-xs text-white/30">No clients yet. Seed via SQL: <code>INSERT INTO clients ...</code></p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[10px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Slug</th>
                  <th className="py-2 pr-4 font-medium">Website</th>
                  <th className="py-2 pr-4 font-medium">Pixel</th>
                  <th className="py-2 pr-4 font-medium">Ad Account</th>
                  <th className="py-2 pr-4 font-medium">Business</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="border-t border-white/5 transition hover:bg-white/[0.02]">
                    <td className="py-3 pr-4 font-medium">{c.name}</td>
                    <td className="py-3 pr-4 text-white/60"><code className="rounded bg-white/5 px-1.5 py-0.5 text-xs">{c.slug}</code></td>
                    <td className="py-3 pr-4 text-white/60">{c.website ?? "—"}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-white/40">{c.meta_pixel_id ?? "—"}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-white/40">{c.meta_ad_account_id ?? "—"}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-white/40">{c.meta_business_id ?? "—"}</td>
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
      </div>
    </div>
  );
}
