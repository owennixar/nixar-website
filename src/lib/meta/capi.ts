import { hashEmail, hashPhone, sha256Hex } from "./hash";

const META_API_VERSION = "v20.0";

export type CAPIUserData = {
  email?: string;
  phone?: string;
  fbp?: string;  // _fbp cookie raw
  fbc?: string;  // _fbc cookie raw
  clientIp?: string;
  userAgent?: string;
  externalId?: string;
};

export type CAPIEvent = {
  eventName: string;                   // e.g. 'PageView', 'Lead', 'SubmitApplication'
  eventId?: string;                    // for dedup with browser pixel
  eventTime?: number;                  // unix seconds
  eventSourceUrl?: string;             // full url of the page
  actionSource?: "website" | "system_generated" | "app";
  userData: CAPIUserData;
  customData?: Record<string, unknown>;
};

export type CAPIConfig = {
  pixelId: string;
  accessToken: string;
  testEventCode?: string;              // set during dev to hit Test Events tab
};

function buildUserData(u: CAPIUserData) {
  return {
    em: u.email ? [hashEmail(u.email)] : undefined,
    ph: u.phone ? [hashPhone(u.phone)] : undefined,
    fbp: u.fbp,
    fbc: u.fbc,
    client_ip_address: u.clientIp,
    client_user_agent: u.userAgent,
    external_id: u.externalId ? [sha256Hex(u.externalId)] : undefined,
  };
}

export async function sendCAPIEvent(cfg: CAPIConfig, evt: CAPIEvent): Promise<{ ok: boolean; status: number; body: unknown }> {
  const url = `https://graph.facebook.com/${META_API_VERSION}/${cfg.pixelId}/events?access_token=${encodeURIComponent(cfg.accessToken)}`;

  const payload = {
    data: [
      {
        event_name: evt.eventName,
        event_time: evt.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: evt.eventId,
        event_source_url: evt.eventSourceUrl,
        action_source: evt.actionSource ?? "website",
        user_data: buildUserData(evt.userData),
        custom_data: evt.customData,
      },
    ],
    test_event_code: cfg.testEventCode,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body };
}

/** Fire-and-forget wrapper; logs errors to console but never throws. */
export async function sendCAPISafe(cfg: CAPIConfig, evt: CAPIEvent): Promise<void> {
  try {
    const r = await sendCAPIEvent(cfg, evt);
    if (!r.ok) console.error("[CAPI]", r.status, r.body);
  } catch (e) {
    console.error("[CAPI] threw", e);
  }
}

export function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
