// Baseline load test for NIXAR website.
// Run:  k6 run -e BASE_URL=https://nixar-website.vercel.app tests/load/k6-baseline.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "1m", target: 25 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1500"],
  },
};

const BASE = __ENV.BASE_URL || "http://localhost:3000";
const PATHS = ["/", "/about", "/services", "/contact", "/pricing", "/free-audit"];

export default function () {
  const path = PATHS[Math.floor(Math.random() * PATHS.length)];
  const res = http.get(`${BASE}${path}`);
  check(res, {
    "status 200": (r) => r.status === 200,
    "has CSP": (r) => !!r.headers["Content-Security-Policy"],
    "has HSTS": (r) => !!r.headers["Strict-Transport-Security"],
    "sets vid cookie": (r) => /nx_vid=/.test(r.headers["Set-Cookie"] || ""),
  });
  sleep(1 + Math.random() * 2);
}
