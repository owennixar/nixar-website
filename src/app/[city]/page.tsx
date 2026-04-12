import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import {
  cities,
  getCityBySlug,
  getNearbyCities,
} from "@/lib/data/cities";
import { services } from "@/lib/data/services";
import { getCityFaqs } from "@/lib/data/faq";
import {
  localBusinessSchema,
  faqSchema,
  breadcrumbSchema,
  schemaToScript,
} from "@/lib/seo/schemas";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBanner from "@/components/sections/CtaBanner";

/* ── Static generation: 19 cities (everything except "dallas") ──── */
const CITY_SLUGS = cities
  .filter((c) => c.slug !== "dallas")
  .map((c) => c.slug);

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: city.seoTitle,
    description: city.seoDescription,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);

  // Only render for valid city slugs (not "dallas" — that has its own route)
  if (!city || city.slug === "dallas") notFound();

  const nearbyCities = getNearbyCities(slug);
  const faqs = getCityFaqs(city.name);
  const topServices = services.slice(0, 6);

  return (
    <>
      <main>
        {/* ─── HERO ────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white pb-16 pt-12 lg:pt-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="hero-orb" style={{ width: 400, height: 400, background: "rgba(231,24,64,0.04)", top: "-5%", right: "5%", animation: "orbFloat2 20s ease-in-out infinite" }} />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn delay={0.1} direction="none">
              <div className="flex items-center gap-2">
                <Link
                  href="/dallas"
                  className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
                >
                  DFW Metroplex
                </Link>
                <span className="text-[var(--color-border)]">/</span>
                <span className="flex items-center gap-1.5 text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                  <MapPin size={13} />
                  {city.name}, TX
                </span>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(2.25rem,5vw,4rem)] font-900 leading-[1.08] tracking-tight text-[#1A1A1A]">
                {city.name} Digital Marketing{" "}
                <span className="text-[var(--color-primary)]">&amp; AI Solutions</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.35} direction="none">
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.7] text-[var(--color-text-secondary)]">
                NIXAR Solutions brings AI-powered digital marketing to {city.name}, TX.
                From SEO and web development to custom AI agents and paid advertising —
                we help {city.name} businesses compete and win in the digital space.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.45} direction="none">
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center rounded-full bg-[var(--color-primary)] px-7 text-[14px] font-600 text-white shadow-lg shadow-[var(--color-primary-glow)] transition-all hover:bg-[var(--color-primary-hover)] hover:scale-[1.02]"
                >
                  Get Free {city.name} Market Audit
                </a>
                <span className="text-[13px] text-[var(--color-text-muted)]">
                  {city.county} &middot; Population: {city.population}
                </span>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ─── ABOUT THIS CITY ───────────────────────────────── */}
        <section className="bg-[var(--color-bg-alt)] py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-5 lg:gap-16 lg:px-8">
            <div className="lg:col-span-3">
              <AnimateIn direction="left" distance={30}>
                <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                  The {city.name} Market
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
                  Why {city.name} Businesses Need Digital Transformation
                </h2>
              </AnimateIn>

              <AnimateIn direction="left" distance={20} delay={0.1}>
                <p className="mt-6 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                  {city.uniqueDescription}
                </p>
              </AnimateIn>

              <AnimateIn direction="left" distance={20} delay={0.18}>
                <p className="mt-4 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                  For {city.name} businesses, investing in digital marketing is not optional — it is
                  the difference between growth and stagnation. Whether you are a local service
                  provider trying to capture &ldquo;near me&rdquo; searches, a B2B company targeting
                  corporate decision-makers, or a retailer competing with national chains, your online
                  presence determines how many customers find you and how they perceive your brand.
                </p>
              </AnimateIn>

              <AnimateIn direction="left" distance={20} delay={0.25}>
                <p className="mt-4 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                  NIXAR Solutions is based in Frisco — right in the heart of the DFW metroplex — and
                  we understand the {city.name} market at a granular level. We know which keywords
                  drive local traffic, how {city.name} consumers research businesses, and what it
                  takes to stand out in {city.county}. Our AI-powered approach means faster results
                  with more precision than traditional agencies can deliver.
                </p>
              </AnimateIn>
            </div>

            {/* Industries sidebar */}
            <AnimateIn direction="right" distance={30} delay={0.15} className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-7 shadow-sm">
                <h3 className="font-[family-name:var(--font-heading)] text-[15px] font-700 text-[#1A1A1A]">
                  Key Industries in {city.name}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {city.keyIndustries.map((ind) => (
                    <span
                      key={ind}
                      className="rounded-full bg-[var(--color-bg-alt)] px-3 py-1.5 text-[13px] font-500 text-[var(--color-text-secondary)]"
                    >
                      {ind}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-[var(--color-border)] pt-6">
                  <h3 className="font-[family-name:var(--font-heading)] text-[15px] font-700 text-[#1A1A1A]">
                    {city.name} at a Glance
                  </h3>
                  <dl className="mt-3 space-y-3 text-[14px]">
                    <div className="flex justify-between">
                      <dt className="text-[var(--color-text-muted)]">Population</dt>
                      <dd className="font-600 text-[#1A1A1A]">{city.population}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[var(--color-text-muted)]">County</dt>
                      <dd className="font-600 text-[#1A1A1A]">{city.county}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[var(--color-text-muted)]">NIXAR HQ</dt>
                      <dd className="font-600 text-[var(--color-primary)]">Frisco, TX</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ─── WHY DIGITAL TRANSFORMATION ────────────────────── */}
        <section className="bg-[#0A0A0A] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 tracking-tight text-white">
                Why {city.name} Businesses Need{" "}
                <span className="text-[#E71840]">Digital Transformation</span>
              </h2>
            </AnimateIn>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              <AnimateIn delay={0.1}>
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="font-[family-name:var(--font-heading)] text-[1.05rem] font-700 text-[#E71840]">
                    LOCAL COMPETITION IS FIERCE
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-gray-300">
                    With {city.population} residents and thousands of businesses competing
                    for attention, standing out online isn&apos;t optional — it&apos;s survival.
                    The businesses investing in digital marketing today will own the market
                    tomorrow.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="font-[family-name:var(--font-heading)] text-[1.05rem] font-700 text-[#E71840]">
                    YOUR CUSTOMERS ARE SEARCHING ONLINE
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-gray-300">
                    88% of local searches on mobile result in a call or visit within one
                    week. If your business isn&apos;t visible when {city.name} residents search
                    for your services, you&apos;re losing customers to competitors who are.
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="font-[family-name:var(--font-heading)] text-[1.05rem] font-700 text-[#E71840]">
                    AI IS CHANGING EVERYTHING
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-gray-300">
                    ChatGPT, Perplexity, and Google AI Overviews are reshaping how people
                    find businesses. {city.name} businesses that optimize for AI search now
                    will have a massive head start over those that wait.
                  </p>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ─── SERVICES ──────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 tracking-tight text-[#1A1A1A]">
                Our Services in {city.name}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] text-[var(--color-text-secondary)]">
                Every service below is available to {city.name} businesses and tailored to
                your local market dynamics.
              </p>
            </AnimateIn>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topServices.map((s, i) => (
                <AnimateIn key={s.slug} delay={0.05 * i}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between rounded-xl bg-[var(--color-bg-alt)] p-5 transition-all hover:bg-[var(--color-primary-light)]"
                  >
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-[0.95rem] font-700 text-[#1A1A1A]">
                        {s.shortTitle}
                      </h3>
                      <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">
                        For {city.name} businesses
                      </p>
                    </div>
                    <ArrowRight size={16} className="shrink-0 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-primary)]" />
                  </Link>
                </AnimateIn>
              ))}
            </div>

            <AnimateIn delay={0.3}>
              <div className="mt-8">
                <Link
                  href="/services"
                  className="text-[14px] font-600 text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)]"
                >
                  View all 10 services &rarr;
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ─── NEARBY CITIES ─────────────────────────────────── */}
        <section className="bg-[var(--color-bg-alt)] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2rem)] font-800 tracking-tight text-[#1A1A1A]">
                Also Serving Nearby Cities
              </h2>
            </AnimateIn>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* Dallas hub link */}
              <AnimateIn delay={0.05}>
                <Link
                  href="/dallas"
                  className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-[13px] font-600 text-white transition-all hover:bg-[var(--color-primary-hover)]"
                >
                  <MapPin size={13} />
                  Dallas (Hub)
                </Link>
              </AnimateIn>

              {nearbyCities.map((nc, i) => (
                <AnimateIn key={nc.slug} delay={0.05 + 0.04 * i}>
                  <Link
                    href={nc.slug === "dallas" ? "/dallas" : `/${nc.slug}`}
                    className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-500 text-[var(--color-text-secondary)] shadow-sm transition-all hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
                  >
                    <MapPin size={13} />
                    {nc.name}
                  </Link>
                </AnimateIn>
              ))}

              <AnimateIn delay={0.3}>
                <Link
                  href="/dallas"
                  className="flex items-center gap-2 rounded-full border border-dashed border-[var(--color-border)] px-5 py-2.5 text-[13px] font-500 text-[var(--color-text-muted)] transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  View all 20 DFW cities &rarr;
                </Link>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ─── FAQ ───────────────────────────────────────────── */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2rem)] font-800 tracking-tight text-[#1A1A1A]">
                {city.name} Digital Marketing FAQ
              </h2>
            </AnimateIn>

            <div className="mt-8 space-y-5">
              {faqs.map((faq, i) => (
                <AnimateIn key={i} delay={0.05 * i}>
                  <div className="rounded-2xl bg-[var(--color-bg-alt)] p-6">
                    <h3 className="font-[family-name:var(--font-heading)] text-[1rem] font-700 text-[#1A1A1A]">
                      {faq.question}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.75] text-[var(--color-text-secondary)]">
                      {faq.answer}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── EXPLORE OUR SERVICES ─────────────────────────── */}
        <section className="bg-[var(--color-bg-alt)] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2rem)] font-800 tracking-tight text-[#1A1A1A]">
                Explore Our Services
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] text-[var(--color-text-secondary)]">
                Learn more about how NIXAR Solutions can help your {city.name} business grow.
              </p>
            </AnimateIn>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <AnimateIn delay={0.1}>
                <Link
                  href="/services"
                  className="glass-card group flex items-center justify-between rounded-xl bg-white p-5 shadow-sm transition-all hover:bg-[var(--color-primary-light)]"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-[0.95rem] font-700 text-[#1A1A1A]">
                      All Services
                    </h3>
                    <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">
                      SEO, AI agents, website dev &amp; more
                    </p>
                  </div>
                  <ArrowRight size={16} className="shrink-0 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-primary)]" />
                </Link>
              </AnimateIn>

              <AnimateIn delay={0.15}>
                <Link
                  href="/free-audit"
                  className="glass-card group flex items-center justify-between rounded-xl bg-white p-5 shadow-sm transition-all hover:bg-[var(--color-primary-light)]"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-[0.95rem] font-700 text-[#1A1A1A]">
                      Free Audit
                    </h3>
                    <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">
                      Get a free {city.name} market analysis
                    </p>
                  </div>
                  <ArrowRight size={16} className="shrink-0 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-primary)]" />
                </Link>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <Link
                  href="/blog"
                  className="glass-card group flex items-center justify-between rounded-xl bg-white p-5 shadow-sm transition-all hover:bg-[var(--color-primary-light)]"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-[0.95rem] font-700 text-[#1A1A1A]">
                      Blog
                    </h3>
                    <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">
                      Digital marketing insights &amp; tips
                    </p>
                  </div>
                  <ArrowRight size={16} className="shrink-0 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-primary)]" />
                </Link>
              </AnimateIn>
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToScript(localBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToScript(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToScript(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Dallas", url: "/dallas" },
              { name: city.name, url: `/${city.slug}` },
            ])
          ),
        }}
      />
    </>
  );
}
