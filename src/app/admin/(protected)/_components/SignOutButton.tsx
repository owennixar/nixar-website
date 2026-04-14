"use client";

import { supabaseBrowser } from "@/lib/db/browser";

export default function SignOutButton() {
  async function signOut() {
    await supabaseBrowser().auth.signOut();
    window.location.href = "/admin/login";
  }
  return (
    <button
      onClick={signOut}
      className="mt-3 w-full rounded-md border border-white/10 bg-transparent px-3 py-1.5 text-[11px] uppercase tracking-wider text-white/60 transition hover:border-[#E71840]/40 hover:text-white"
    >
      Sign out
    </button>
  );
}
