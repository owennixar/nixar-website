"use client";

import { useState, type FormEvent } from "react";
import { trackFormSubmit } from "@/lib/analytics/track-client";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus("sending");
    await trackFormSubmit({ form: "newsletter", email });
    setStatus("done");
  };

  if (status === "done") {
    return (
      <p className="mt-8 text-center text-[16px] text-white/85 max-w-md mx-auto">
        Thanks! You&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 rounded-lg border border-[#333] bg-[#111] px-4 py-3 text-base text-white placeholder-[#666] outline-none focus:border-[#E71840] transition-colors"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-[#E71840] px-6 py-3 text-base font-600 uppercase tracking-wider text-white hover:bg-[#C41535] transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "…" : "Subscribe"}
      </button>
    </form>
  );
}
