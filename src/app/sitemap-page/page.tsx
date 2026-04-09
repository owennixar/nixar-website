import type { Metadata } from "next";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBanner from "@/components/sections/CtaBanner";
import { services } from "@/lib/data/services";
import { cities } from "@/lib/data/cities";

export const metadata: Metadata = {
  title: "Sitemap | NIXAR Solutions",
  description:
    "Complete sitemap of all pages on the NIXAR Solutions website. Browse our services, location pages, blog, and more.",
};

const mainPages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Free Audit", href: "/free-audit" },
  { label: "Careers", href: "/careers" },
];

const legalPages = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const headingClass =
  "text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)] mb-4";
const linkClass =
  "text-[14px] text-white/50 hover:text-[var(--color-primary)] transition-colors";

export default function SitemapPage() {
  return (
    <main className="bg-[#0a0a0a]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pb-16 pt-12 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <AnimateIn>
            <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,7vw,5rem)] font-700 uppercase leading-[1.05] tracking-tight">
              <span className="text-white">SITE</span>
              <span className="text-[var(--color-primary)]">MAP.</span>
            </h1>
          </AnimateIn>
        </div>
      </section>

      {/* ── Sitemap Grid ───────────────────────────────────────── */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <AnimateIn>
            <div className="glass-card p-8 lg:p-10">
              <div className="grid gap-10 lg:grid-cols-3">
                {/* Column 1 — Main Pages */}
                <div>
                  <h2 className={headingClass}>MAIN PAGES</h2>
                  <ul className="space-y-2">
                    {mainPages.map((page) => (
                      <li key={page.href}>
                        <Link href={page.href} className={linkClass}>
                          {page.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2 — Services */}
                <div>
                  <h2 className={headingClass}>SERVICES</h2>
                  <ul className="space-y-2">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className={linkClass}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3 — Locations */}
                <div>
                  <h2 className={headingClass}>LOCATIONS</h2>
                  <ul className="space-y-2">
                    {/* Dallas first */}
                    <li>
                      <Link href="/dallas" className={linkClass}>
                        Dallas
                      </Link>
                    </li>
                    {cities
                      .filter((city) => city.slug !== "dallas")
                      .map((city) => (
                        <li key={city.slug}>
                          <Link href={`/${city.slug}`} className={linkClass}>
                            {city.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Legal row */}
              <div className="mt-10 border-t border-white/10 pt-8">
                <h2 className={headingClass}>LEGAL</h2>
                <ul className="flex flex-wrap gap-x-8 gap-y-2">
                  {legalPages.map((page) => (
                    <li key={page.href}>
                      <Link href={page.href} className={linkClass}>
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <CtaBanner />
    </main>
  );
}
