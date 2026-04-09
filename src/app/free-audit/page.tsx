import type { Metadata } from "next";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBanner from "@/components/sections/CtaBanner";
import { testimonials } from "@/lib/data/testimonials";
import { faqSchema, schemaToScript } from "@/lib/seo/schemas";
import {
  Globe,
  Search,
  Share2,
  BarChart3,
  Brain,
  FileText,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Digital Audit | NIXAR Solutions",
  description:
    "Get a free, no-obligation digital audit from NIXAR Solutions. We analyze your website performance, SEO health, social media presence, competitor positioning, and AI visibility — then deliver a custom action plan.",
};

const auditCards = [
  {
    icon: Globe,
    title: "Website Performance Analysis",
    description:
      "Full technical audit of your site speed, mobile responsiveness, and user experience.",
  },
  {
    icon: Search,
    title: "SEO Health Check",
    description:
      "Keyword rankings, backlink profile, technical SEO issues, and content gaps identified.",
  },
  {
    icon: Share2,
    title: "Social Media Presence Review",
    description:
      "Analysis of your social profiles, engagement rates, content quality, and growth opportunities.",
  },
  {
    icon: BarChart3,
    title: "Competitor Comparison",
    description:
      "See exactly how you stack up against your top 3 local competitors online.",
  },
  {
    icon: Brain,
    title: "AI Visibility Assessment (GEO)",
    description:
      "Check if your business appears when people ask ChatGPT, Perplexity, or Google AI about your industry.",
  },
  {
    icon: FileText,
    title: "Custom Recommendations",
    description:
      "Prioritized action plan with specific steps to improve your digital presence.",
  },
];

const faqs = [
  {
    question: "How long does the audit take?",
    answer:
      "We deliver your complete audit within 48-72 hours of receiving your information. It's a thorough analysis, not an automated report.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes. No credit card, no hidden fees, no obligation. We believe in earning your trust before earning your business.",
  },
  {
    question: "What happens after the audit?",
    answer:
      "We schedule a 30-minute call to walk you through the findings and recommendations. You decide if and how you'd like to move forward.",
  },
];

export default function FreeAuditPage() {
  return (
    <>
      <main className="bg-[#0a0a0a]">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="pb-16 pt-32 lg:pb-24 lg:pt-40">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <AnimateIn>
              <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,7vw,5rem)] font-700 uppercase leading-[1.05] tracking-tight">
                <span className="text-white">YOUR FREE</span>
                <br />
                <span className="text-[var(--color-primary)]">
                  DIGITAL AUDIT.
                </span>
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-white/60">
                Discover exactly where your online presence stands and
                what&apos;s holding your business back.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* ── What You'll Get ──────────────────────────────────── */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="mb-12 text-center font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-700 uppercase tracking-tight text-white">
                WHAT YOU&apos;LL GET
              </h2>
            </AnimateIn>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {auditCards.map((card, i) => (
                <AnimateIn key={card.title} delay={i * 0.08}>
                  <div className="glass-card flex h-full flex-col gap-4 p-6">
                    <card.icon
                      size={28}
                      className="text-[var(--color-primary)]"
                    />
                    <h3 className="font-[family-name:var(--font-oswald)] text-lg font-700 text-white">
                      {card.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#999]">
                      {card.description}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact Form ─────────────────────────────────────── */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-2xl px-5 lg:px-8">
            <AnimateIn>
              <div className="glass-card p-8 lg:p-10">
                <h2 className="mb-8 text-center font-[family-name:var(--font-oswald)] text-[clamp(1.25rem,3vw,1.75rem)] font-700 uppercase tracking-tight text-white">
                  GET YOUR FREE AUDIT
                </h2>

                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[var(--color-primary)]/40 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[var(--color-primary)]/40 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[var(--color-primary)]/40 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Business Name"
                    className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[var(--color-primary)]/40 transition-colors"
                  />
                  <input
                    type="url"
                    placeholder="Website URL"
                    className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[var(--color-primary)]/40 transition-colors"
                  />
                  <textarea
                    rows={4}
                    placeholder="Tell us about your business goals"
                    className="resize-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[var(--color-primary)]/40 transition-colors"
                  />
                  <button
                    type="button"
                    className="mt-2 h-12 rounded-full bg-[var(--color-primary)] px-8 font-600 text-white transition-colors hover:bg-[var(--color-primary-hover)]"
                  >
                    Get My Free Audit
                  </button>
                </form>

                {/* Trust signals */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                  {["No cost.", "No obligation.", "Just clarity."].map(
                    (text) => (
                      <span
                        key={text}
                        className="flex items-center gap-2 text-sm text-white/50"
                      >
                        <CheckCircle2 size={16} />
                        {text}
                      </span>
                    )
                  )}
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────── */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="mb-12 text-center font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-700 uppercase tracking-tight text-white">
                WHAT OUR CLIENTS SAY
              </h2>
            </AnimateIn>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.slice(0, 3).map((t, i) => (
                <AnimateIn key={t.author} delay={i * 0.1}>
                  <div className="glass-card flex h-full flex-col justify-between p-6">
                    <p className="text-[15px] italic leading-relaxed text-white/70">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6">
                      <div className="mb-2 flex gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <span
                            key={idx}
                            className="text-[var(--color-primary)]"
                          >
                            &#9733;
                          </span>
                        ))}
                      </div>
                      <p className="font-600 text-white">{t.author}</p>
                      <p className="text-sm text-white/50">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="mb-12 text-center font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-700 uppercase tracking-tight text-white">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </AnimateIn>

            <div className="flex flex-col gap-6">
              {faqs.map((faq, i) => (
                <AnimateIn key={faq.question} delay={i * 0.1}>
                  <div className="glass-card p-6">
                    <h3 className="font-[family-name:var(--font-oswald)] text-lg font-700 text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#999]">
                      {faq.answer}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────── */}
        <CtaBanner />
      </main>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToScript(faqSchema(faqs)),
        }}
      />
    </>
  );
}
