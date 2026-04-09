import type { Metadata } from "next";
import { portfolio } from "@/lib/data/portfolio";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBanner from "@/components/sections/CtaBanner";
import PortfolioGrid from "./PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio | Our Work | NIXAR Solutions",
  description:
    "See the results NIXAR Solutions has delivered for Dallas-Fort Worth businesses. Web development, digital marketing, and brand transformation case studies.",
};

export default function PortfolioPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white pb-8 pt-12 lg:pt-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn>
            <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
              Portfolio
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] font-900 leading-[1.05] tracking-tight text-[#1A1A1A]">
              Our Work
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-[var(--color-text-secondary)]">
              Real projects, real results. Every engagement is tailored to the client&apos;s
              unique goals — from complete digital transformations to targeted growth campaigns.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Filter + Grid */}
      <PortfolioGrid projects={portfolio} />

      <CtaBanner />
    </main>
  );
}
