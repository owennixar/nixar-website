import type { Metadata } from "next";
import Link from "next/link";
import {
  Megaphone,
  Code,
  Zap,
  Users,
  Search,
  PenTool,
  Brain,
  Bot,
  Palette,
  BarChart3,
  MapPin,
} from "lucide-react";
import { services } from "@/lib/data/services";
import { cities, getCityBySlug } from "@/lib/data/cities";
import { testimonials } from "@/lib/data/testimonials";
// FAQ data is defined inline for the Dallas hub page
import {
  localBusinessSchema,
  faqSchema,
  breadcrumbSchema,
  schemaToScript,
} from "@/lib/seo/schemas";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBanner from "@/components/sections/CtaBanner";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  megaphone: Megaphone, code: Code, zap: Zap, users: Users, search: Search,
  "pen-tool": PenTool, brain: Brain, bot: Bot, palette: Palette, "bar-chart": BarChart3,
};

export const metadata: Metadata = {
  title: "Digital Marketing Agency Dallas TX | AI-Powered SEO & Web Design | NIXAR Solutions",
  description:
    "NIXAR Solutions is Dallas's premier digital marketing agency. AI-powered SEO, web development, social media, and full-funnel digital transformation for Dallas businesses.",
};

export default function DallasPage() {
  const dallas = getCityBySlug("dallas")!;
  const faqs = [
    {
      question: "What digital marketing services does NIXAR offer in Dallas?",
      answer: "NIXAR Solutions provides comprehensive digital marketing in Dallas including AI-Powered SEO, Generative Engine Optimization (GEO), Custom AI Agents, Web Development, Brand Identity, Social Media Management, Content Marketing, Paid Advertising, Automation & AI Integration, and Personalized Sales Support. Every strategy is customized to Dallas\u2019s competitive market dynamics.",
    },
    {
      question: "How much does a marketing agency cost in Dallas?",
      answer: "Marketing agency costs in Dallas vary widely based on services and scope. NIXAR Solutions provides customized proposals after a free consultation. We believe in transparent pricing with clear deliverables and measurable outcomes. Contact us at 469-759-3638 for a free Dallas market analysis.",
    },
    {
      question: "Why should I hire a Dallas-based agency instead of a national one?",
      answer: "A local Dallas agency understands the DFW market dynamics, competition landscape, and consumer behavior in ways a national agency cannot. NIXAR is based in Frisco and serves Dallas businesses daily \u2014 we know the neighborhoods, the competition, and what works in this specific market.",
    },
    {
      question: "Does NIXAR specialize in any industries in Dallas?",
      answer: "We work across all major Dallas industries including financial services, technology, healthcare, real estate, hospitality, restaurants, construction, and professional services. Our AI-powered approach adapts to each industry\u2019s unique challenges and opportunities.",
    },
    {
      question: "How is NIXAR different from other Dallas marketing agencies?",
      answer: "Three key differentiators: We\u2019re AI-first, using artificial intelligence across every service. We prioritize cross-functional alignment before external marketing. And we\u2019re radically transparent \u2014 every strategy has clear KPIs and honest reporting. We don\u2019t hide behind vanity metrics.",
    },
    {
      question: "What is GEO and why do Dallas businesses need it?",
      answer: "GEO (Generative Engine Optimization) ensures your business appears when people ask AI assistants like ChatGPT, Perplexity, or Google AI Overviews about your industry. With AI search growing 300%+ year-over-year, Dallas businesses that optimize for AI search now will have a major competitive advantage.",
    },
    {
      question: "How long does SEO take to work for a Dallas business?",
      answer: "SEO is a long-term strategy. Most Dallas businesses see initial improvements in 2-3 months and significant results in 4-6 months. The Dallas market is competitive, which means SEO takes consistency and quality \u2014 but the compounding returns are worth the investment.",
    },
    {
      question: "Does NIXAR offer free consultations for Dallas businesses?",
      answer: "Yes. We offer a completely free digital audit and consultation for Dallas businesses. We\u2019ll analyze your current online presence, identify opportunities, and provide actionable recommendations \u2014 no cost, no obligation. Call 469-759-3638 or visit our free audit page.",
    },
  ];

  return (
    <>
      <main>
        {/* ─── HERO ──────────────────────────────────────────── */}
        <section id="dallas-hero" className="relative overflow-hidden bg-white pb-16 pt-32 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="hero-orb" style={{ width: 500, height: 500, background: "rgba(231,24,64,0.05)", top: "-8%", right: "0%", animation: "orbFloat1 18s ease-in-out infinite" }} />
            <div className="hero-orb" style={{ width: 350, height: 350, background: "rgba(231,24,64,0.03)", bottom: "5%", left: "5%", animation: "orbFloat2 22s ease-in-out infinite" }} />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn delay={0.1} direction="none">
              <div className="flex items-center gap-2 text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                <MapPin size={14} />
                Dallas, Texas
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5.5vw,4.5rem)] font-900 leading-[1.05] tracking-tight text-[#1A1A1A]">
                Dallas&apos;s AI-Powered Digital{" "}
                <span className="text-[var(--color-primary)]">Marketing Agency</span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.35} direction="none">
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.7] text-[var(--color-text-secondary)]">
                Dallas is home to 23 Fortune 500 headquarters and one of the most competitive
                business markets in America. To stand out in this city, you need more than marketing
                — you need digital transformation. NIXAR Solutions combines AI-powered SEO,
                conversion-focused web development, and full-funnel digital strategy to help Dallas
                businesses dominate their market.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.5} direction="none">
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex h-[52px] items-center rounded-full bg-[var(--color-primary)] px-8 text-[15px] font-600 text-white shadow-lg shadow-[var(--color-primary-glow)] transition-all hover:bg-[var(--color-primary-hover)] hover:scale-[1.02]"
                >
                  Get Free Dallas Market Audit
                </a>
                <a
                  href="#services"
                  className="inline-flex h-[52px] items-center rounded-full border-2 border-[#1A1A1A] px-8 text-[15px] font-600 text-[#1A1A1A] transition-all hover:bg-[#1A1A1A] hover:text-white"
                >
                  Our Dallas Services
                </a>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ─── WHY DALLAS BUSINESSES CHOOSE NIXAR ────────────── */}
        <section className="bg-[var(--color-bg-alt)] py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <AnimateIn direction="left" distance={30}>
                <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                  The Dallas Market
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
                  Why Dallas Businesses Choose NIXAR
                </h2>
              </AnimateIn>

              <AnimateIn direction="left" distance={20} delay={0.1}>
                <p className="mt-6 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                  Dallas is not just big — it is brutally competitive. With a GDP exceeding $500
                  billion and industries spanning financial services, technology, healthcare,
                  telecommunications, energy, and real estate, the DFW metroplex attracts ambitious
                  businesses from across the country. Deep Ellum&apos;s creative startups compete
                  with Uptown&apos;s premium professional services. The Design District&apos;s
                  boutique agencies compete with Downtown&apos;s enterprise firms.
                </p>
              </AnimateIn>

              <AnimateIn direction="left" distance={20} delay={0.18}>
                <p className="mt-4 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                  In this environment, traditional marketing is not enough. Dallas businesses need
                  AI-powered strategies that can identify opportunities faster, optimize campaigns in
                  real time, and deliver measurable ROI on every dollar spent. NIXAR Solutions brings
                  a digital transformation approach — we do not just run ads or post on social media.
                  We rebuild your entire online presence from the ground up, engineered for growth.
                </p>
              </AnimateIn>

              <AnimateIn direction="left" distance={20} delay={0.25}>
                <p className="mt-4 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">
                  Based in Frisco and serving the entire metroplex, we understand Dallas at a
                  neighborhood level. We know which search terms drive foot traffic in Deep Ellum
                  versus Uptown. We understand how B2B buying behavior differs in the Telecom Corridor
                  compared to Downtown. This local knowledge, combined with national-caliber strategy
                  and AI-powered execution, is why Dallas businesses choose NIXAR.
                </p>
              </AnimateIn>
            </div>

            {/* Dallas stats sidebar */}
            <AnimateIn direction="right" distance={30} delay={0.15}>
              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-7 shadow-sm">
                  <p className="font-[family-name:var(--font-heading)] text-4xl font-900 text-[var(--color-primary)]">23</p>
                  <p className="mt-1 text-[14px] font-600 text-[#1A1A1A]">Fortune 500 Headquarters</p>
                  <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">More than any U.S. city except New York</p>
                </div>
                <div className="rounded-2xl bg-white p-7 shadow-sm">
                  <p className="font-[family-name:var(--font-heading)] text-4xl font-900 text-[var(--color-primary)]">$500B+</p>
                  <p className="mt-1 text-[14px] font-600 text-[#1A1A1A]">DFW Metroplex GDP</p>
                  <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">4th largest metro economy in the U.S.</p>
                </div>
                <div className="rounded-2xl bg-white p-7 shadow-sm">
                  <p className="font-[family-name:var(--font-heading)] text-4xl font-900 text-[var(--color-primary)]">1.34M</p>
                  <p className="mt-1 text-[14px] font-600 text-[#1A1A1A]">City Population</p>
                  <p className="mt-1 text-[13px] text-[var(--color-text-muted)]">7.6M in the DFW metroplex — massive addressable market</p>
                </div>
                <div className="rounded-2xl bg-white p-7 shadow-sm">
                  <p className="font-[family-name:var(--font-heading)] text-4xl font-900 text-[var(--color-primary)]">7</p>
                  <p className="mt-1 text-[14px] font-600 text-[#1A1A1A]">Key Industries</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {dallas.keyIndustries.map((ind) => (
                      <span key={ind} className="rounded-full bg-[var(--color-bg-alt)] px-2.5 py-0.5 text-[11px] font-500 text-[var(--color-text-muted)]">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ─── SERVICES FOR DALLAS ───────────────────────────── */}
        <section id="services" className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                Dallas Services
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
                Digital Marketing Services for Dallas Businesses
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] text-[var(--color-text-secondary)]">
                Every service tailored to the Dallas market — from local SEO targeting
                Dallas-specific keywords to paid campaigns reaching DFW decision-makers.
              </p>
            </AnimateIn>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => {
                const Icon = ICON_MAP[s.icon];
                return (
                  <AnimateIn key={s.slug} delay={0.04 * i}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex items-start gap-4 rounded-xl border border-transparent bg-[var(--color-bg-alt)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-md"
                    >
                      {Icon && (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-light)]">
                          <Icon size={18} className="text-[var(--color-primary)]" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-[family-name:var(--font-heading)] text-[0.95rem] font-700 text-[#1A1A1A]">
                          {s.shortTitle}
                          {s.isNew && (
                            <span className="ml-2 rounded-full bg-[var(--color-primary)] px-1.5 py-0.5 text-[9px] font-700 uppercase text-white">New</span>
                          )}
                        </h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                          {s.description}
                        </p>
                      </div>
                    </Link>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── DALLAS SEO & AI VISIBILITY ────────────────────── */}
        <section className="bg-[#0A0A0A] py-24 lg:py-32">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                Local SEO + AI Search
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-white">
                Dallas SEO &amp; AI Search Visibility
              </h2>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <p className="mt-6 text-[15px] leading-[1.8] text-white/60">
                Ranking on Google for &ldquo;marketing agency Dallas&rdquo; is just the beginning.
                The search landscape is fragmenting — your Dallas customers now search on Google,
                Google Maps, YouTube, TikTok, ChatGPT, Perplexity, and voice assistants. A modern
                Dallas SEO strategy must cover all of these platforms simultaneously.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <p className="mt-4 text-[15px] leading-[1.8] text-white/60">
                Our local SEO work for Dallas businesses includes comprehensive Google Business
                Profile optimization, local citation building, review management, and geo-targeted
                content strategy. But we go further with Generative Engine Optimization (GEO) —
                ensuring your business gets cited when someone asks ChatGPT or Perplexity
                &ldquo;who is the best marketing agency in Dallas?&rdquo;
              </p>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <p className="mt-4 text-[15px] leading-[1.8] text-white/60">
                46% of all Google searches have local intent. 88% of smartphone local searches lead
                to a call or visit within one week. For Dallas businesses, being invisible in local
                search is not just a missed opportunity — it is revenue left on the table every
                single day. NIXAR&apos;s Search Everywhere Optimization ensures you appear wherever
                Dallas customers are looking.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.25}>
              <a
                href="#contact"
                className="mt-8 inline-flex h-12 items-center rounded-full bg-[var(--color-primary)] px-8 text-[14px] font-600 text-white transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-[var(--color-primary-glow)]"
              >
                Get Your Free Dallas SEO Audit
              </a>
            </AnimateIn>
          </div>
        </section>

        {/* ─── SERVING THE ENTIRE DFW METROPLEX ──────────────── */}
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn className="text-center">
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                DFW Coverage
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
                Serving the Entire DFW Metroplex
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] text-[var(--color-text-secondary)]">
                Based in Frisco, serving 20+ cities across Dallas-Fort Worth.
              </p>
            </AnimateIn>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              {cities.map((city, i) => (
                <AnimateIn key={city.slug} delay={0.03 * i}>
                  <Link
                    href={city.slug === "dallas" ? "/dallas" : `/${city.slug}`}
                    className={`group flex items-center gap-2 rounded-xl p-3.5 text-[14px] font-500 transition-all hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] ${
                      city.slug === "dallas"
                        ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] hover:text-white"
                        : "bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)]"
                    }`}
                  >
                    <MapPin size={14} className={city.slug === "dallas" ? "text-white" : "text-[var(--color-text-muted)]"} />
                    {city.name}
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ──────────────────────────────────── */}
        <section className="bg-[var(--color-bg-alt)] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 tracking-tight text-[#1A1A1A]">
                What Dallas-Area Clients Say
              </h2>
            </AnimateIn>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <AnimateIn key={i} delay={0.1 * i}>
                  <div className="h-full rounded-2xl bg-white p-7 shadow-sm">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="var(--color-primary)">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-4 text-[14px] italic leading-[1.7] text-[#333]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-4 border-t border-[var(--color-border)] pt-3">
                      <p className="font-[family-name:var(--font-heading)] text-[14px] font-700 text-[#1A1A1A]">
                        {t.author}
                      </p>
                      <p className="text-[12px] text-[var(--color-text-muted)]">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DALLAS BY THE NUMBERS ─────────────────────────── */}
        <section className="bg-[#111] py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="text-center font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 uppercase tracking-tight text-white">
                Dallas by the Numbers
              </h2>
            </AnimateIn>

            <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { stat: "~1.3M", label: "City Population" },
                { stat: "~7.6M", label: "DFW Metro Population" },
                { stat: "#4", label: "US Tech Hub Ranking" },
                { stat: "2,000+", label: "Marketing Agencies in DFW" },
              ].map((item, i) => (
                <AnimateIn key={item.label} delay={0.1 * i}>
                  <div className="glass-card flex flex-col items-center justify-center rounded-2xl p-8 text-center">
                    <p className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-700 text-white">
                      {item.stat}
                    </p>
                    <p className="mt-2 text-[14px] text-[#666]">{item.label}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NEIGHBORHOODS WE SERVE ──────────────────────────── */}
        <section className="bg-[#0A0A0A] py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="text-center font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 uppercase tracking-tight text-white">
                Neighborhoods We Serve in Dallas
              </h2>
            </AnimateIn>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[
                "Uptown", "Deep Ellum", "Downtown", "Design District",
                "Bishop Arts", "Oak Lawn", "Highland Park", "Lakewood",
                "Lower Greenville", "Knox-Henderson", "Victory Park", "Trinity Groves",
              ].map((neighborhood, i) => (
                <AnimateIn key={neighborhood} delay={0.04 * i}>
                  <a
                    href="#dallas-hero"
                    className="glass-card flex items-center gap-2 rounded-xl px-4 py-3 transition-all hover:border-[#E71840]/40"
                  >
                    <MapPin size={14} className="shrink-0 text-[#E71840]" />
                    <span className="text-[14px] text-white">{neighborhood}</span>
                  </a>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ───────────────────────────────────────────── */}
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 tracking-tight text-[#1A1A1A]">
                Dallas Digital Marketing FAQ
              </h2>
            </AnimateIn>

            <div className="mt-10 space-y-5">
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
            ])
          ),
        }}
      />
    </>
  );
}
