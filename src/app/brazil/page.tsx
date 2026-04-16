import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Globe } from "lucide-react";
import { services } from "@/lib/data/services";
import {
  breadcrumbSchema,
  organizationSchema,
  schemaToScript,
} from "@/lib/seo/schemas";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBanner from "@/components/sections/CtaBanner";

const CITIES = ["São Paulo", "Rio de Janeiro", "Brasília"];

const INDUSTRIES = [
  "Fintech & Banking",
  "E-commerce & Retail",
  "Media & Entertainment",
  "Agribusiness",
  "Tech & Startups",
  "Tourism & Hospitality",
  "Real Estate & Construction",
];

export const metadata: Metadata = {
  title: "Marketing Agency Brazil | Bilingual SEO & AI Marketing | NIXAR Solutions",
  description:
    "NIXAR Solutions brings AI-powered digital marketing to businesses across Brazil. Bilingual SEO, web development, and brand strategy for São Paulo, Rio de Janeiro, and Brasília. Led by a team with Brazilian roots and engineering leadership.",
  alternates: { canonical: "https://nixarsolutions.com/brazil" },
};

export default function BrazilPage() {
  return (
    <>
      <main>
        {/* ─── HERO ────────────────────────────────────────── */}
        <section className="relative overflow-hidden pb-16 pt-12 lg:pt-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="hero-orb" style={{ width: 500, height: 500, background: "rgba(231,24,64,0.06)", top: "-10%", right: "-5%", animation: "orbFloat1 20s ease-in-out infinite" }} />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn delay={0.1} direction="none">
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="text-[1rem] font-600 uppercase tracking-[0.15em] text-white/75 transition-colors hover:text-[#E71840]"
                >
                  Global Markets
                </Link>
                <span className="text-white/75">/</span>
                <span className="flex items-center gap-1.5 text-[1rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                  <Globe size={14} />
                  Brazil
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(2.25rem,5vw,4.25rem)] font-900 leading-[1.08] tracking-tight text-white">
                Digital Marketing for{" "}
                <span className="text-[#E71840]">Brazil</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.35} direction="none">
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.7] text-white/85">
                Bilingual SEO, web development, and AI-powered brand strategy for Brazilian
                businesses. Built by a team with Brazilian roots and engineering leadership,
                serving clients across São Paulo, Rio de Janeiro, and Brasília.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.45} direction="none">
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/free-audit"
                  className="inline-flex h-12 items-center rounded-full bg-[#E71840] px-7 text-[16px] font-600 text-white shadow-lg shadow-[#E71840]/20 transition-all hover:bg-[#C41535] hover:scale-[1.02]"
                >
                  Free Market Audit
                </Link>
                <span className="text-[16px] text-white/75">
                  Serving {CITIES.join(" · ")}
                </span>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ─── HERITAGE STORY ─────────────────────────────── */}
        <section className="bg-white/[0.02] py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-5 lg:gap-16 lg:px-8">
            <div className="lg:col-span-3">
              <AnimateIn direction="left" distance={30}>
                <p className="text-[1rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                  Raízes Brasileiras
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-white">
                  Why Brazil Is Personal for Us
                </h2>
              </AnimateIn>

              <AnimateIn direction="left" distance={20} delay={0.1}>
                <p className="mt-6 text-[16px] leading-[1.8] text-white/85">
                  NIXAR Solutions co-founder Owen Nixon has deep Brazilian heritage, and
                  Brazil has always been part of the NIXAR story. That connection runs
                  through our leadership and our engineering culture. we work the way the
                  best Brazilian tech teams work: pragmatic, fast, global in ambition, and
                  obsessed with craft.
                </p>
              </AnimateIn>

              <AnimateIn direction="left" distance={20} delay={0.18}>
                <p className="mt-4 text-[16px] leading-[1.8] text-white/85">
                  Our Chief Technology Officer, Murilo Leite Filho, is Brazilian and leads
                  NIXAR&apos;s engineering, infrastructure, and AI systems. Murilo brings the
                  technical depth and cross-border perspective that lets NIXAR build products
                  and campaigns that work in both Portuguese and English markets from day one.
                  Having Brazilian leadership in the engineering seat is not decorative. it
                  shapes how we architect websites, how we think about performance in markets
                  with diverse network conditions, and how we approach AI automation for
                  Brazilian-language content.
                </p>
              </AnimateIn>

              <AnimateIn direction="left" distance={20} delay={0.25}>
                <p className="mt-4 text-[16px] leading-[1.8] text-white/85">
                  Brazil is not one market. São Paulo is the financial and corporate engine,
                  Rio de Janeiro is the media, tourism, and creative capital, and Brasília is
                  the political and government-services hub. NIXAR builds separate playbooks
                  for each. from AI SEO that ranks in Portuguese, to conversion-focused web
                  development tuned for Brazilian user behavior, to paid media that respects
                  how Brazilian consumers actually research and buy.
                </p>
              </AnimateIn>
            </div>

            <AnimateIn direction="right" distance={30} delay={0.15} className="lg:col-span-2">
              <div className="rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/10 p-7">
                <h3 className="font-[family-name:var(--font-heading)] text-[1.1rem] font-700 uppercase text-white">
                  Cities We Serve
                </h3>
                <ul className="mt-4 space-y-3">
                  {CITIES.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-[16px] text-white/85">
                      <MapPin size={16} className="text-[#E71840]" />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <h3 className="font-[family-name:var(--font-heading)] text-[1.1rem] font-700 uppercase text-white">
                    Key Industries
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {INDUSTRIES.map((ind) => (
                      <span
                        key={ind}
                        className="rounded-full bg-white/[0.04] px-3 py-1.5 text-[16px] font-500 text-white/85"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <h3 className="font-[family-name:var(--font-heading)] text-[1.1rem] font-700 uppercase text-white">
                    Brazil at a Glance
                  </h3>
                  <dl className="mt-3 space-y-3 text-[16px]">
                    <div className="flex justify-between">
                      <dt className="text-white/75">Capital</dt>
                      <dd className="font-600 text-white">Brasília</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/75">Population</dt>
                      <dd className="font-600 text-white">215M+</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/75">NIXAR HQ</dt>
                      <dd className="font-600 text-[#E71840]">Frisco, TX</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ─── SERVICES ───────────────────────────────────── */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[1rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                What We Do in Brazil
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-white">
                Services for Brazilian Businesses
              </h2>
            </AnimateIn>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((s, i) => (
                <AnimateIn key={s.slug} delay={i * 0.08}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="glass-card group flex h-full flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-[1.3rem] font-700 uppercase text-white">
                        {s.shortTitle}
                      </h3>
                      <p className="mt-3 text-[16px] leading-[1.6] text-white/75">
                        {s.description.split(".").slice(0, 2).join(".")}.
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-[16px] font-600 uppercase tracking-[0.1em] text-[#E71840] transition-colors group-hover:text-white">
                      Learn More <ArrowRight size={16} />
                    </span>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToScript(organizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToScript(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Brazil", url: "/brazil" },
            ])
          ),
        }}
      />
    </>
  );
}
