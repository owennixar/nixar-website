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
} from "lucide-react";
import { services } from "@/lib/data/services";
import AnimateIn from "@/components/ui/AnimateIn";
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
  title: "Digital Marketing Services Dallas | SEO, Web Design, AI | NIXAR Solutions",
  description:
    "Explore NIXAR Solutions' full suite of digital marketing services — SEO, web development, AI agents, social media, paid ads, and more for Dallas-Fort Worth businesses.",
};

export default function ServicesIndex() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="bg-white pb-8 pt-32 lg:pt-40">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                What We Do
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] font-900 leading-[1.05] tracking-tight text-[#1A1A1A]">
                Our Services
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-[var(--color-text-secondary)]">
                End-to-end digital solutions — from branding and web design to AI automation and
                paid advertising. One team. Full accountability. Measurable results.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Bento grid */}
        <section className="bg-white pb-24 pt-8 lg:pb-32">
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
                      className={`group relative flex h-full flex-col rounded-2xl border border-transparent bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-lg ${
                        isLarge ? "lg:p-10" : ""
                      }`}
                    >
                      {/* Badge */}
                      {service.isNew && (
                        <span className="absolute right-5 top-5 rounded-full bg-[var(--color-primary)] px-2.5 py-0.5 text-[10px] font-700 uppercase tracking-wider text-white">
                          New
                        </span>
                      )}

                      {/* Icon */}
                      <div
                        className={`flex items-center justify-center rounded-xl bg-[var(--color-primary-light)] transition-colors group-hover:bg-[var(--color-primary)] ${
                          isLarge ? "h-14 w-14" : "h-11 w-11"
                        }`}
                      >
                        {Icon && (
                          <Icon
                            size={isLarge ? 24 : 20}
                            className="text-[var(--color-primary)] transition-colors group-hover:text-white"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <h2
                        className={`mt-5 font-[family-name:var(--font-heading)] font-700 text-[#1A1A1A] ${
                          isLarge ? "text-[1.35rem]" : "text-[1.1rem]"
                        }`}
                      >
                        {service.title}
                      </h2>
                      <p
                        className={`mt-2 leading-[1.65] text-[var(--color-text-secondary)] ${
                          isLarge ? "text-[15px]" : "text-[14px]"
                        }`}
                      >
                        {service.description}
                      </p>

                      {/* Tags — large cards only */}
                      {isLarge && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[var(--color-bg-alt)] px-2.5 py-0.5 text-[11px] font-500 text-[var(--color-text-muted)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Learn more */}
                      <span className="mt-auto pt-5 text-[13px] font-600 text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-primary-hover)]">
                        Learn More &rarr;
                      </span>
                    </Link>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
    </>
  );
}
