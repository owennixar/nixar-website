"use client";

import { useEffect, useState } from "react";

type Choice = "granted" | "denied";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const has = document.cookie.match(/(?:^|;\s*)nx_consent=/);
    if (!has) setVisible(true);
  }, []);

  async function save(analytics: Choice, marketing: Choice) {
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ analytics, marketing }),
    });
    setVisible(false);
    if (analytics === "granted") window.location.reload();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-5 shadow-2xl backdrop-blur md:left-6 md:right-auto"
    >
      <p className="text-base leading-relaxed text-white/90">
        We use first-party cookies to understand how you use our site and improve your experience.
        No third-party trackers, no data sold. See our{" "}
        <a href="/privacy-policy" className="underline hover:text-[#E71840]">
          privacy policy
        </a>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => save("granted", "granted")}
          className="rounded-full bg-[#E71840] px-4 py-2 text-base font-semibold text-white hover:opacity-90"
        >
          Accept all
        </button>
        <button
          onClick={() => save("granted", "denied")}
          className="rounded-full border border-white/20 px-4 py-2 text-base text-white hover:bg-white/10"
        >
          Analytics only
        </button>
        <button
          onClick={() => save("denied", "denied")}
          className="rounded-full px-4 py-2 text-base text-white/70 hover:text-white"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
