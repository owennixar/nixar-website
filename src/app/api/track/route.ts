import { NextRequest, NextResponse } from "next/server";
import { verifyVisitorId, VISITOR_COOKIE, CONSENT_COOKIE } from "@/lib/security/session";
import { rateLimit, getClientKey } from "@/lib/security/rate-limit";
import { supabaseAdmin } from "@/lib/db/supabase";
import { sendCAPISafe, generateEventId } from "@/lib/meta/capi";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set(["pageview", "click", "form_submit", "custom"]);
const MAX_BODY_BYTES = 4_096;

// Map our internal event types to Meta CAPI standard event names
const CAPI_EVENT_MAP: Record<string, string | null> = {
  pageview: "PageView",
  form_submit: "Lead",
  click: null,      // only fire to CAPI for explicit lead events
  custom: null,
};

type Body = {
  type?: string;
  path?: string;
  referrer?: string;
  fbclid?: string;
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  props?: Record<string, unknown>;
  clientSlug?: string;
  email?: string;
  phone?: string;
};

function hasMarketingConsent(req: NextRequest): boolean {
  const raw = req.cookies.get(CONSENT_COOKIE)?.value;
  if (!raw) return false;
  try {
    const c = JSON.parse(raw) as { marketing?: string };
    return c.marketing === "granted";
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const visitorId = verifyVisitorId(req.cookies.get(VISITOR_COOKIE)?.value);
  if (!visitorId) {
    return NextResponse.json({ error: "no_visitor" }, { status: 400 });
  }

  const rl = rateLimit(getClientKey(req, visitorId), 60, 60_000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  let body: Body;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const type = String(body.type || "");
  const path = String(body.path || "").slice(0, 512);
  if (!ALLOWED_TYPES.has(type) || !path) {
    return NextResponse.json({ error: "invalid_event" }, { status: 400 });
  }

  const ua = req.headers.get("user-agent")?.slice(0, 256) || null;
  const referrer = body.referrer?.slice(0, 512) || null;
  const fwd = req.headers.get("x-forwarded-for") || "";
  const clientIp = fwd.split(",")[0].trim() || null;
  const db = supabaseAdmin();

  const clientSlug = body.clientSlug || "nixar";
  const { data: client } = await db
    .from("clients")
    .select("id, meta_pixel_id")
    .eq("slug", clientSlug)
    .maybeSingle();
  const clientId = client?.id ?? null;

  const attribution = {
    fbclid: body.fbclid || null,
    gclid: body.gclid || null,
    utm_source: body.utm_source || null,
    utm_medium: body.utm_medium || null,
    utm_campaign: body.utm_campaign || null,
    utm_content: body.utm_content || null,
    utm_term: body.utm_term || null,
  };
  const hasAttribution = Object.values(attribution).some(Boolean);

  const { data: existing } = await db
    .from("visitors")
    .select("visitor_id, fbclid, utm_source")
    .eq("visitor_id", visitorId)
    .maybeSingle();

  if (!existing) {
    await db.from("visitors").insert({
      visitor_id: visitorId,
      client_id: clientId,
      ua,
      referrer,
      ...attribution,
      event_count: 1,
    });
  } else {
    const patch: Record<string, unknown> = { last_seen: new Date().toISOString() };
    if (hasAttribution && !existing.fbclid && !existing.utm_source) {
      Object.assign(patch, attribution);
    }
    await db.from("visitors").update(patch).eq("visitor_id", visitorId);
  }

  const eventId = generateEventId();
  await db.from("events").insert({
    visitor_id: visitorId,
    client_id: clientId,
    type,
    path,
    referrer,
    ua,
    props: { ...(body.props ?? {}), event_id: eventId },
  });

  // Forward to Meta CAPI when marketing consent + mappable event
  const metaEventName = CAPI_EVENT_MAP[type];
  const pixelId = client?.meta_pixel_id || process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (metaEventName && pixelId && token && hasMarketingConsent(req)) {
    const origin = req.headers.get("origin") || req.headers.get("referer") || "";
    const url = origin ? `${origin}${path}` : path;
    const fbp = req.cookies.get("_fbp")?.value;
    const fbc = req.cookies.get("_fbc")?.value || (body.fbclid ? `fb.1.${Date.now()}.${body.fbclid}` : undefined);

    sendCAPISafe(
      { pixelId, accessToken: token },
      {
        eventName: metaEventName,
        eventId,
        eventSourceUrl: url,
        userData: {
          email: body.email,
          phone: body.phone,
          fbp,
          fbc,
          clientIp: clientIp ?? undefined,
          userAgent: ua ?? undefined,
          externalId: visitorId,
        },
        customData: { internal_type: type, ...attribution },
      },
    );
  }

  return NextResponse.json({ ok: true, event_id: eventId }, { status: 202 });
}

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production" && req.headers.get("x-debug-key") !== process.env.DEBUG_KEY) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const db = supabaseAdmin();
  const { data: events, count } = await db
    .from("events")
    .select("*", { count: "exact" })
    .order("ts", { ascending: false })
    .limit(50);
  return NextResponse.json({ count, recent: events });
}
