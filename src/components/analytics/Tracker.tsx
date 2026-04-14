"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

function readConsent(): { analytics: "granted" | "denied" } | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)nx_consent=([^;]+)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

type Attribution = {
  fbclid?: string;
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

function pickAttribution(search: URLSearchParams): Attribution {
  const attr: Attribution = {};
  const keys: (keyof Attribution)[] = [
    "fbclid", "gclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  ];
  for (const k of keys) {
    const v = search.get(k);
    if (v) attr[k] = v.slice(0, 256);
  }
  return attr;
}

export default function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const consent = readConsent();
    if (consent?.analytics !== "granted") return;

    const qs = searchParams?.toString();
    const fullPath = qs ? `${pathname}?${qs}` : pathname;
    if (lastPath.current === fullPath) return;
    lastPath.current = fullPath;

    const attribution = searchParams ? pickAttribution(searchParams) : {};

    const body = JSON.stringify({
      type: "pageview",
      path: fullPath,
      referrer: document.referrer || undefined,
      ...attribution,
    });

    // Use fetch so we can read back event_id for CAPI dedup with Meta Pixel
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    })
      .then((r) => r.ok ? r.json() : null)
      .then((json) => {
        if (!json?.event_id) return;
        // Fire browser pixel with SAME event_id so Meta deduplicates server+browser
        type FBQ = (...args: unknown[]) => void;
        const fbq = (window as unknown as { fbq?: FBQ }).fbq;
        if (typeof fbq === "function") {
          fbq("track", "PageView", {}, { eventID: json.event_id });
        }
      })
      .catch(() => {});
  }, [pathname, searchParams]);

  return null;
}
