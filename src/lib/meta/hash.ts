import { createHash } from "node:crypto";

/** Meta CAPI requires SHA-256 hex of normalized, lowercased, trimmed values. */
export function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string): string {
  // strip everything non-digit; leading country code required per Meta spec
  return phone.replace(/\D+/g, "");
}

export function hashEmail(email?: string): string | undefined {
  if (!email) return undefined;
  return sha256Hex(normalizeEmail(email));
}

export function hashPhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  return sha256Hex(normalizePhone(phone));
}
