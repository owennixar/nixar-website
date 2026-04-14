const SECRET = process.env.SESSION_SECRET || "dev-secret-change-me-in-production";

async function hmac(raw: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw));
  return base64url(new Uint8Array(sig));
}

function base64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function issueVisitorIdEdge(): Promise<string> {
  const buf = new Uint8Array(16);
  crypto.getRandomValues(buf);
  const raw = base64url(buf);
  const sig = await hmac(raw);
  return `${raw}.${sig}`;
}

export async function verifyVisitorIdEdge(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  const [raw, sig] = token.split(".");
  if (!raw || !sig) return null;
  const expected = await hmac(raw);
  if (sig.length !== expected.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0 ? raw : null;
}
