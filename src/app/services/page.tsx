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
  UtensilsCrossed,
  HardHat,
  Heart,
  Building,
  ShoppingCart,
  Briefcase,
  Car,
  Cpu,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { services } from "@/lib/data/services";
import AnimateIn from "@/components/ui/AnimateIn";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import CtaBanner from "@/components/sections/CtaBanner";


const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  megaphone: Megaphone,
  code: Code,
  zap: Zap,
  users: Users,
  search: Search,
  "pen-tool": PenTool,
  brain: Brain,
  bot: Bot,
  palette: Palette,
  "bar-chart": BarChart3,
};

// AI SEO/GEO and AI Tailored Agents get large cards
const LARGE_SLUGS = new Set(["ai-seo-geo", "ai-tailored-agents"]);

export const metadata: Metadata = {
  title: "Digital Marketing Services Dallas TX | SEO, Web Design, AI",
  description:
    "Explore NIXAR Solutions' full suite of digital marketing services. SEO, web development, AI agents, social media, paid ads, and more for Dallas-Fort Worth businesses.",
};

export default function ServicesIndex() {
  return (
    <>
      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="relative w-full overflow-hidden" style={{ height: '75vh' }}>
          <img
            src="/images/services-hero.webp"
            alt="Fleet of rockets launching with digital marketing icons"
            loading="eager"
            decoding="sync"
            className="absolute top-0 left-0 w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center center', zIndex: 0 }}
          />
          <div
            className="absolute inset-0"
            style={{ zIndex: 1, background: 'linear-gradient(to right, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.3) 60%, rgba(10,10,10,0.1) 100%)' }}
          />
          <div className="relative h-full flex items-center" style={{ zIndex: 2 }}>
            <div className="max-w-7xl mx-auto px-6 w-full">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                What We Do
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="mt-4 font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,5vw,4rem)] font-bold uppercase leading-[1.05] tracking-tight text-white">
                Our Services
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-white/60">
                End-to-end digital solutions — from branding and website development to AI automation and
                paid advertising. One team. Full accountability. Measurable results.
              </p>
            </AnimateIn>
            </div>
          </div>
        </section>

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]} />

        {/* Bento grid */}
        <section className="bg-[#0A0A0A] pb-24 pt-8 lg:pb-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => {
                const Icon = ICON_MAP[service.icon];
                const isLarge = LARGE_SLUGS.has(service.slug);

                return (
                  <AnimateIn
                    key={service.slug}
                    delay={0.05 * i}
                    className={isLarge ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className={`group relative flex h-full flex-col glass-card rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#E71840]/30 ${
                        isLarge ? "lg:p-10" : ""
                      }`}
                    >
                      {/* Badge */}
                      {service.isNew && (
                        <span className="absolute right-5 top-5 rounded-full bg-[#E71840] px-2.5 py-0.5 text-[10px] font-700 uppercase tracking-wider text-white">
                          New
                        </span>
                      )}

                      {/* Icon */}
                      <div
                        className={`flex items-center justify-center rounded-xl bg-[#E71840]/10 transition-colors group-hover:bg-[#E71840] ${
                          isLarge ? "h-14 w-14" : "h-11 w-11"
                        }`}
                      >
                        {Icon && (
                          <Icon
                            size={isLarge ? 24 : 20}
                            className="text-[#E71840] transition-colors group-hover:text-white"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <h2
                        className={`mt-5 font-[family-name:var(--font-oswald)] font-bold uppercase text-white ${
                          isLarge ? "text-[1.35rem]" : "text-[1.1rem]"
                        }`}
                      >
                        {service.title}
                      </h2>
                      <p
                        className={`mt-2 leading-[1.65] text-white/50 ${
                          isLarge ? "text-[15px]" : "text-[14px]"
                        }`}
                      >
                        {service.description}
                      </p>

                      {/* Tags. large cards only */}
                      {isLarge && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-500 text-white/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Learn more */}
                      <span className="mt-auto pt-5 text-[13px] font-600 text-[#E71840]">
                        Learn More &rarr;
                      </span>
                    </Link>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="bg-[#0A0A0A] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="text-center font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.25rem)] font-700 uppercase tracking-tight text-white">
                How We Work
              </h2>
            </AnimateIn>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  num: "01",
                  title: "DISCOVER",
                  desc: "We audit your current presence, analyze competitors, and identify opportunities.",
                },
                {
                  num: "02",
                  title: "STRATEGY",
                  desc: "We build a custom roadmap aligned to your business goals with clear KPIs and timelines.",
                },
                {
                  num: "03",
                  title: "EXECUTION",
                  desc: "Our team implements the strategy across all channels with weekly progress updates.",
                },
                {
                  num: "04",
                  title: "SUPPORT",
                  desc: "Ongoing optimization, monthly reporting, and strategic adjustments to maximize results.",
                },
              ].map((step, i) => (
                <AnimateIn key={step.num} delay={0.1 * i}>
                  <div className="glass-card relative p-7 text-center">
                    <span className="font-[family-name:var(--font-heading)] text-[2.5rem] font-700 leading-none text-[#E71840]/20">
                      {step.num}
                    </span>
                    <h3 className="mt-3 font-[family-name:var(--font-heading)] text-[1.1rem] font-700 text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#999]">
                      {step.desc}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>

            {/* Connecting line (decorative) */}
            <div className="mx-auto mt-6 hidden max-w-4xl items-center justify-center gap-0 lg:flex">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-[2px] flex-1 bg-gradient-to-r from-[#E71840]/40 via-[#E71840]/20 to-[#E71840]/40"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="bg-[#111] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="text-center font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.25rem)] font-700 uppercase tracking-tight text-white">
                Who We Work With
              </h2>
            </AnimateIn>

            <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {([
                {
                  Icon: UtensilsCrossed,
                  image: "/images/industry-restaurant.webp",
                  name: "Restaurants & Food Service",
                  desc: "Menu optimization, local SEO, social media that drives reservations.",
                },
                {
                  Icon: HardHat,
                  image: "/images/industry-construction.webp",
                  name: "Construction & Home Services",
                  desc: "Lead generation, project portfolios, and local search dominance.",
                },
                {
                  Icon: Heart,
                  image: "/images/industry-healthcare.webp",
                  name: "Healthcare & Medical",
                  desc: "Patient acquisition, HIPAA-aware marketing, and reputation management.",
                },
                {
                  Icon: Building,
                  image: "/images/industry-realestate.webp",
                  name: "Real Estate",
                  desc: "Property marketing, agent branding, and listing visibility.",
                },
                {
                  Icon: ShoppingCart,
                  image: "/images/industry-ecommerce.webp",
                  name: "E-Commerce & Retail",
                  desc: "Product SEO, shopping ads, and conversion optimization.",
                },
                {
                  Icon: Briefcase,
                  image: "/images/industry-professional.jpg",
                  name: "Professional Services",
                  desc: "Authority building, lead generation, and thought leadership content.",
                },
                {
                  Icon: Car,
                  image: "/images/industry-automotive.webp",
                  name: "Automotive",
                  desc: "Local search, inventory marketing, and service department leads.",
                },
                {
                  Icon: Cpu,
                  image: "/images/industry-tech.webp",
                  name: "Technology & SaaS",
                  desc: "Product marketing, demand generation, and technical content.",
                },
              ] as const).map((industry, i) => (
                <AnimateIn key={industry.name} delay={0.05 * i}>
                  <div className="glass-card overflow-hidden text-center transition-transform duration-300 hover:-translate-y-1">
                    <img src={industry.image} alt={`${industry.name} digital marketing in Dallas — NIXAR Solutions`} loading="lazy" className="w-full h-32 object-cover opacity-60" />
                    <div className="p-6">
                      <industry.Icon size={24} className="mx-auto text-[#E71840]" />
                      <h3 className="mt-3 font-[family-name:var(--font-heading)] text-[1rem] font-700 text-white">
                        {industry.name}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-[1.6] text-[#999]">
                        {industry.desc}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-[#0A0A0A] py-24 lg:py-32">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="text-center font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.25rem)] font-700 uppercase tracking-tight text-white">
                Why NIXAR vs. Other Agencies
              </h2>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <div className="glass-card mt-12 overflow-hidden p-0">
                {/* Header */}
                <div className="flex items-center border-b border-white/10">
                  <div className="w-[40%] px-5 py-4 text-[13px] font-600 text-white/50" />
                  <div className="flex-1 border-b-2 border-[#E71840] bg-white/[0.04] px-4 py-4 text-center font-[family-name:var(--font-heading)] text-[0.85rem] font-700 uppercase tracking-wider text-white">
                    NIXAR
                  </div>
                  <div className="flex-1 px-4 py-4 text-center text-[0.8rem] font-600 text-white/50">
                    Typical Agency
                  </div>
                  <div className="flex-1 px-4 py-4 text-center text-[0.8rem] font-600 text-white/50">
                    DIY
                  </div>
                </div>

                {/* Rows */}
                {([
                  { label: "Strategy Alignment", nixar: true, typical: true, diy: false },
                  { label: "AI-Powered Tools", nixar: true, typical: false, diy: false },
                  { label: "24/7 Support", nixar: true, typical: false, diy: false },
                  { label: "Transparent Reporting", nixar: true, typical: true, diy: true },
                  { label: "Cross-Functional Alignment", nixar: true, typical: false, diy: false },
                  { label: "GEO Optimization", nixar: true, typical: false, diy: false },
                  { label: "Custom AI Agents", nixar: true, typical: false, diy: false },
                  { label: "Dedicated Team", nixar: true, typical: true, diy: false },
                ] as const).map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center ${
                      i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"
                    }`}
                  >
                    <div className="w-[40%] px-5 py-3.5 text-[14px] text-white/70">
                      {row.label}
                    </div>
                    <div className="flex flex-1 items-center justify-center bg-white/[0.02] py-3.5">
                      <CheckCircle2 size={18} className="text-green-500" />
                    </div>
                    <div className="flex flex-1 items-center justify-center py-3.5">
                      {row.typical ? (
                        <CheckCircle2 size={18} className="text-green-500" />
                      ) : (
                        <XCircle size={18} className="text-red-500/50" />
                      )}
                    </div>
                    <div className="flex flex-1 items-center justify-center py-3.5">
                      {row.diy ? (
                        <CheckCircle2 size={18} className="text-green-500" />
                      ) : (
                        <XCircle size={18} className="text-red-500/50" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        <CtaBanner />
      </main>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }])]} />
    </>
  );
}
