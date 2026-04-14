import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const SECRET = process.env.SESSION_SECRET || "dev-secret-change-me-in-production";

export const VISITOR_COOKIE = "nx_vid";
export const CONSENT_COOKIE = "nx_consent";
export const SESSION_COOKIE = "nx_sid";

function sign(value: string): string {
  return createHmac("sha256", SECRET).update(value).digest("base64url");
}

export function issueVisitorId(): string {
  const raw = randomBytes(16).toString("base64url");
  return `${raw}.${sign(raw)}`;
}

export function verifyVisitorId(token: string | undefined): string | null {
  if (!token) return null;
  const [raw, sig] = token.split(".");
  if (!raw || !sig) return null;
  const expected = sign(raw);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  return timingSafeEqual(a, b) ? raw : null;
}

export const cookieBaseAttrs = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
};
