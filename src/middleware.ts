import { NextRequest, NextResponse } from "next/server";
import { issueVisitorIdEdge, verifyVisitorIdEdge } from "@/lib/security/edge-session";

const VISITOR_COOKIE = "nx_vid";
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const existing = req.cookies.get(VISITOR_COOKIE)?.value;
  const verified = await verifyVisitorIdEdge(existing);
  if (!verified) {
    const fresh = await issueVisitorIdEdge();
    res.cookies.set(VISITOR_COOKIE, fresh, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: ONE_YEAR,
    });
  }

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob:",
    // connect-src: Supabase for admin + auth, Facebook for pixel beacons
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.facebook.com https://connect.facebook.net",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|videos|fonts|.*\\..*).*)",
  ],
};
