"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/db/browser";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
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
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6">
      <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <h1 className="text-2xl font-semibold">Nixar Portal</h1>
        <p className="mt-1 text-sm text-white/60">Admin access only. Magic link login.</p>

        {status === "sent" ? (
          <div className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm">
            Check your inbox. Click the link to sign in.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@nixarsolutions.com"
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-white/30"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-lg bg-[#E71840] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Send magic link"}
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
