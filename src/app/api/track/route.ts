import { NextRequest, NextResponse } from "next/server";
import { verifyVisitorId, VISITOR_COOKIE } from "@/lib/security/session";
import { rateLimit, getClientKey } from "@/lib/security/rate-limit";
import { recordEvent, getRecentEvents, eventCount } from "@/lib/security/events";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set(["pageview", "click", "form_submit", "custom"]);
const MAX_BODY_BYTES = 4_096;

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

  let body: { type?: string; path?: string; referrer?: string; props?: Record<string, unknown> };
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const type = String(body.type || "");
  const path = String(body.path || "");
  if (!ALLOWED_TYPES.has(type) || !path) {
    return NextResponse.json({ error: "invalid_event" }, { status: 400 });
  }

  recordEvent({
    visitorId,
    type,
    path: path.slice(0, 512),
    referrer: body.referrer?.slice(0, 512),
    ua: req.headers.get("user-agent")?.slice(0, 256) || undefined,
    ts: Date.now(),
    props: body.props,
  });

  return NextResponse.json({ ok: true }, { status: 202 });
}

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production" && req.headers.get("x-debug-key") !== process.env.DEBUG_KEY) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  return NextResponse.json({ count: eventCount(), recent: getRecentEvents(50) });
}
