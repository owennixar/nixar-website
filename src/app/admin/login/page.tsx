"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/db/browser";
import Logo from "@/components/ui/Logo";

function LoginInner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const search = useSearchParams();
  const denied = search?.get("denied") === "1";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const sb = supabaseBrowser();
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin/dashboard` },
    });
    if (error) {
      setStatus("error");
      setError(error.message);
    } else {
      setStatus("sent");
    }
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(231,24,64,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo height={42} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm">
          <div className="mb-6 space-y-1">
            <h1 className="font-[var(--font-bebas)] text-3xl tracking-wide">Agency Portal</h1>
            <p className="text-sm text-white/50">Internal access only. Owen &amp; Anwar.</p>
          </div>

          {denied && status === "idle" && (
            <div className="mb-4 rounded-lg border border-[#E71840]/30 bg-[#E71840]/10 p-3 text-xs text-[#ff6884]">
              That email isn&apos;t on the admin allow-list. Use your Nixar work email.
            </div>
          )}

          {status === "sent" ? (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm">
              <div className="font-medium text-green-300">Check your inbox</div>
              <p className="mt-1 text-white/60">Magic link sent to <span className="font-mono text-white/80">{email}</span>. It expires in 60 minutes.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/50">Work email</span>
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@nixarsolutions.com"
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-white/25 focus:border-[#E71840]/60 focus:ring-2 focus:ring-[#E71840]/20"
                />
              </label>
              <button
                type="submit"
                disabled={status === "sending" || !email}
                className="group relative w-full overflow-hidden rounded-lg bg-[#E71840] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff1e48] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === "sending" ? "Sending link…" : "Send magic link"}
              </button>
              {error && <p className="text-xs text-[#ff6884]">{error}</p>}
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] uppercase tracking-[0.2em] text-white/30">
          Nixar Solutions · Est. 2023
        </p>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
