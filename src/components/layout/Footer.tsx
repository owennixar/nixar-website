"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { services } from "@/lib/data/services";
import { cities } from "@/lib/data/cities";

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/about/team" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
] as const;

const RESOURCE_LINKS = [
  { label: "Free Audit", href: "/free-audit" },
  { label: "Marketing Glossary", href: "/resources/glossary" },
  { label: "SEO vs GEO vs AI SEO", href: "/resources/seo-vs-geo-vs-ai-seo" },
] as const;

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/nixarsolutions", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/nixarsolutions", icon: LinkedInIcon },
  { label: "Facebook", href: "https://facebook.com/nixarsolutions", icon: FacebookIcon },
  { label: "X", href: "https://x.com/nixarsolutions", icon: XIcon },
] as const;

const MARQUEE_TEXT =
  "Digital-Transformation Agency \u00A0\u2022\u00A0 Content-Centric & SEO-Driven \u00A0\u2022\u00A0 Sales-Focused & Lead-Conversion Oriented \u00A0\u2022\u00A0 End-to-End Web & Digital Infrastructure \u00A0\u2022\u00A0 Full-Funnel Sales Support \u00A0\u2022\u00A0 ";

const TOP_CITIES = cities.slice(0, 12);

export default function Footer() {
  return (
    <>
      <footer className="bg-[#0A0A0A] text-white" role="contentinfo">
        {/* ── Marquee strip ─────────────────────────────────────────── */}
        <div className="overflow-hidden border-b border-white/[0.06] py-5">
          <div className="footer-marquee-track flex whitespace-nowrap">
            {/* Duplicate for seamless loop */}
            {[0, 1].map((n) => (
              <span
                key={n}
                className="inline-block font-[family-name:var(--font-heading)] text-[1.25rem] font-700 uppercase tracking-[0.15em] text-white/90"
                aria-hidden={n === 1}
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* ── Main grid ─────────────────────────────────────────────── */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 lg:px-8">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="NIXAR Solutions. Home" className="flex items-center">
              <Logo height={28} />
            </Link>
            <p className="mt-5 max-w-xs text-[1.05rem] leading-relaxed text-white">
              Dallas-Fort Worth&apos;s Full-Service Digital Marketing Agency &mdash; SEO, Web Design, Social Media &amp; AI
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/75 transition-all duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-[1.15rem] font-700 uppercase tracking-[0.2em] text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[1.1rem] font-500 text-white transition-colors duration-200 hover:text-[var(--color-primary)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-[1.15rem] font-700 uppercase tracking-[0.2em] text-white">
              Resources
            </h3>
            <ul className="mt-5 space-y-3">
              {RESOURCE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[1.1rem] font-500 text-white transition-colors duration-200 hover:text-[var(--color-primary)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Services. all 10 */}
          <div>
            <h3 className="text-[1.15rem] font-700 uppercase tracking-[0.2em] text-white">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map(({ slug, shortTitle }) => (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}`}
                    className="text-[1.1rem] font-500 text-white transition-colors duration-200 hover:text-[var(--color-primary)]"
                  >
                    {shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Serving DFW. top 12 cities */}
          <div>
            <h3 className="text-[1.15rem] font-700 uppercase tracking-[0.2em] text-white">
              Serving DFW
            </h3>
            <ul className="mt-5 space-y-3">
              {TOP_CITIES.map(({ slug, name }) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="text-[1.1rem] font-500 text-white transition-colors duration-200 hover:text-[var(--color-primary)]"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Contact strip ─────────────────────────────────────────── */}
        <div className="border-t border-white/[0.06]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-5 py-8 sm:flex-row sm:gap-10 lg:px-8">
            <span className="flex items-center gap-2 text-[1.1rem] font-500 text-white">
              <MapPin size={18} className="text-[var(--color-primary)]" />
              Frisco, TX
            </span>
            <a
              href="tel:4697593638"
              className="flex items-center gap-2 text-[1.1rem] font-500 text-white transition-colors hover:text-[var(--color-primary)]"
            >
              <Phone size={18} className="text-[var(--color-primary)]" />
              469-759-3638
            </a>
            <a
              href="mailto:hello@nixarsolutions.com"
              className="flex items-center gap-2 text-[1.1rem] font-500 text-white transition-colors hover:text-[var(--color-primary)]"
            >
              <Mail size={18} className="text-[var(--color-primary)]" />
              hello@nixarsolutions.com
            </a>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div className="border-t border-[#222]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-[1rem] text-white/90 md:flex-row lg:px-8">
            <p>&copy; 2026 NIXAR Solutions. All Rights Reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-[var(--color-primary)]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-[var(--color-primary)]"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/sitemap-page"
                className="transition-colors hover:text-[var(--color-primary)]"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ── Inline social SVG icons ───────────────────────────────────────────── */
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
