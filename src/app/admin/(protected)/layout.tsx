import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/db/server";
import { supabaseAdmin } from "@/lib/db/supabase";
import Logo from "@/components/ui/Logo";
import SignOutButton from "./_components/SignOutButton";

export const dynamic = "force-dynamic";

async function isAllowedAdmin(email: string): Promise<boolean> {
  const { data } = await supabaseAdmin()
    .from("admin_users")
    .select("email, name")
    .ilike("email", email)
    .maybeSingle();
  return !!data;
}

const nav = [
  { href: "/admin/dashboard", label: "Overview", icon: "◎" },
  { href: "/admin/clients", label: "Clients", icon: "◌" },
  { href: "/admin/ads", label: "Ad Performance", icon: "◈" },
  { href: "/admin/events", label: "Live Events", icon: "◉" },
  { href: "/admin/content", label: "Content", icon: "◍" },
  { href: "/admin/meetings", label: "Meetings", icon: "◒" },
  { href: "/admin/reports", label: "Reports", icon: "◓" },
];

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();

  if (!user?.email) redirect("/admin/login");
  if (!(await isAllowedAdmin(user.email))) redirect("/admin/login?denied=1");

  return (
    <div className="min-h-dvh bg-[#0a0a0a] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(231,24,64,0.08),transparent_50%)]" />

      <div className="relative flex min-h-dvh">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 border-r border-white/5 bg-black/40 backdrop-blur md:flex md:flex-col">
          <div className="flex h-16 items-center border-b border-white/5 px-5">
            <Link href="/admin/dashboard" aria-label="Nixar Portal home">
              <Logo height={28} />
            </Link>
          </div>
          <nav className="flex-1 space-y-0.5 px-3 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <span className="text-[13px] text-white/30 group-hover:text-[#E71840]">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="border-t border-white/5 p-4">
            <div className="truncate text-[11px] uppercase tracking-wider text-white/30">Signed in</div>
            <div className="mt-0.5 truncate text-sm text-white/90">{user.email}</div>
            <SignOutButton />
          </div>
        </aside>

        {/* Main */}
        <main className="relative flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/5 bg-[#0a0a0a]/80 px-6 backdrop-blur md:px-10">
            <div className="flex items-center gap-3">
              <span className="md:hidden"><Logo height={22} /></span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">Agency Portal</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/40">
              <span className="hidden sm:inline">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                Live
              </span>
            </div>
          </header>
          <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
