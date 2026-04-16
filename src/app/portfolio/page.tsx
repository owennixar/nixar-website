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
      {/* Hero Image */}
      <section className="relative w-full overflow-hidden" style={{ height: '45vh' }}>
        <img src="/images/portfolio-hero.webp" alt="NIXAR Solutions portfolio of digital marketing projects Dallas" loading="eager" decoding="sync" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.9) 100%)' }} />
        <div className="relative h-full flex items-end pb-12" style={{ zIndex: 2 }}>
          <div className="max-w-7xl mx-auto px-6 w-full">
            <AnimateIn>
              <p className="text-base uppercase tracking-widest mb-2" style={{ color: '#E71840', textShadow: '0 0 20px rgba(231,24,64,0.5)' }}>Portfolio</p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="font-[family-name:var(--font-oswald)] font-bold text-white uppercase" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>Our Work</h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-white/80" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                Real projects, real results. Every engagement is tailored to the client&apos;s unique goals. from complete digital transformations to targeted growth campaigns.
              </p>
            </AnimateIn>
          </div>
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
