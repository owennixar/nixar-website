/**
 * Client-side helpers for firing first-party events to /api/track.
 *
 * Every function is fire-and-forget (swallow errors) so tracking never
 * blocks the user's flow. Consent gating is enforced by the server route.
 */

type Primitive = string | number | boolean | null | undefined;
type Props = Record<string, Primitive | Primitive[]>;

function hasAnalyticsConsent(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(/(?:^|;\s*)nx_consent=([^;]+)/);
  if (!match) return false;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    return parsed?.analytics === "granted";
  } catch {
    return false;
  }
}

async function send(body: Record<string, unknown>): Promise<string | null> {
  if (!hasAnalyticsConsent()) return null;
  try {
    const res = await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
    if (!res.ok) return null;
    const json = await res.json().catch(() => null);
    return json?.event_id ?? null;
  } catch {
    return null;
  }
}

/**
 * Primary conversion event. Fires on successful form submission. Includes
 * PII (email/phone) so the server can hash it for Meta CAPI Lead events.
 */
export async function trackFormSubmit(params: {
  form: string;
  email?: string;
  phone?: string;
  name?: string;
  fields?: Record<string, Primitive>;
}): Promise<string | null> {
  const { form, email, phone, name, fields = {} } = params;
  return send({
    type: "form_submit",
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    email,
    phone,
    props: { form, name, ...fields },
  });
}

/** Secondary intent signal — phone / email / WhatsApp / LinkedIn tap. */
export function trackTap(target: string, href?: string) {
  void send({
    type: "click",
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    props: { kind: "tap", target, href },
  });
}

/** CTA / button click with position so heatmaps have data. */
export function trackClick(target: string, e: { clientX?: number; clientY?: number }, extra?: Props) {
  void send({
    type: "click",
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    props: {
      kind: "cta",
      target,
      x: e.clientX,
      y: e.clientY,
      vw: typeof window !== "undefined" ? window.innerWidth : undefined,
      vh: typeof window !== "undefined" ? window.innerHeight : undefined,
      ...extra,
    },
  });
}

/** Scroll depth milestone (25/50/75/100). */
export function trackScroll(depth: 25 | 50 | 75 | 100) {
  void send({
    type: "custom",
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    props: { kind: "scroll_depth", depth },
  });
}

/** Heartbeat for true time-on-page. Fires every 15s while tab is focused. */
export function trackHeartbeat(seconds: number) {
  void send({
    type: "custom",
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    props: { kind: "heartbeat", seconds },
  });
}

/** Final time-on-page on unload (via sendBeacon for reliability). */
export function trackPageLeave(seconds: number, maxScroll: number) {
  if (!hasAnalyticsConsent()) return;
  const payload = JSON.stringify({
    type: "custom",
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    props: { kind: "page_leave", seconds, max_scroll: maxScroll },
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
  } else {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }
}
