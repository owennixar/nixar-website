import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Blog | Insights & Resources | NIXAR Solutions",
  description:
    "Digital marketing insights, strategies, and resources from NIXAR Solutions. Learn about SEO, AI marketing, web development, social media, and growth strategies for DFW businesses.",
};

const POSTS = [
  {
    slug: "ultimate-guide-social-media-advertising-small-businesses",
    title: "The Ultimate Guide to Social Media Advertising for Small Businesses",
    excerpt:
      "Learn how to create effective social media ad campaigns that drive real results without breaking the bank. Covers platform selection, audience targeting, creative strategy, and budget optimization.",
    date: "Dec 8, 2025",
    category: "Social Media",
    readTime: "12 min read",
  },
  {
    slug: "custom-illustrations-transform-brand-identity",
    title: "Why Custom Illustrations Can Transform Your Brand Identity",
    excerpt:
      "Stock photos blend in. Custom illustrations stand out. Discover how bespoke visual assets can differentiate your brand, improve recall, and create a cohesive identity across every touchpoint.",
    date: "Dec 8, 2025",
    category: "Branding",
    readTime: "8 min read",
  },
  {
    slug: "digital-marketing-strategies-convert-2026",
    title: "Digital Marketing Strategies That Actually Convert in 2026",
    excerpt:
      "The playbooks that worked in 2024 are losing effectiveness. Here are the strategies — from AI-powered SEO to GEO and conversational marketing — that are driving real conversions heading into 2026.",
    date: "Dec 2, 2025",
    category: "Strategy",
    readTime: "15 min read",
  },
] as const;

export default function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white pb-8 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn>
            <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
              Blog
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] font-900 leading-[1.05] tracking-tight text-[#1A1A1A]">
              Insights &amp; Resources
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-[var(--color-text-secondary)]">
              Actionable digital marketing insights from the NIXAR team. No fluff — just
              strategies, data, and frameworks you can apply to your business today.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-white pb-24 pt-8 lg:pb-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {POSTS.map((post, i) => (
              <AnimateIn key={post.slug} delay={0.1 * i}>
                <article className="group flex h-full flex-col rounded-2xl border border-transparent bg-[var(--color-bg-alt)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-md">
                  {/* Category + date */}
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="rounded-full bg-[var(--color-primary-light)] px-2.5 py-0.5 font-500 text-[var(--color-primary)]">
                      {post.category}
                    </span>
                    <span className="text-[var(--color-text-muted)]">{post.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[1.1rem] font-700 leading-snug text-[#1A1A1A] transition-colors group-hover:text-[var(--color-primary)]">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-3 text-[14px] leading-[1.7] text-[var(--color-text-secondary)]">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]">
                      <Clock size={13} />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-[13px] font-600 text-[var(--color-primary)]">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              </AnimateIn>
            ))}
          </div>

          {/* Coming soon note */}
          <AnimateIn delay={0.4}>
            <div className="mt-14 rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center">
              <p className="font-[family-name:var(--font-heading)] text-[1rem] font-700 text-[#1A1A1A]">
                More content coming soon
              </p>
              <p className="mt-2 text-[14px] text-[var(--color-text-muted)]">
                We&apos;re building a library of in-depth guides on SEO, AI marketing,
                web development, and growth strategy. Subscribe to get notified.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
