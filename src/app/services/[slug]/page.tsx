import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { services, getServiceBySlug, getServiceSlugs } from "@/lib/data/services";
import { getServiceDetail } from "@/lib/data/service-details";
import { getServiceFaqs } from "@/lib/data/faq";
import { testimonials } from "@/lib/data/testimonials";
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  schemaToScript,
} from "@/lib/seo/schemas";
import AnimateIn from "@/components/ui/AnimateIn";
import { DfwCitiesSection } from "@/components/seo/InternalLinks";
import CtaBanner from "@/components/sections/CtaBanner";
import UniqueServiceSections from "@/components/services/UniqueServiceSections";
import BackgroundEffects from "@/components/ui/BackgroundEffects";

const SERVICE_HERO_IMAGES: Record<string, { src: string; alt: string; overlay?: boolean }> = {
  "social-media-management": {
    src: "/images/service-social.png",
    alt: "iPhone displaying Instagram with floating social media icons",
  },
  "web-development": {
    src: "/images/service-webdev.png",
    alt: "MacBook with floating code elements and web development icons",
  },
  "automation-ai-integration": {
    src: "/images/service-ai.png",
    alt: "Friendly white robot face with CRM and workflow automation elements",
  },
  "personalized-sales-support": {
    src: "/images/service-sales.png",
    alt: "Headset with sales funnel and lead generation elements",
  },
  "search-everywhere-optimization": {
    src: "/images/service-seo.png",
    alt: "Magnifying glass with Google, TikTok, and ChatGPT search icons",
  },
  "ai-tailored-agents": {
    src: "/images/service-ai.png",
    alt: "Friendly AI robot with automation and workflow elements",
  },
  "content-marketing": {
    src: "/images/service-content.jpg",
    alt: "Content marketing strategy and editorial planning — NIXAR Solutions Dallas",
    overlay: true,
  },
  "ai-seo-geo": {
    src: "/images/service-geo.jpg",
    alt: "AI SEO and generative engine optimization — NIXAR Solutions Dallas",
    overlay: true,
  },
  "branding-brand-identity": {
    src: "/images/service-branding.jpg",
    alt: "Brand identity and visual design — NIXAR Solutions Dallas",
    overlay: true,
  },
  "paid-advertising": {
    src: "/images/service-ads.jpg",
    alt: "Paid advertising and performance marketing — NIXAR Solutions Dallas",
    overlay: true,
  },
};

const SECTION_IMAGES: Record<string, string> = {
  "social-media-management": "/images/section-social.jpg",
  "web-development": "/images/section-webdev.jpg",
  "automation-ai-integration": "/images/section-automation.jpg",
  "personalized-sales-support": "/images/section-sales.jpg",
  "search-everywhere-optimization": "/images/section-seo.jpg",
  "content-marketing": "/images/section-content.jpg",
  "ai-seo-geo": "/images/section-geo.jpg",
  "ai-tailored-agents": "/images/section-agents.jpg",
  "branding-brand-identity": "/images/section-branding.jpg",
  "paid-advertising": "/images/section-ads.jpg",
};

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

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const detail = getServiceDetail(slug);
  const faqs = getServiceFaqs(service.title, slug);
  const Icon = ICON_MAP[service.icon];
  const testimonial = detail?.testimonialIndex != null ? testimonials[detail.testimonialIndex] : null;
  const heroImage = SERVICE_HERO_IMAGES[slug];

  // Related services (exclude current, pick 3)
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <main className="bg-[#0A0A0A]">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative w-full min-h-[50vh] md:min-h-[75vh] flex items-end md:items-center overflow-hidden">
          {heroImage ? (
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              loading="eager"
              decoding="sync"
              className="absolute inset-0 w-full h-full object-cover md:object-contain md:object-right"
              style={{ zIndex: 0, backgroundColor: '#0A0A0A' }}
            />
          ) : (
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <BackgroundEffects />
            </div>
          )}
          {/* Gradient: strong dark at bottom on mobile, left-to-right fade on desktop */}
          <div
            className="absolute inset-0 md:hidden"
            style={{ zIndex: 1, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.3) 100%)' }}
          />
          <div
            className="absolute inset-0 hidden md:block"
            style={{ zIndex: 1, background: 'linear-gradient(to right, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.2) 100%)' }}
          />

          <div className="relative w-full max-w-7xl mx-auto px-6 pb-10 md:pb-0 md:py-20" style={{ zIndex: 2 }}>
            <div className="max-w-lg">
              <AnimateIn delay={0.05} direction="none">
                <Link href="/services" className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 inline-block hover:text-white transition-colors">
                  &larr; All Services
                </Link>
              </AnimateIn>

              <div className="flex items-center gap-3 mb-3 md:mb-4">
                {Icon && (
                  <AnimateIn delay={0.1} direction="none">
                    <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(231,24,64,0.15)' }}>
                      <Icon size={20} className="text-[#E71840]" />
                    </div>
                  </AnimateIn>
                )}
                {service.isNew && (
                  <span className="rounded-full bg-[#E71840] px-2 py-1 text-[11px] font-700 uppercase tracking-wider text-white">
                    New
                  </span>
                )}
              </div>

              <AnimateIn delay={0.15}>
                <h1
                  className="font-[family-name:var(--font-oswald)] font-bold uppercase leading-[1.1] tracking-tight text-white text-2xl md:text-4xl lg:text-5xl"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                >
                  {service.title}
                </h1>
              </AnimateIn>

              <AnimateIn delay={0.25} direction="none">
                <p
                  className="mt-3 md:mt-4 text-gray-300 text-sm md:text-base max-w-md leading-[1.6]"
                  style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}
                >
                  {service.description}
                </p>
              </AnimateIn>

              <AnimateIn delay={0.35} direction="none">
                <div className="mt-5 md:mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/free-audit"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[#E71840] px-6 text-[14px] font-600 text-white transition-all hover:bg-[#C41535] hover:shadow-lg hover:shadow-[rgba(231,24,64,0.25)]"
                  >
                    Get Free Audit
                  </Link>
                  <a
                    href="#included"
                    className="inline-flex h-11 items-center justify-center rounded-full border-2 border-white/20 px-6 text-[14px] font-600 text-white transition-all hover:border-white/40"
                  >
                    What&apos;s Included
                  </a>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.4} direction="none">
                <div className="mt-4 md:mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/[0.06] px-3 py-1 text-[12px] font-500 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ─── WHAT IS ──────────────────────────────────────────── */}
        <section className="bg-[#111] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <AnimateIn direction="left" distance={30}>
                  <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                    Understanding the Service
                  </p>
                  <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold uppercase leading-tight tracking-tight text-white">
                    What Is {service.shortTitle} and How Does It Work?
                  </h2>
                </AnimateIn>

                {detail ? (
                  detail.whatIsExtended.map((p, i) => (
                    <AnimateIn key={i} direction="left" distance={20} delay={0.1 + i * 0.08}>
                      <p className="mt-5 text-[15px] leading-[1.8] text-white/60">{p}</p>
                    </AnimateIn>
                  ))
                ) : (
                  <AnimateIn direction="left" distance={20} delay={0.1}>
                    <p className="mt-5 text-[15px] leading-[1.8] text-white/60">{service.whatItIs}</p>
                  </AnimateIn>
                )}
              </div>

              <AnimateIn direction="right" distance={30} delay={0.15} className="order-first lg:order-last lg:col-span-2">
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img
                    src={SECTION_IMAGES[slug] || "/images/section-social.jpg"}
                    alt={`${service.title} — NIXAR Solutions Dallas`}
                    className="w-full h-auto object-cover rounded-xl"
                    style={{ maxHeight: '350px' }}
                    loading="lazy"
                  />
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ─── WHY YOU NEED THIS ────────────────────────────────── */}
        <section className="bg-[#0A0A0A] py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                The Business Case
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold uppercase leading-tight tracking-tight text-white">
                Why Does Your Business Need {service.shortTitle}?
              </h2>
            </AnimateIn>

            {detail ? (
              detail.whyExtended.map((p, i) => (
                <AnimateIn key={i} delay={0.1 + i * 0.08}>
                  <p className="mt-5 text-[15px] leading-[1.8] text-white/60">{p}</p>
                </AnimateIn>
              ))
            ) : (
              <AnimateIn delay={0.1}>
                <p className="mt-5 text-[15px] leading-[1.8] text-white/60">{service.whyNeeded}</p>
              </AnimateIn>
            )}
          </div>
        </section>

        {/* ─── NIXAR APPROACH ───────────────────────────────────── */}
        <section className="bg-[#111] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                Our Approach
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold uppercase leading-tight tracking-tight text-white">
                How Does NIXAR Handle {service.shortTitle}?
              </h2>
            </AnimateIn>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3" style={{ alignItems: 'stretch' }}>
              {(detail?.approachExtended ?? [service.nixarApproach]).map((p, i) => (
                <AnimateIn key={i} delay={0.1 + i * 0.1} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl p-8" style={{ minHeight: '280px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' }}>
                    <span className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#E71840]/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-[14px] leading-[1.75] text-white/60">{p}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── UNIQUE SERVICE SECTIONS ──────────────────────────── */}
        <UniqueServiceSections slug={slug} />

        {/* ─── WHAT'S INCLUDED ──────────────────────────────────── */}
        <section id="included" className="bg-[#0A0A0A] py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                Deliverables
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold uppercase leading-tight tracking-tight text-white">
                What&apos;s Included in {service.shortTitle} from NIXAR?
              </h2>
            </AnimateIn>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(detail?.deliverables ?? service.tags).map((item, i) => (
                <AnimateIn key={item} delay={0.05 * i}>
                  <div className="flex items-start gap-3 rounded-xl bg-white/[0.04] px-5 py-4">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#E71840]" />
                    <span className="text-[14px] leading-relaxed text-white/70">{item}</span>
                  </div>
                </AnimateIn>
              ))}
            </div>

            <AnimateIn delay={0.3}>
              <div className="mt-10 text-center">
                <Link
                  href="/free-audit"
                  className="inline-flex h-12 items-center rounded-full bg-[#E71840] px-8 text-[14px] font-600 text-white transition-all hover:bg-[#C41535] hover:shadow-lg hover:shadow-[rgba(231,24,64,0.25)]"
                >
                  Get Started Today
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ─── TESTIMONIAL ──────────────────────────────────────── */}
        {testimonial && (
          <section className="bg-[#111] py-20 lg:py-28">
            <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
              <AnimateIn>
                <span
                  className="block font-[family-name:var(--font-oswald)] text-[5rem] leading-none text-[#E71840]/15 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="mt-2 text-[1.1rem] italic leading-[1.8] text-white/70">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex justify-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, s) => (
                    <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#E71840">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 font-[family-name:var(--font-oswald)] text-[15px] font-700 text-white">
                  {testimonial.author}
                </p>
                <p className="text-[13px] text-white/40">
                  {testimonial.role}, {testimonial.company}
                </p>
              </AnimateIn>
            </div>
          </section>
        )}

        {/* ─── FAQ ──────────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-3xl px-5 lg:px-8">
              <AnimateIn>
                <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold uppercase leading-tight tracking-tight text-white">
                  Frequently Asked Questions
                </h2>
              </AnimateIn>

              <div className="mt-10 space-y-6">
                {faqs.map((faq, i) => (
                  <AnimateIn key={i} delay={0.05 * i}>
                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 text-white">
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.75] text-white/60">
                        {faq.answer}
                      </p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── RELATED SERVICES ─────────────────────────────────── */}
        <section className="bg-[#111] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,3vw,2rem)] font-bold uppercase tracking-tight text-white">
                Explore More Services
              </h2>
            </AnimateIn>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((s, i) => {
                const RelIcon = ICON_MAP[s.icon];
                return (
                  <AnimateIn key={s.slug} delay={0.08 * i}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex h-full flex-col glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E71840]/30"
                    >
                      {RelIcon && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E71840]/10">
                          <RelIcon size={18} className="text-[#E71840]" />
                        </div>
                      )}
                      <h3 className="mt-4 font-[family-name:var(--font-oswald)] text-[1rem] font-700 text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-white/40">
                        {s.description}
                      </p>
                      <span className="mt-auto pt-4 text-[12px] font-600 text-[#E71840]">
                        Learn More &rarr;
                      </span>
                    </Link>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        <DfwCitiesSection />
        <CtaBanner />
      </main>

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToScript(serviceSchema(service)) }}
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
              { name: "Services", url: "/services" },
              { name: service.title, url: `/services/${service.slug}` },
            ])
          ),
        }}
      />
    </>
  );
}
