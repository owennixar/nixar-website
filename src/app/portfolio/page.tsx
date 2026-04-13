import type { Metadata } from "next";
import { portfolio } from "@/lib/data/portfolio";
import AnimateIn from "@/components/ui/AnimateIn";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import CtaBanner from "@/components/sections/CtaBanner";
import PortfolioGrid from "./PortfolioGrid";

export const metadata: Metadata = {
  title: "Our Work | Digital Marketing Case Studies Dallas | NIXAR Solutions",
  description:
    "See real results from NIXAR Solutions. Case studies and portfolio of digital marketing, SEO, web design, and social media projects for Dallas-Fort Worth businesses.",
};

export default function PortfolioPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pb-8 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn>
            <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
              Portfolio
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] font-900 leading-[1.05] tracking-tight text-white">
              Our Work
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-white/60">
              Real projects, real results. Every engagement is tailored to the client&apos;s
              unique goals — from complete digital transformations to targeted growth campaigns.
            </p>
          </AnimateIn>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Portfolio", href: "/portfolio" }]} dark={false} />

      {/* Filter + Grid */}
      <PortfolioGrid projects={portfolio} />

      <CtaBanner />
      <JsonLd data={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Portfolio", url: "/portfolio" }])]} />
    </main>
  );
}
