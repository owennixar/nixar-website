"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
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
   BLOG POSTS
   ═══════════════════════════════════════════════════════════════════════════ */
const BLOG_POSTS = [
  {
    category: "SOCIAL MEDIA",
    title: "The Ultimate Guide to Social Media Advertising for Small Businesses",
    date: "December 8, 2025",
    gradient: "from-[#2a0a0f] to-[#0a0a0a]",
  },
  {
    category: "DESIGN",
    title: "Why Custom Illustrations Can Transform Your Brand Identity",
    date: "December 8, 2025",
    gradient: "from-[#1a1a1a] to-[#0a0a0a]",
  },
  {
    category: "DIGITAL MARKETING",
    title: "Digital Marketing Strategies That Actually Convert in 2026",
    date: "December 2, 2025",
    gradient: "from-[#1f1f1f] to-[#0a0a0a]",
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
const MARQUEE_ITEMS = [
  "DIGITAL TRANSFORMATION",
  "CONTENT-CENTRIC",
  "SEO-DRIVEN",
  "SALES-FOCUSED",
  "END-TO-END DIGITAL",
  "FULL-FUNNEL SUPPORT",
  "AI-POWERED",
];

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function HomeDark() {
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

        {/* Matrix rain — CSS only */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-[0.04]" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="matrix-col absolute top-0 text-[10px] leading-[14px] font-mono text-[#E71840] whitespace-pre"
              style={{
                left: `${8 + i * 7.5}%`,
                animationDelay: `${-i * 1.3}s`,
                animationDuration: `${8 + (i % 3) * 2}s`,
              }}
            >
              {Array.from({ length: 60 }).map((_, j) => (
                <span key={j} className="block">{String.fromCharCode(48 + (j * 7 + i * 3) % 10)}</span>
              ))}
            </div>
          ))}
        </div>

        {/* Floating astronaut SVG — easter egg */}
        <div className="pointer-events-none absolute top-[12%] right-[8%] z-[2] hidden lg:block" aria-hidden="true">
          <svg className="astronaut-float" width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Asteroid */}
            <ellipse cx="65" cy="105" rx="40" ry="15" fill="#222" />
            <ellipse cx="55" cy="103" rx="5" ry="3" fill="#333" />
            <ellipse cx="78" cy="108" rx="3" ry="2" fill="#2a2a2a" />
            {/* Body */}
            <rect x="48" y="55" width="34" height="40" rx="10" fill="#ddd" />
            {/* Helmet */}
            <circle cx="65" cy="45" r="22" fill="#ccc" />
            <circle cx="65" cy="45" r="16" fill="#1a1a2e" />
            {/* Visor reflection */}
            <ellipse cx="60" cy="40" rx="6" ry="4" fill="rgba(231,24,64,0.15)" transform="rotate(-15 60 40)" />
            {/* Backpack */}
            <rect x="38" y="58" width="10" height="25" rx="4" fill="#bbb" />
            {/* Arms */}
            <rect x="82" y="62" width="14" height="6" rx="3" fill="#ddd" transform="rotate(15 82 62)" />
            <rect x="36" y="68" width="14" height="6" rx="3" fill="#ddd" transform="rotate(-20 36 68)" />
            {/* Legs */}
            <rect x="52" y="90" width="8" height="16" rx="4" fill="#ccc" />
            <rect x="68" y="90" width="8" height="16" rx="4" fill="#ccc" />
            {/* Boots */}
            <rect x="50" y="102" width="12" height="6" rx="3" fill="#999" />
            <rect x="66" y="102" width="12" height="6" rx="3" fill="#999" />
          </svg>
        </div>

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
                <span className="hero-glow-red block font-[family-name:var(--font-playfair)] text-[clamp(5rem,12vw,10rem)] font-700 italic leading-[0.9] tracking-tight text-[#E71840]">
                  Transformation.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 h-[2px] w-[60px] bg-[#E71840]" />
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-6 max-w-md text-[1.1rem] leading-[1.7] text-[#999]">
                We don&apos;t just <span className="text-[#E71840]">market</span> — we transform businesses online
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
              className="inline-block text-[0.75rem] font-500 uppercase tracking-[0.15em]"
              aria-hidden={n === 1}
            >
              {MARQUEE_ITEMS.map((item, idx) => (
                <span key={idx}>
                  <span className="text-[#E71840]">{item}</span>
                  <span className="text-white">{"\u00A0\u2022\u00A0"}</span>
                </span>
              ))}
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
           SECTION 4: SERVICES — GLASS CARD GRID
           ═══════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-24 lg:py-32">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,6vw,5rem)] font-700 uppercase leading-none text-white">
            What We Do
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CARDS.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.1}>
                <Link
                  href={`/services/${s.slug}`}
                  className="glass-card group flex flex-col justify-between"
                  style={{ minHeight: "320px" }}
                >
                  <div>
                    <span className="font-[family-name:var(--font-oswald)] text-[2.5rem] font-700 leading-none text-[#E71840]">
                      {s.num}
                    </span>
                    <h3 className="mt-4 font-[family-name:var(--font-oswald)] text-[1.3rem] font-700 uppercase text-white flex items-center gap-2">
                      {s.title}
                      {s.isNew && (
                        <span className="text-[0.6rem] font-600 uppercase tracking-wider text-[#E71840]">
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
              </Reveal>
            ))}
          </div>
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
           SECTION 10: BLOG — LATEST INSIGHTS
           ═══════════════════════════════════════════════════════════════════ */}
      <section id="blog" className="py-24 lg:py-32">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,6vw,5rem)] font-700 uppercase leading-none text-white">
            Read Our Latest Insights
          </h2>
          <p className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-[1rem] text-[#666]">
            Strategy, trends, and ideas from the NIXAR team.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <Reveal key={post.title} delay={i * 0.1}>
                <Link
                  href="/blog"
                  className="glass-card group flex flex-col !p-0 overflow-hidden"
                >
                  {/* Image placeholder */}
                  <div className="relative h-[200px] w-full overflow-hidden rounded-t-[24px]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E71840]" />
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-8">
                    <span className="text-[0.65rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                      {post.category}
                    </span>
                    <h3 className="mt-3 font-[family-name:var(--font-oswald)] text-[1.2rem] font-700 uppercase leading-[1.3] text-white">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[0.8rem] text-[#666]">{post.date}</p>
                    <span className="mt-auto pt-6 text-[0.75rem] font-600 uppercase tracking-[0.1em] text-[#E71840] transition-colors group-hover:text-white">
                      Read More &rarr;
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 11: CTA
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
