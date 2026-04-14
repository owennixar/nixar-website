import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServer } from "@/lib/db/server";
import { supabaseAdmin } from "@/lib/db/supabase";

export const dynamic = "force-dynamic";

async function isAllowedAdmin(email: string): Promise<boolean> {
  const { data } = await supabaseAdmin()
    .from("admin_users")
    .select("email")
    .ilike("email", email)
    .maybeSingle();
  return !!data;
}

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();

  if (!user?.email) redirect("/admin/login");
  if (!(await isAllowedAdmin(user.email))) redirect("/admin/login?denied=1");

  return (
    <div className="min-h-dvh bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/admin/dashboard" className="text-sm font-semibold tracking-wider text-white/80">
            NIXAR PORTAL
          </Link>
          <span className="text-xs text-white/50">{user.email}</span>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
