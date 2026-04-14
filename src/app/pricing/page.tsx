import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Digital Marketing Pricing Dallas | Transparent Agency Pricing | NIXAR Solutions",
  description:
    "Transparent digital marketing pricing from NIXAR Solutions in Dallas. SEO, social media, web design, and AI marketing packages starting at $1,500/month.",
};

const TIERS = [
  {
    name: "Launch",
    price: "$1,500",
    desc: "Small businesses getting started",
    features: [
      "Social media management (2 platforms)",
      "Basic SEO optimization",
      "Monthly performance reporting",
      "Google Business Profile management",
      "Email support",
    ],
    cta: "Start Here",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$3,500",
    desc: "Businesses ready to scale",
    features: [
      "Full social media (4 platforms)",
      "SEO + GEO optimization",
      "Content marketing (blog + social)",
      "Paid ad management",
      "Automation setup",
      "Bi-weekly strategy calls",
      "Competitor monitoring",
    ],
    cta: "Let's Grow",
    highlight: true,
  },
  {
    name: "Transformation",
    price: "$7,500",
    desc: "Full digital transformation",
    features: [
      "Everything in Growth",
      "Custom website development",
      "AI agent development",
      "Complete brand identity",
      "Dedicated strategist",
      "24/7 support",
      "Weekly reporting & calls",
    ],
    cta: "Transform Now",
    highlight: false,
  },
];

const FAQS = [
  { question: "Can I customize a plan?", answer: "Yes, every plan is tailored to your needs. The tiers above are starting points. we build a custom proposal after understanding your business goals." },
  { question: "Is there a contract?", answer: "Month-to-month available. We earn your business every month with results, not contracts." },
  { question: "What's the onboarding process?", answer: "A 2-week discovery and strategy phase before any execution begins. We audit your current presence, define goals, and build your custom roadmap." },
  { question: "Do you offer one-time projects?", answer: "Yes, website builds and branding packages are available as one-time engagements. Contact us for project-based pricing." },
  { question: "What if I'm not seeing results?", answer: "We provide transparent monthly reporting with clear KPIs. If something isn't working, we adjust strategy quickly. that's the advantage of month-to-month." },
];

export default function PricingPage() {
  return (
    <>
      <main className="bg-[#0A0A0A]">
        <section className="relative w-full overflow-hidden" style={{ height: '45vh' }}>
          <img src="/images/pricing-hero.webp" alt="Transparent digital marketing pricing. NIXAR Solutions Dallas" loading="eager" decoding="sync" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.9) 100%)' }} />
          <div className="relative h-full flex items-end pb-12" style={{ zIndex: 2 }}>
            <div className="mx-auto max-w-7xl px-6 w-full">
              <AnimateIn>
                <h1 className="font-[family-name:var(--font-oswald)] font-bold uppercase leading-[1.05]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                  <span className="text-white">Transparent </span>
                  <span style={{ color: '#E71840' }}>Pricing.</span>
                </h1>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-white/80" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                  Every business is different. Here&apos;s a starting point for what to expect.
                </p>
              </AnimateIn>
            </div>
          </div>
        </section>

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing", href: "/pricing" }]} />

        {/* Tiers */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {TIERS.map((tier, i) => (
                <AnimateIn key={tier.name} delay={i * 0.1} className={tier.highlight ? "order-first md:order-none" : ""}>
                  <div
                    className={`relative flex h-full flex-col rounded-2xl p-8 ${
                      tier.highlight ? "border-2 border-[#E71840]" : "border border-white/10"
                    }`}
                    style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}
                  >
                    {tier.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#E71840] px-4 py-1 text-[11px] font-700 uppercase tracking-wider text-white">
                        Most Popular
                      </span>
                    )}
                    <h2 className="font-[family-name:var(--font-oswald)] text-[1.3rem] font-700 uppercase text-white">
                      {tier.name}
                    </h2>
                    <p className="mt-1 text-[13px] text-white/40">{tier.desc}</p>
                    <p className="mt-6">
                      <span className="font-[family-name:var(--font-oswald)] text-[2.5rem] font-700 text-white">{tier.price}</span>
                      <span className="text-white/40 text-sm">/mo</span>
                    </p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-[14px] text-white/60">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#E71840]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`mt-8 inline-flex h-12 w-full items-center justify-center rounded-full text-[14px] font-600 transition-all ${
                        tier.highlight
                          ? "bg-[#E71840] text-white hover:bg-[#C41535]"
                          : "border border-white/20 text-white hover:bg-white/10"
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Custom */}
        <section className="py-12 text-center">
          <p className="text-white/50">Not sure which plan is right?</p>
          <Link href="/free-audit" className="mt-3 inline-flex items-center text-[#E71840] font-600 hover:text-white transition-colors">
            Get a free consultation &rarr;
          </Link>
        </section>

        {/* FAQ */}
        <section className="bg-[#111] py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 uppercase text-white">
                Frequently Asked Questions
              </h2>
            </AnimateIn>
            <div className="mt-10 space-y-6">
              {FAQS.map((faq, i) => (
                <AnimateIn key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 text-white">{faq.question}</h3>
                    <p className="mt-3 text-[14px] leading-[1.75] text-white/60">{faq.answer}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <JsonLd data={[
        faqSchema(FAQS),
        breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Pricing", url: "/pricing" }]),
      ]} />
    </>
  );
}
