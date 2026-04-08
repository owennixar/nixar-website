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

  // Related services (exclude current, pick 3)
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  const layout = detail?.layout ?? "standard";

  return (
    <>
      <main>
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white pb-16 pt-32 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="hero-orb" style={{ width: 400, height: 400, background: "rgba(231,24,64,0.04)", top: "-5%", right: "5%", animation: "orbFloat1 18s ease-in-out infinite" }} />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn delay={0.05} direction="none">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-[13px] font-500 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                <ArrowLeft size={14} />
                All Services
              </Link>
            </AnimateIn>

            <div className="mt-6 flex items-start gap-5">
              {Icon && (
                <AnimateIn delay={0.1} direction="none">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary-light)]">
                    <Icon size={26} className="text-[var(--color-primary)]" />
                  </div>
                </AnimateIn>
              )}
              <div>
                <AnimateIn delay={0.15}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4.5vw,3.5rem)] font-900 leading-[1.1] tracking-tight text-[#1A1A1A]">
                      {service.title}
                    </h1>
                    {service.isNew && (
                      <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-700 uppercase tracking-wider text-white">
                        New
                      </span>
                    )}
                  </div>
                </AnimateIn>
                <AnimateIn delay={0.25} direction="none">
                  <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-[var(--color-text-secondary)]">
                    {service.description}
                  </p>
                </AnimateIn>
                <AnimateIn delay={0.35} direction="none">
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="#contact"
                      className="inline-flex h-12 items-center rounded-full bg-[var(--color-primary)] px-7 text-[14px] font-600 text-white transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-[var(--color-primary-glow)]"
                    >
                      Get Free Audit
                    </a>
                    <a
                      href="#included"
                      className="inline-flex h-12 items-center rounded-full border-2 border-[var(--color-border)] px-7 text-[14px] font-600 text-[#1A1A1A] transition-all hover:border-[#1A1A1A]"
                    >
                      What&apos;s Included
                    </a>
                  </div>
                </AnimateIn>
              </div>
            </div>

            {/* Tags */}
            <AnimateIn delay={0.4} direction="none">
              <div className="mt-8 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--color-bg-alt)] px-3 py-1 text-[12px] font-500 text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ─── WHAT IS ──────────────────────────────────────────── */}
        <section className={`py-20 lg:py-28 ${layout === "reversed" ? "bg-[var(--color-bg-alt)]" : "bg-white"}`}>
          <div className={`mx-auto max-w-7xl px-5 lg:px-8 ${
            layout === "centered" ? "max-w-3xl text-center" : ""
          }`}>
            <div className={
              layout === "centered"
                ? ""
                : `grid grid-cols-1 gap-12 lg:grid-cols-5 ${layout === "reversed" ? "lg:direction-rtl" : ""}`
            }>
              <div className={layout === "centered" ? "" : "lg:col-span-3"}>
                <AnimateIn direction={layout === "reversed" ? "right" : "left"} distance={30}>
                  <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                    Understanding the Service
                  </p>
                  <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
                    What Is {service.shortTitle}?
                  </h2>
                </AnimateIn>

                {detail ? (
                  detail.whatIsExtended.map((p, i) => (
                    <AnimateIn key={i} direction={layout === "reversed" ? "right" : "left"} distance={20} delay={0.1 + i * 0.08}>
                      <p className="mt-5 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">{p}</p>
                    </AnimateIn>
                  ))
                ) : (
                  <AnimateIn direction="left" distance={20} delay={0.1}>
                    <p className="mt-5 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">{service.whatItIs}</p>
                  </AnimateIn>
                )}
              </div>

              {layout !== "centered" && (
                <AnimateIn direction={layout === "reversed" ? "left" : "right"} distance={30} delay={0.15} className="lg:col-span-2">
                  {/* TODO: Replace with nano-banana-2 generated service illustration */}
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--color-bg-alt)] via-[var(--color-primary-light)] to-[var(--color-bg-alt)] shadow-sm">
                    <div className="flex h-full items-center justify-center">
                      {Icon && <Icon size={48} className="text-[var(--color-primary)]/20" />}
                    </div>
                  </div>
                </AnimateIn>
              )}
            </div>
          </div>
        </section>

        {/* ─── WHY YOU NEED THIS ────────────────────────────────── */}
        <section className={`py-20 lg:py-28 ${layout === "reversed" ? "bg-white" : "bg-[var(--color-bg-alt)]"}`}>
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                The Business Case
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
                Why Your Business Needs {service.shortTitle}
              </h2>
            </AnimateIn>

            {detail ? (
              detail.whyExtended.map((p, i) => (
                <AnimateIn key={i} delay={0.1 + i * 0.08}>
                  <p className="mt-5 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">{p}</p>
                </AnimateIn>
              ))
            ) : (
              <AnimateIn delay={0.1}>
                <p className="mt-5 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">{service.whyNeeded}</p>
              </AnimateIn>
            )}
          </div>
        </section>

        {/* ─── NIXAR APPROACH ───────────────────────────────────── */}
        <section className={`py-20 lg:py-28 ${layout === "reversed" ? "bg-[var(--color-bg-alt)]" : "bg-white"}`}>
          <div className={`mx-auto px-5 lg:px-8 ${layout === "wide" ? "max-w-7xl" : "max-w-4xl"}`}>
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                Our Approach
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
                How NIXAR Delivers {service.shortTitle}
              </h2>
            </AnimateIn>

            {layout === "wide" ? (
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {(detail?.approachExtended ?? [service.nixarApproach]).map((p, i) => (
                  <AnimateIn key={i} delay={0.1 + i * 0.1}>
                    <div className="rounded-2xl bg-[var(--color-bg-alt)] p-7">
                      <span className="font-[family-name:var(--font-heading)] text-3xl font-900 text-[var(--color-primary)]/15">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-3 text-[14px] leading-[1.75] text-[var(--color-text-secondary)]">{p}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            ) : (
              (detail?.approachExtended ?? [service.nixarApproach]).map((p, i) => (
                <AnimateIn key={i} delay={0.1 + i * 0.08}>
                  <p className="mt-5 text-[15px] leading-[1.8] text-[var(--color-text-secondary)]">{p}</p>
                </AnimateIn>
              ))
            )}
          </div>
        </section>

        {/* ─── WHAT'S INCLUDED ──────────────────────────────────── */}
        <section id="included" className="bg-[#0A0A0A] py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                Deliverables
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-white">
                What&apos;s Included
              </h2>
            </AnimateIn>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(detail?.deliverables ?? service.tags).map((item, i) => (
                <AnimateIn key={item} delay={0.05 * i}>
                  <div className="flex items-start gap-3 rounded-xl bg-white/[0.04] px-5 py-4">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
                    <span className="text-[14px] leading-relaxed text-white/70">{item}</span>
                  </div>
                </AnimateIn>
              ))}
            </div>

            <AnimateIn delay={0.3}>
              <div className="mt-10 text-center">
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center rounded-full bg-[var(--color-primary)] px-8 text-[14px] font-600 text-white transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-[var(--color-primary-glow)]"
                >
                  Get Started Today
                </a>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ─── TESTIMONIAL ──────────────────────────────────────── */}
        {testimonial && (
          <section className="bg-white py-20 lg:py-28">
            <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
              <AnimateIn>
                <span
                  className="block font-[family-name:var(--font-heading)] text-[5rem] leading-none text-[var(--color-primary)]/10 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="mt-2 text-[1.1rem] italic leading-[1.8] text-[#333]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex justify-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, s) => (
                    <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 font-[family-name:var(--font-heading)] text-[15px] font-700 text-[#1A1A1A]">
                  {testimonial.author}
                </p>
                <p className="text-[13px] text-[var(--color-text-muted)]">
                  {testimonial.role}, {testimonial.company}
                </p>
              </AnimateIn>
            </div>
          </section>
        )}

        {/* ─── FAQ ──────────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <section className="bg-[var(--color-bg-alt)] py-20 lg:py-28">
            <div className="mx-auto max-w-3xl px-5 lg:px-8">
              <AnimateIn>
                <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
                  Frequently Asked Questions
                </h2>
              </AnimateIn>

              <div className="mt-10 space-y-6">
                {faqs.map((faq, i) => (
                  <AnimateIn key={i} delay={0.05 * i}>
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                      <h3 className="font-[family-name:var(--font-heading)] text-[1rem] font-700 text-[#1A1A1A]">
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.75] text-[var(--color-text-secondary)]">
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
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2rem)] font-800 tracking-tight text-[#1A1A1A]">
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
                      className="group flex h-full flex-col rounded-2xl border border-transparent bg-[var(--color-bg-alt)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-md"
                    >
                      {RelIcon && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary-light)]">
                          <RelIcon size={18} className="text-[var(--color-primary)]" />
                        </div>
                      )}
                      <h3 className="mt-4 font-[family-name:var(--font-heading)] text-[1rem] font-700 text-[#1A1A1A]">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                        {s.description}
                      </p>
                      <span className="mt-auto pt-4 text-[12px] font-600 text-[var(--color-primary)]">
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
