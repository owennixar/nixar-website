import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnimateIn from "@/components/ui/AnimateIn";
import { faqSchema, breadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "SEO vs GEO vs AI SEO | Understanding Modern Search | NIXAR Solutions",
  description:
    "Compare Traditional SEO, Generative Engine Optimization (GEO), and AI SEO. Learn which search strategy your business needs in 2026.",
};

const COMPARISON_ROWS = [
  { feature: "Goal", seo: "Rank in search results", geo: "Get cited by AI", ai: "Optimize for both" },
  { feature: "Target", seo: "Google, Bing", geo: "ChatGPT, Perplexity, Gemini", ai: "All platforms" },
  { feature: "Content Focus", seo: "Keywords & backlinks", geo: "Structured, citable content", ai: "Dual-optimized content" },
  { feature: "Key Metrics", seo: "Rankings, organic traffic", geo: "AI citations, mentions", ai: "Combined visibility" },
  { feature: "Schema", seo: "Basic meta tags", geo: "Advanced JSON-LD", ai: "Full schema stack" },
  { feature: "Timeline", seo: "3-6 months", geo: "1-3 months initial visibility", ai: "Ongoing" },
  { feature: "Who Needs It", seo: "Everyone", geo: "Forward-thinking businesses", ai: "Full coverage seekers" },
];

const FAQS = [
  { question: "What's the difference between SEO and GEO?", answer: "SEO optimizes your website to rank in traditional search engine results like Google. GEO (Generative Engine Optimization) optimizes your content to be cited in AI-generated answers from platforms like ChatGPT, Perplexity, and Google AI Overviews. SEO focuses on keywords and backlinks; GEO focuses on structured, authoritative, citable content." },
  { question: "Is GEO replacing SEO?", answer: "No. GEO complements SEO. it does not replace it. Traditional search still dominates with billions of daily queries. However, AI search is growing 300%+ year-over-year. Businesses that optimize for both have a significant competitive advantage." },
  { question: "How long does GEO take to show results?", answer: "Initial AI citations can appear within 1-3 months as AI models re-index your optimized content. Unlike SEO which compounds slowly, GEO results can appear relatively quickly once your content is structured correctly for AI consumption." },
  { question: "Do I need AI SEO if I already do regular SEO?", answer: "Yes, if you want to be visible in both traditional and AI search results. AI SEO bridges both disciplines, ensuring your content ranks in Google AND gets cited by ChatGPT, Perplexity, and other AI platforms. Without AI SEO, you're invisible to a growing share of searchers." },
  { question: "How does NIXAR approach search optimization?", answer: "NIXAR implements all three disciplines as an integrated strategy. We optimize your technical SEO foundation, structure content for AI citability (GEO), and deploy AI-powered tools to automate and scale optimization across all search platforms simultaneously." },
];

export default function ComparisonPage() {
  return (
    <>
      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="pb-8 pt-32 lg:pt-40">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,5vw,4rem)] font-700 uppercase leading-[1.05] tracking-tight">
                <span className="text-white">SEO vs. GEO vs. </span>
                <span className="text-[#E71840]">AI SEO</span>
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-white/85">
                Understanding the three pillars of modern search visibility.
              </p>
            </AnimateIn>
          </div>
        </section>

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources/glossary" }, { label: "SEO vs GEO vs AI SEO", href: "/resources/seo-vs-geo-vs-ai-seo" }]} />

        {/* Comparison Table */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-[16px] font-600 text-white/75">Feature</th>
                      <th className="px-6 py-4 text-left text-[16px] font-700 uppercase tracking-wider text-white">Traditional SEO</th>
                      <th className="px-6 py-4 text-left text-[16px] font-700 uppercase tracking-wider text-[#E71840]">GEO</th>
                      <th className="px-6 py-4 text-left text-[16px] font-700 uppercase tracking-wider text-white">AI SEO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                        <td className="px-6 py-4 text-[16px] font-600 text-white/70">{row.feature}</td>
                        <td className="px-6 py-4 text-[16px] text-white/85">{row.seo}</td>
                        <td className="px-6 py-4 text-[16px] text-white/85">{row.geo}</td>
                        <td className="px-6 py-4 text-[16px] text-white/85">{row.ai}</td>
                      </tr>
                    ))}
                    <tr className="border-t border-white/10">
                      <td className="px-6 py-4 text-[16px] font-600 text-white/70">NIXAR Service</td>
                      <td className="px-6 py-4"><Link href="/services/search-everywhere-optimization" className="text-[16px] text-[#E71840] hover:text-white transition-colors">SEO &rarr;</Link></td>
                      <td className="px-6 py-4"><Link href="/services/ai-seo-geo" className="text-[16px] text-[#E71840] hover:text-white transition-colors">AI SEO & GEO &rarr;</Link></td>
                      <td className="px-6 py-4 text-[16px] text-white/85">Full-spectrum optimization</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Which One Do You Need */}
        <section className="bg-[#111] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 uppercase text-white">
                Which One Do You Need?
              </h2>
            </AnimateIn>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { title: "You need SEO if...", color: "white", items: ["You want to rank on Google and Bing", "You need more organic website traffic", "Your competitors outrank you in search", "You rely on local search for customers"] },
                { title: "You need GEO if...", color: "#E71840", items: ["You want AI platforms to cite your brand", "You're in a competitive knowledge space", "Your audience uses ChatGPT or Perplexity", "You want to be the source AI trusts"] },
                { title: "You need AI SEO if...", color: "white", items: ["You want visibility everywhere", "You need a unified search strategy", "You want to future-proof your presence", "You're serious about dominating search"] },
              ].map((card, i) => (
                <AnimateIn key={card.title} delay={i * 0.1}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 h-full">
                    <h3 className="font-[family-name:var(--font-oswald)] text-[1.1rem] font-700 uppercase" style={{ color: card.color }}>
                      {card.title}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[16px] text-white/85">
                          <span className="mt-1 text-[#E71840]">&#9656;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Why All Three */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 uppercase text-white">
                Why NIXAR Recommends <span className="text-[#E71840]">All Three</span>
              </h2>
              <p className="mt-6 text-[16px] leading-[1.8] text-white/85">
                Search is no longer one platform. Your customers search on Google, ask ChatGPT, browse TikTok, and query Perplexity. A business that only optimizes for traditional SEO is invisible on half the platforms their customers use. NIXAR&apos;s integrated approach ensures you&apos;re visible everywhere. in blue links, AI answers, social search, and voice results. One strategy, full coverage, measurable results.
              </p>
            </AnimateIn>
          </div>
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
                    <h3 className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-3 text-[16px] leading-[1.75] text-white/85">{faq.answer}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-[family-name:var(--font-oswald)] text-[1.2rem] font-700 uppercase text-white/75 mb-6">Related Resources</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "SEO Services", href: "/services/search-everywhere-optimization" },
                { label: "AI SEO & GEO", href: "/services/ai-seo-geo" },
                { label: "SEO vs AI SEO (Blog)", href: "/blog/seo-vs-ai-seo-understanding-the-difference" },
                { label: "What Is GEO? (Blog)", href: "/blog/geo-generative-engine-optimization-2026" },
                { label: "Marketing Glossary", href: "/resources/glossary" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[16px] font-500 text-white/85 transition-all hover:border-[#E71840]/40 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="mx-auto max-w-2xl px-5">
            <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,4vw,3rem)] font-700 uppercase text-white">
              Get Your Free <span className="text-[#E71840]">Search Visibility Audit</span>
            </h2>
            <Link href="/free-audit" className="mt-8 inline-flex h-12 items-center rounded-full bg-[#E71840] px-8 text-[16px] font-600 text-white transition-all hover:bg-[#C41535]">
              Start Your Audit
            </Link>
          </div>
        </section>
      </main>

      <JsonLd
        data={[
          faqSchema(FAQS),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Resources", url: "/resources/glossary" }, { name: "SEO vs GEO vs AI SEO", url: "/resources/seo-vs-geo-vs-ai-seo" }]),
        ]}
      />
    </>
  );
}
