"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/data/services";
import { testimonials } from "@/lib/data/testimonials";
import AnimatedOrbs from "@/components/ui/AnimatedOrbs";
import PulsingGrid from "@/components/ui/PulsingGrid";
import ParticleField from "@/components/ui/ParticleField";
import AccentLines from "@/components/ui/AccentLines";

/* ═══════════════════════════════════════════════════════════════════════════
   HOOK: Intersection Observer for scroll-triggered reveals
   ═══════════════════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOOK: Count-up animation
   ═══════════════════════════════════════════════════════════════════════════ */
function useCountUp(target: number, shouldStart: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!shouldStart) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(Math.round(eased * target));
      if (p < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [shouldStart, target, duration]);

  return value;
}

/* ═══════════════════════════════════════════════════════════════════════════
   REVEAL WRAPPER — fade up on scroll
   ═══════════════════════════════════════════════════════════════════════════ */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SERVICES DATA for numbered cards
   ═══════════════════════════════════════════════════════════════════════════ */
const SERVICE_CARDS = services.map((s, i) => ({
  num: String(i + 1).padStart(2, "0"),
  title: s.shortTitle,
  desc: s.description.split(".").slice(0, 2).join(".") + ".",
  slug: s.slug,
  isNew: s.isNew ?? false,
}));

/* ═══════════════════════════════════════════════════════════════════════════
   PROCESS STEPS
   ═══════════════════════════════════════════════════════════════════════════ */
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "We audit your current digital presence, competitors, and market position to find gaps and opportunities.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "We build a custom roadmap aligning branding, SEO, content, and paid media to your business goals.",
  },
  {
    num: "03",
    title: "Execution",
    desc: "Our team builds, launches, and optimizes every asset — website, campaigns, content, automations.",
  },
  {
    num: "04",
    title: "Support",
    desc: "Ongoing optimization, reporting, and scaling. We don't disappear after launch — we grow with you.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PORTFOLIO PLACEHOLDERS
   ═══════════════════════════════════════════════════════════════════════════ */
const PORTFOLIO = [
  { name: "Tire Wheel Center", cat: "Web Design & SEO", gradient: "from-[#1a1a2e] to-[#16213e]" },
  { name: "SYB Builders", cat: "Branding & Web Dev", gradient: "from-[#1a1a1a] to-[#2d2d2d]" },
  { name: "RunMyProcess", cat: "Digital Strategy", gradient: "from-[#0f3460] to-[#1a1a2e]" },
  { name: "DFW Local Business", cat: "Local SEO & Ads", gradient: "from-[#2d2d2d] to-[#1a1a1a]" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MARQUEE TAGLINES
   ═══════════════════════════════════════════════════════════════════════════ */
const MARQUEE =
  "DIGITAL TRANSFORMATION \u00A0\u2022\u00A0 CONTENT-CENTRIC \u00A0\u2022\u00A0 SEO-DRIVEN \u00A0\u2022\u00A0 SALES-FOCUSED \u00A0\u2022\u00A0 END-TO-END DIGITAL \u00A0\u2022\u00A0 FULL-FUNNEL SUPPORT \u00A0\u2022\u00A0 AI-POWERED \u00A0\u2022\u00A0 ";

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function HomeDark() {
  /* ── Services horizontal scroll ─────────────────────────────────────── */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Stats count-up ─────────────────────────────────────────────────── */
  const statsObs = useInView(0.3);

  /* ── Process timeline fill ──────────────────────────────────────────── */
  const processObs = useInView(0.1);

  return (
    <div className="relative bg-[#0A0A0A] text-white">
      {/* ═══ AMBIENT LAYERS ═══ */}
      <AnimatedOrbs />
      <ParticleField />
      <AccentLines />

      {/* All content above ambient layers */}
      <div className="relative z-10">
      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 1: HERO — 100vh
           ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative flex min-h-dvh items-center overflow-hidden pt-20"
      >
        <PulsingGrid />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-5 lg:px-8">
          {/* Left — Text */}
          <div className="max-w-2xl">
            <Reveal>
              <p
                className="font-[family-name:var(--font-oswald)] text-[0.7rem] font-700 uppercase tracking-[0.2em] text-[#666]"
              >
                NIXAR Solutions — Frisco, TX
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6">
                <span className="hero-glow-white block font-[family-name:var(--font-oswald)] text-[clamp(5rem,12vw,10rem)] font-700 uppercase leading-[0.9] tracking-tight text-white">
                  Digital
                </span>
                <span className="hero-glow-red block font-[family-name:var(--font-oswald)] text-[clamp(5rem,12vw,10rem)] font-700 uppercase leading-[0.9] tracking-tight text-[#E71840]">
                  Transformation.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 h-[2px] w-[60px] bg-[#E71840]" />
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-6 max-w-md text-[1.1rem] leading-[1.7] text-[#999]">
                We don&apos;t just market — we transform businesses online
                through strategy, design, AI, and relentless execution.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <a
                href="#contact"
                className="mt-8 inline-flex h-[52px] items-center border border-white px-8 text-[13px] font-600 uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-white hover:text-[#0A0A0A]"
              >
                Get Free Audit
              </a>
            </Reveal>
          </div>

          {/* Right — Hero image placeholder */}
          <Reveal
            delay={0.2}
            className="hidden w-[45%] shrink-0 lg:block"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-oswald)] text-[6rem] font-700 uppercase leading-none text-white/[0.04] select-none">
                  NIXAR
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-500 uppercase tracking-[0.15em] text-[#444]">
              Scroll
            </span>
            <div className="h-[30px] w-[2px] overflow-hidden bg-[#222]">
              <div className="h-[30px] w-full animate-[scrollLine_1.5s_ease-in-out_infinite] bg-[#666]" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 2: SCROLLING TAGLINE STRIP
           ═══════════════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden border-y border-[#222] bg-[#111] py-3">
        <div className="flex animate-[marqueeScroll_35s_linear_infinite] whitespace-nowrap">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="inline-block text-[0.75rem] font-500 uppercase tracking-[0.15em] text-[#444]"
              aria-hidden={n === 1}
            >
              {MARQUEE}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 3: ABOUT / MISSION STATEMENT — 100vh
           ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="flex min-h-dvh items-center justify-center px-5 py-24 lg:px-8"
      >
        <div className="max-w-3xl text-center">
          <Reveal>
            <span
              className="block font-[family-name:var(--font-oswald)] text-[6rem] leading-none text-[#E71840] select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-2 font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,3.5vw,2.5rem)] font-700 uppercase leading-[1.3] text-white">
              We provide full-spectrum digital solutions, handling everything
              from branding and web design to automation and paid ads — so you
              don&apos;t have to juggle multiple vendors.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-8 h-[2px] w-[40px] bg-[#E71840]" />
            <p className="mt-4 text-[0.8rem] font-500 uppercase tracking-[0.15em] text-[#666]">
              — NIXAR Solutions, Est. 2023
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mx-auto mt-10 flex items-center justify-center gap-8 text-[0.85rem] font-600 uppercase tracking-[0.1em] text-white">
              <span>500+ Projects</span>
              <span className="h-5 w-px bg-white/20" />
              <span>97% Satisfaction</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 4: SERVICES — HORIZONTAL SCROLL
           ═══════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-24 lg:py-32">
        <Reveal className="px-5 lg:px-8">
          <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,6vw,5rem)] font-700 uppercase leading-none text-white">
            What We Do
          </h2>
        </Reveal>

        <div className="mt-12 relative">
          <div
            ref={scrollRef}
            className="flex gap-0 overflow-x-auto scroll-smooth scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {/* Left padding spacer */}
            <div className="shrink-0 w-5 lg:w-8" />

            {SERVICE_CARDS.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group shrink-0 w-[340px] sm:w-[400px] border-r border-[#222] bg-[#111] p-8 flex flex-col justify-between transition-colors duration-300 hover:bg-[#1A1A1A]"
                style={{
                  scrollSnapAlign: "start",
                  minHeight: "500px",
                }}
              >
                {/* Top border accent on hover */}
                <div>
                  <div className="h-[3px] w-full bg-transparent transition-colors duration-300 group-hover:bg-[#E71840] -mt-8 mb-8" />
                  <span className="font-[family-name:var(--font-oswald)] text-[3rem] font-700 leading-none text-[#E71840]">
                    {s.num}
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-oswald)] text-[1.5rem] font-700 uppercase text-white flex items-center gap-2">
                    {s.title}
                    {s.isNew && (
                      <span className="text-[0.65rem] font-600 uppercase tracking-wider text-[#E71840]">
                        NEW
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.6] text-[#888]">
                    {s.desc}
                  </p>
                </div>
                <span className="mt-6 text-[0.8rem] font-600 uppercase tracking-[0.1em] text-[#E71840] transition-colors group-hover:text-white">
                  Learn More &rarr;
                </span>
              </Link>
            ))}

            {/* Right padding spacer */}
            <div className="shrink-0 w-5 lg:w-8" />
          </div>

          {/* Scroll progress indicator */}
          <div className="mx-5 mt-6 h-[2px] bg-[#222] lg:mx-8">
            <div
              className="h-full bg-[#E71840] transition-all duration-150"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 5: FEATURED QUOTE — full viewport
           ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-dvh items-center justify-center px-5 py-24 lg:px-8">
        {/* Watermark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <Image
            src="/logo-white.svg"
            alt=""
            width={600}
            height={180}
            className="w-[60vw] max-w-[600px] opacity-[0.04]"
          />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <Reveal>
            <p className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,5vw,4rem)] font-700 uppercase leading-[1.2] text-white">
              It doesn&apos;t matter where you start.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-2 font-[family-name:var(--font-oswald)] text-[clamp(2rem,5vw,4rem)] font-700 uppercase leading-[1.2] text-white">
              It&apos;s how you{" "}
              <span className="text-[#E71840]">transform</span> from there.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 6: PORTFOLIO — EDITORIAL IMAGE GRID
           ═══════════════════════════════════════════════════════════════════ */}
      <section id="portfolio" className="py-24 lg:py-32">
        <Reveal className="px-5 lg:px-8 mb-12">
          <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,6vw,5rem)] font-700 uppercase leading-none text-white">
            Selected Work
          </h2>
        </Reveal>

        {/* Row 1: 60/40 */}
        <div className="flex flex-col md:flex-row">
          {PORTFOLIO.slice(0, 2).map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.1}
              className={`group relative overflow-hidden ${
                i === 0 ? "md:w-[60%]" : "md:w-[40%]"
              }`}
            >
              <div
                className={`aspect-[16/10] bg-gradient-to-br ${p.gradient}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-[family-name:var(--font-oswald)] text-[4rem] font-700 uppercase text-white/[0.03] select-none">
                    {p.name}
                  </span>
                </div>
              </div>
              {/* Scan line on hover */}
              <div className="portfolio-scanline absolute inset-0 pointer-events-none z-10" />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="font-[family-name:var(--font-oswald)] text-[1.5rem] font-700 uppercase text-white">
                  {p.name}
                </h3>
                <p className="mt-1 text-[0.8rem] uppercase tracking-[0.1em] text-[#999]">
                  {p.cat}
                </p>
                <span className="mt-4 text-[0.8rem] font-600 uppercase tracking-[0.1em] text-[#E71840]">
                  View Project &rarr;
                </span>
              </div>
              {/* Caption */}
              <div className="px-5 py-3 lg:px-8">
                <p className="text-[0.75rem] font-500 uppercase tracking-[0.1em] text-[#666]">
                  {p.name} &mdash; {p.cat}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Row 2: 40/60 (reversed) */}
        <div className="flex flex-col md:flex-row">
          {PORTFOLIO.slice(2, 4).map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.1}
              className={`group relative overflow-hidden ${
                i === 0 ? "md:w-[40%]" : "md:w-[60%]"
              }`}
            >
              <div
                className={`aspect-[16/10] bg-gradient-to-br ${p.gradient}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-[family-name:var(--font-oswald)] text-[4rem] font-700 uppercase text-white/[0.03] select-none">
                    {p.name}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="font-[family-name:var(--font-oswald)] text-[1.5rem] font-700 uppercase text-white">
                  {p.name}
                </h3>
                <p className="mt-1 text-[0.8rem] uppercase tracking-[0.1em] text-[#999]">
                  {p.cat}
                </p>
                <span className="mt-4 text-[0.8rem] font-600 uppercase tracking-[0.1em] text-[#E71840]">
                  View Project &rarr;
                </span>
              </div>
              <div className="px-5 py-3 lg:px-8">
                <p className="text-[0.75rem] font-500 uppercase tracking-[0.1em] text-[#666]">
                  {p.name} &mdash; {p.cat}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 7: STATS
           ═══════════════════════════════════════════════════════════════════ */}
      <section ref={statsObs.ref} className="py-24 lg:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-12 px-5 sm:flex-row sm:gap-0 lg:px-8">
          <StatItem
            target={20}
            suffix="+"
            label="Years Combined Experience"
            started={statsObs.inView}
          />
          <div className="hidden h-20 w-px bg-[#E71840] sm:block" />
          <StatItem
            target={500}
            suffix="+"
            label="Successful Projects"
            started={statsObs.inView}
          />
          <div className="hidden h-20 w-px bg-[#E71840] sm:block" />
          <StatItem
            target={97}
            suffix="%"
            label="Client Satisfaction"
            started={statsObs.inView}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 8: TESTIMONIALS — STACKED EDITORIAL QUOTES
           ═══════════════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 lg:py-32">
        <Reveal className="px-5 lg:px-8 mb-16">
          <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,6vw,5rem)] font-700 uppercase leading-none text-white">
            Client Stories
          </h2>
        </Reveal>

        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          {testimonials.map((t, i) => (
            <Reveal key={i} className="py-16 first:pt-0">
              <span
                className="block font-[family-name:var(--font-oswald)] text-[4rem] leading-none text-[#E71840] select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="mt-2 font-[family-name:var(--font-oswald)] text-[clamp(1.3rem,2.5vw,2rem)] font-700 italic uppercase leading-[1.4] text-white">
                {t.quote}
              </p>
              <div className="mt-6">
                <p className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase text-white">
                  {t.author}
                </p>
                <p className="mt-1 text-[0.85rem] text-[#666]">
                  {t.role}, {t.company}
                </p>
              </div>
              {i < testimonials.length - 1 && (
                <div className="mt-16 h-px bg-[#E71840]/30" />
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 9: PROCESS — VERTICAL TIMELINE
           ═══════════════════════════════════════════════════════════════════ */}
      <section id="process" ref={processObs.ref} className="py-24 lg:py-32">
        <Reveal className="px-5 lg:px-8 mb-16">
          <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,6vw,5rem)] font-700 uppercase leading-none text-white">
            Our Process
          </h2>
        </Reveal>

        <div className="relative mx-auto max-w-3xl px-5 pl-12 lg:pl-16 lg:px-8">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 w-[2px] bg-[#222] lg:left-8" style={{ height: "100%" }}>
            <div
              className="w-full bg-[#E71840] transition-all duration-[1.5s] ease-out"
              style={{ height: processObs.inView ? "100%" : "0%" }}
            />
          </div>

          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.15} className="relative pb-16 last:pb-0">
              {/* Dot on timeline */}
              <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full border-2 border-[#E71840] bg-[#0A0A0A] lg:-left-[28px]" />
              <span className="font-[family-name:var(--font-oswald)] text-[1.5rem] font-700 text-[#E71840]">
                {step.num}
              </span>
              <h3 className="mt-1 font-[family-name:var(--font-oswald)] text-[1.8rem] font-700 uppercase text-white">
                {step.title}
              </h3>
              <p className="mt-2 max-w-lg text-[0.95rem] leading-[1.7] text-[#888]">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 10: CTA
           ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="flex min-h-dvh items-center justify-center px-5 py-24 lg:px-8"
      >
        <div className="text-center">
          <Reveal>
            <h2
              className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,8vw,6rem)] font-700 uppercase leading-[0.95] text-white"
              style={{ textShadow: "0 0 80px rgba(231,24,64,0.15)" }}
            >
              Ready to Launch?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-[1rem] text-[#888]">
              Get your free digital audit and discover what&apos;s possible.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="mailto:hello@nixarsolutions.com"
              className="mt-10 inline-flex h-[56px] items-center border border-[#E71840] px-10 text-[13px] font-600 uppercase tracking-[0.15em] text-[#E71840] transition-all duration-300 hover:bg-[#E71840] hover:text-white"
            >
              Get Free Audit
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 11: CONTACT STRIP
           ═══════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-[#222] py-8">
        <div className="mx-auto flex flex-col items-center justify-center gap-6 px-5 sm:flex-row sm:gap-10 lg:px-8">
          <span className="text-[0.8rem] uppercase tracking-[0.1em] text-[#666]">
            Frisco, TX
          </span>
          <a
            href="tel:4697593638"
            className="text-[0.8rem] uppercase tracking-[0.1em] text-[#666] transition-colors hover:text-white"
          >
            469-759-3638
          </a>
          <a
            href="mailto:hello@nixarsolutions.com"
            className="text-[0.8rem] uppercase tracking-[0.1em] text-[#666] transition-colors hover:text-white"
          >
            hello@nixarsolutions.com
          </a>
        </div>
      </div>
      </div>{/* close z-10 content wrapper */}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function StatItem({
  target,
  suffix,
  label,
  started,
}: {
  target: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(target, started);
  return (
    <div className="flex-1 text-center">
      <p className="font-[family-name:var(--font-oswald)] text-[clamp(4rem,8vw,7rem)] font-700 leading-none text-white">
        {count}
        <span className="text-[#E71840]">{suffix}</span>
      </p>
      <p className="mt-3 text-[0.75rem] font-500 uppercase tracking-[0.1em] text-[#666]">
        {label}
      </p>
    </div>
  );
}
