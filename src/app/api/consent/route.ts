import { NextRequest, NextResponse } from "next/server";
import { CONSENT_COOKIE, verifyVisitorId, VISITOR_COOKIE } from "@/lib/security/session";
import { supabaseAdmin } from "@/lib/db/supabase";
import { createHash } from "node:crypto";

export const runtime = "nodejs";

const ONE_YEAR = 60 * 60 * 24 * 365;
const VALID = new Set(["granted", "denied"]);

type Consent = { analytics: "granted" | "denied"; marketing: "granted" | "denied"; ts: number };

export async function GET(req: NextRequest) {
  const raw = req.cookies.get(CONSENT_COOKIE)?.value;
  if (!raw) return NextResponse.json({ consent: null });
  try {
    return NextResponse.json({ consent: JSON.parse(raw) as Consent });
  } catch {
    return NextResponse.json({ consent: null });
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<Consent>;
  const analytics = VALID.has(body.analytics as string) ? body.analytics! : "denied";
  const marketing = VALID.has(body.marketing as string) ? body.marketing! : "denied";
  const consent: Consent = { analytics, marketing, ts: Date.now() };

  const visitorId = verifyVisitorId(req.cookies.get(VISITOR_COOKIE)?.value);
  if (visitorId) {
    const fwd = req.headers.get("x-forwarded-for") || "";
    const ip = fwd.split(",")[0].trim();
    const ipHash = ip ? createHash("sha256").update(ip).digest("hex") : null;
    await supabaseAdmin().from("consent_log").insert({
      visitor_id: visitorId,
      analytics,
      marketing,
      ip_hash: ipHash,
      ua: req.headers.get("user-agent")?.slice(0, 256) || null,
    });
  }

  const res = NextResponse.json({ ok: true, consent });
  res.cookies.set(CONSENT_COOKIE, JSON.stringify(consent), {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ONE_YEAR,
  });
  return res;
}
