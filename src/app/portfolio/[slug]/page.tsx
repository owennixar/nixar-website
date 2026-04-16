import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { portfolio, getProjectBySlug, PORTFOLIO_IMAGES, PORTFOLIO_METRICS } from "@/lib/data/portfolio";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { testimonials } from "@/lib/data/testimonials";
import { breadcrumbSchema, schemaToScript } from "@/lib/seo/schemas";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBanner from "@/components/sections/CtaBanner";

export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} | Portfolio | NIXAR Solutions`,
    description: project.description,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = portfolio.findIndex((p) => p.slug === slug);
  const nextProject = portfolio[(currentIndex + 1) % portfolio.length];

  const testimonial =
    project.testimonialIndex !== null
      ? testimonials[project.testimonialIndex]
      : null;

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
    { name: project.name, url: `/portfolio/${project.slug}` },
  ]);

  return (
    <main className="bg-[#0A0A0A]">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToScript(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="pb-16 pt-12 lg:pt-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Back link */}
          <AnimateIn>
            <Link
              href="/portfolio"
              className="group mb-8 inline-flex items-center gap-2 text-base font-500 text-white/85 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>
          </AnimateIn>

          {/* Hero image */}
          <AnimateIn delay={0.1}>
            {PORTFOLIO_IMAGES[slug] ? (
              <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <img
                  src={PORTFOLIO_IMAGES[slug].src}
                  alt={PORTFOLIO_IMAGES[slug].alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div
                className={`aspect-[16/9] w-full rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
              >
                <span className="font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,4rem)] font-800 tracking-tight text-white/75">
                  {project.name}
                </span>
              </div>
            )}
          </AnimateIn>

          {/* Title + tags */}
          <AnimateIn delay={0.2}>
            <h1 className="mt-8 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] font-900 leading-[1.05] tracking-tight text-white">
              {project.name}
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.3}>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-base font-500 text-white/85"
                >
                  {service}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* The Challenge */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm lg:p-12">
              <p className="mb-4 text-[1rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                The Challenge
              </p>
              <p className="text-[1.1rem] leading-[1.8] text-white/85">
                {project.challenge}
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Our Solution */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm lg:p-12">
              <p className="mb-4 text-[1rem] font-600 uppercase tracking-[0.15em] text-white/75">
                Our Solution
              </p>
              <p className="text-[1.1rem] leading-[1.8] text-white/85">
                {project.solution}
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* The Results */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm lg:p-12">
              <p className="mb-4 text-[1rem] font-600 uppercase tracking-[0.15em] text-white/75">
                The Results
              </p>
              <p className="text-[1.1rem] leading-[1.8] text-white/85">
                {project.results}
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Results Metrics */}
      {PORTFOLIO_METRICS[slug] && (
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-800 tracking-tight text-white">
                The Results
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {PORTFOLIO_METRICS[slug].map((m, i) => (
                <AnimateIn key={m.label} delay={i * 0.08}>
                  <div
                    className="rounded-2xl p-6 text-center transition-all hover:border-[#E71840]/30"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <p className="font-[family-name:var(--font-oswald)] text-[2.5rem] font-700 leading-none text-white">
                      +<AnimatedCounter target={m.value} suffix={m.suffix} />
                    </p>
                    <p className="mt-2 text-[16px] text-white/75">{m.label}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Used */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn>
            <h2 className="mb-6 font-[family-name:var(--font-heading)] text-2xl font-800 tracking-tight text-white">
              Services Used
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {project.serviceLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={`/services/${link.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-base font-500 text-white/70 transition-all hover:border-[#E71840]/40 hover:bg-[#E71840]/10 hover:text-white"
                >
                  <CheckCircle2 size={14} className="text-[#E71840]" />
                  {link.title}
                </Link>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm lg:p-12">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#E71840] text-[#E71840]"
                    />
                  ))}
                </div>
                <blockquote className="text-[1.15rem] leading-[1.8] text-white/70 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="font-600 text-white">{testimonial.author}</p>
                  <p className="text-base text-white/75">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* Next Project */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn>
            <p className="mb-6 text-center text-[1rem] font-600 uppercase tracking-[0.15em] text-white/75">
              Next Project
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="group block"
            >
              {PORTFOLIO_IMAGES[nextProject.slug] ? (
                <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl transition-transform group-hover:scale-[1.01]">
                  <img
                    src={PORTFOLIO_IMAGES[nextProject.slug].src}
                    alt={PORTFOLIO_IMAGES[nextProject.slug].alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div
                  className={`aspect-[16/9] w-full rounded-2xl bg-gradient-to-br ${nextProject.gradient} flex items-center justify-center transition-transform group-hover:scale-[1.01]`}
                >
                  <span className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,4vw,3rem)] font-800 tracking-tight text-white/75">
                    {nextProject.name}
                  </span>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-800 text-white">
                  {nextProject.name}
                </h3>
                <span className="inline-flex items-center gap-2 text-base font-500 text-white/85 transition-colors group-hover:text-[#E71840]">
                  View Project
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </AnimateIn>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
