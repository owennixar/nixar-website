"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/data/services";
import {
  Share2,
  Code2,
  Bot,
  Headphones,
  Search,
  PenTool,
  Brain,
  Sparkles,
  Palette,
  Target,
} from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import ImageReveal from "@/components/ui/ImageReveal";
import TrustBar from "@/components/sections/TrustBar";

const AnimatedOrbs = dynamic(() => import("@/components/ui/AnimatedOrbs"), { ssr: false });
const PulsingGrid = dynamic(() => import("@/components/ui/PulsingGrid"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/ui/ParticleField"), { ssr: false });
const AccentLines = dynamic(() => import("@/components/ui/AccentLines"), { ssr: false });
const AgencyComparison = dynamic(() => import("@/components/sections/AgencyComparison"), { ssr: false });

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
   REVEAL WRAPPER. fade up on scroll
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
        transform: inView ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SERVICES DATA for numbered cards
   ═══════════════════════════════════════════════════════════════════════════ */
const SERVICE_ICONS = [Share2, Code2, Bot, Headphones, Search, PenTool, Brain, Sparkles, Palette, Target];

const SERVICE_CARDS = services.map((s, i) => ({
  num: String(i + 1).padStart(2, "0"),
  title: s.shortTitle,
  desc: s.description.split(".").slice(0, 2).join(".") + ".",
  slug: s.slug,
  isNew: s.isNew ?? false,
  Icon: SERVICE_ICONS[i],
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
    desc: "Our team builds, launches, and optimizes every asset. website, campaigns, content, automations.",
  },
  {
    num: "04",
    title: "Support",
    desc: "Ongoing optimization, reporting, and scaling. We don't disappear after launch. we grow with you.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   BLOG POSTS (first 3 featured from blog data)
   ═══════════════════════════════════════════════════════════════════════════ */
const BLOG_POSTS = [
  {
    slug: "geo-generative-engine-optimization-2026",
    category: "AI & SEO",
    title: "GEO: How Generative Engine Optimization Is Changing the Marketing Landscape in 2026",
    date: "March 17, 2026",
    image: "/images/blog/geo-generative-engine-optimization-2026.webp",
  },
  {
    slug: "seo-vs-ai-seo-understanding-the-difference",
    category: "SEARCH STRATEGY",
    title: "SEO vs. AI SEO: Understanding the Difference and Why It Matters",
    date: "March 17, 2026",
    image: "/images/blog/seo-vs-ai-seo-understanding-the-difference.webp",
  },
  {
    slug: "manus-ai-changing-social-media-marketing",
    category: "SOCIAL MEDIA & AI",
    title: "How Manus AI Is Changing Social Media Marketing Forever",
    date: "March 17, 2026",
    image: "/images/blog/manus-ai-changing-social-media-marketing.webp",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PORTFOLIO PLACEHOLDERS
   ═══════════════════════════════════════════════════════════════════════════ */
const PORTFOLIO = [
  { name: "Tire Geeks", slug: "tire-geeks", cat: "Digital Marketing & SEO", gradient: "from-[#1a1a2e] to-[#16213e]", image: "/images/portfolio-tiregeeks.webp" },
  { name: "SYB Builders", slug: "syb-builders", cat: "Branding & Website Development", gradient: "from-[#1a1a1a] to-[#2d2d2d]", image: "/images/portfolio-syb.webp" },
  { name: "Lonestar Kart Park", slug: "lonestar-kart-park", cat: "Digital Marketing", gradient: "from-[#0f3460] to-[#1a1a2e]", image: "/images/portfolio-lonestar.webp" },
  { name: "Nixon Jach Hubbard", slug: "nixon-jach-hubbard", cat: "E-Commerce & Web Dev", gradient: "from-[#2d2d2d] to-[#1a1a1a]", image: "/images/portfolio-njh.webp" },
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
           SECTION 1: HERO. 100vh
           ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative w-full flex items-center overflow-hidden"
        style={{ height: 'calc(100vh - 72px)', minHeight: '640px' }}
      >
        {/* Background Image — anchored to top so astronaut/planet is preserved */}
        <Image
          src="/images/hero-bg.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ zIndex: 0, objectPosition: 'center top' }}
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: 'linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.3) 70%, rgba(10,10,10,0.2) 100%)'
          }}
        />

        {/* Hero Content */}
        <div className="relative mx-auto flex w-full max-w-7xl items-center px-5 lg:px-8" style={{ zIndex: 2 }}>
          <div style={{ maxWidth: '800px' }}>
            <Reveal>
              <p
                className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-[0.2em] text-white/85"
              >
                NIXAR Solutions. Frisco, TX
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6">
                <span className="sr-only">Digital Marketing Agency Dallas. </span>
                <span className="hero-glow-white block font-[family-name:var(--font-oswald)] font-700 uppercase tracking-tight text-white" style={{ fontSize: 'clamp(2.5rem,10vw,7rem)', lineHeight: 1.1 }}>
                  <SplitText text="Digital" delay={0.2} stagger={0.03} />
                </span>
                <div style={{ overflow: 'visible', position: 'relative' }}>
                  <span className="hero-glow-red font-[family-name:var(--font-playfair)] font-700 italic text-[#E71840] md:whitespace-nowrap" style={{ display: 'inline-block', fontSize: 'clamp(2rem,7vw,6rem)', lineHeight: 1.1, padding: '0.15em 0.15em 0.05em 0.15em', margin: '-0.15em -0.15em -0.05em -0.15em' }}>
                    <SplitText text="Transformation." delay={0.4} stagger={0.03} />
                  </span>
                </div>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 h-[2px] w-[60px] bg-[#E71840]" />
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-6 max-w-md text-[1.1rem] leading-[1.7] text-white/70">
                Dallas&apos;s full-service <span className="text-[#E71840]">digital marketing agency</span>. We don&apos;t just market. we transform businesses online
                through SEO, web design, AI, and relentless execution.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <MagneticButton>
                <a
                  href="#contact"
                  className="mt-8 inline-flex h-[52px] items-center border border-white px-8 text-[16px] font-600 uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-white hover:text-[#0A0A0A]"
                >
                  Get Free Audit
                </a>
              </MagneticButton>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block" style={{ zIndex: 2 }}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[16px] font-500 uppercase tracking-[0.15em] text-white/75">
              Scroll
            </span>
            <div className="h-[30px] w-[2px] overflow-hidden bg-white/20">
              <div className="h-[30px] w-full animate-[scrollLine_1.5s_ease-in-out_infinite] bg-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 1B: TRUST BAR
           ═══════════════════════════════════════════════════════════════════ */}
      <TrustBar />

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 2: SCROLLING TAGLINE STRIP
           ═══════════════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden border-y border-[#222] bg-[#111] py-3">
        <div className="flex animate-[marqueeScroll_35s_linear_infinite] whitespace-nowrap">
          {[0, 1].map((n) => (
            <span
              key={n}
              className="inline-block text-[1rem] font-500 uppercase tracking-[0.15em]"
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
           SECTION 3: THE DIFFERENCE. Other Agencies vs NIXAR Way
           ═══════════════════════════════════════════════════════════════════ */}
      </div>{/* Close z-10 wrapper temporarily for full-bleed pinned section */}
      <AgencyComparison />
      <div className="relative z-10">{/* Re-open z-10 wrapper */}

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 4: SERVICES. GLASS CARD GRID
           ═══════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-24 lg:py-32">
        <Reveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,6vw,5rem)] font-700 uppercase leading-none text-white">
            What We Do
          </h2>
        </Reveal>

        {/* Horizontal floating carousel — continuous marquee, pauses on hover */}
        <div className="services-marquee-viewport mt-12 overflow-hidden">
          <div className="services-marquee-track flex w-max gap-6">
            {[0, 1].map((loop) => (
              <div key={loop} className="flex shrink-0 gap-6 pr-6" aria-hidden={loop === 1}>
                {SERVICE_CARDS.map((s) => (
                  <Link
                    key={`${loop}-${s.slug}`}
                    href={`/services/${s.slug}`}
                    className="services-card glass-card group flex w-[320px] shrink-0 flex-col justify-between"
                    tabIndex={loop === 1 ? -1 : 0}
                  >
                    <div>
                      {s.Icon && <s.Icon size={28} color="#E71840" className="mb-3" />}
                      <span className="font-[family-name:var(--font-oswald)] text-[2.5rem] font-700 leading-none text-[#E71840]">
                        {s.num}
                      </span>
                      <h3 className="mt-4 font-[family-name:var(--font-oswald)] text-[1.3rem] font-700 uppercase text-white flex items-center gap-2">
                        {s.title}
                        {s.isNew && (
                          <span className="text-[1rem] font-600 uppercase tracking-wider text-[#E71840]">
                            NEW
                          </span>
                        )}
                      </h3>
                      <p className="mt-3 text-[1rem] leading-[1.6] text-white/75">
                        {s.desc}
                      </p>
                    </div>
                    <span className="mt-6 text-[1rem] font-600 uppercase tracking-[0.1em] text-[#E71840] transition-colors group-hover:text-white">
                      Learn More &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SEO KEYWORD PARAGRAPH
           ═══════════════════════════════════════════════════════════════════ */}
      <section className="pt-2 pb-6">
        <div className="mx-auto max-w-[64rem] px-5 lg:px-8">
          <p className="text-[1.32rem] leading-[1.7] text-white/90">
            As a full-service digital marketing agency in Dallas, NIXAR Solutions provides comprehensive SEO services, custom website design and development, social media marketing management, paid advertising across Google and Meta, content marketing, branding, and AI-powered marketing automation. Based in Frisco and serving the entire Dallas-Fort Worth metroplex, we help local businesses compete and win online.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 6: PORTFOLIO. HORIZONTAL SCROLL
           ═══════════════════════════════════════════════════════════════════ */}
      <HorizontalPortfolio />

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
           SECTION 8: TESTIMONIALS. STACKED EDITORIAL QUOTES
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
                <p className="mt-1 text-[1rem] text-[#666]">
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
           SECTION 9: PROCESS. VERTICAL TIMELINE
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
              <p className="mt-2 max-w-lg text-[1rem] leading-[1.7] text-[#888]">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 10: BLOG. LATEST INSIGHTS
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
              <Reveal key={post.title} delay={i * 0.1} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="glass-card group flex h-full flex-col !p-0 overflow-hidden"
                >
                  <div className="relative h-[200px] w-full overflow-hidden rounded-t-[24px]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E71840]" />
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-8">
                    <span className="text-[1rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                      {post.category}
                    </span>
                    <h3 className="mt-3 font-[family-name:var(--font-oswald)] text-[1.2rem] font-700 uppercase leading-[1.3] text-white">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[1rem] text-[#666]">{post.date}</p>
                    <span className="mt-auto pt-6 text-[1rem] font-600 uppercase tracking-[0.1em] text-[#E71840] transition-colors group-hover:text-white">
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
              Ready to <span className="text-[#E71840]">Launch?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-[1rem] text-[#888]">
              Get your free digital audit and discover what&apos;s possible.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticButton>
              <a
                href="mailto:hello@nixarsolutions.com"
                className="mt-10 inline-flex h-[56px] items-center border border-[#E71840] px-10 text-[16px] font-600 uppercase tracking-[0.15em] text-[#E71840] transition-all duration-300 hover:bg-[#E71840] hover:text-white"
              >
                Get Free Audit
              </a>
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           SECTION 11: CONTACT STRIP
           ═══════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-[#222] py-8">
        <div className="mx-auto flex flex-col items-center justify-center gap-6 px-5 sm:flex-row sm:gap-10 lg:px-8">
          <span className="text-[1rem] uppercase tracking-[0.1em] text-[#666]">
            Frisco, TX
          </span>
          <a
            href="tel:4697593638"
            className="text-[1rem] uppercase tracking-[0.1em] text-[#666] transition-colors hover:text-white"
          >
            469-759-3638
          </a>
          <a
            href="mailto:hello@nixarsolutions.com"
            className="text-[1rem] uppercase tracking-[0.1em] text-[#666] transition-colors hover:text-white"
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
   HORIZONTAL SCROLL PORTFOLIO (GSAP ScrollTrigger)
   ═══════════════════════════════════════════════════════════════════════════ */
function HorizontalPortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return; // Mobile uses vertical grid instead

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    };

    init();
    return () => { ctx?.revert(); };
  }, []);

  if (isMobile) {
    return (
      <section id="portfolio" className="relative pt-8 pb-16 px-6 overflow-hidden">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-oswald)] text-4xl font-700 uppercase leading-none text-white">Selected Work</h2>
          <p className="mt-3 text-[1.2rem] leading-[1.6] text-white/85">Real projects, real results.</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {PORTFOLIO.map((p) => (
            <Link key={p.name} href={`/portfolio/${p.slug}`} className="group block overflow-hidden rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="relative aspect-video overflow-hidden">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-[family-name:var(--font-oswald)] text-lg font-700 uppercase text-white">{p.name}</h3>
                <p className="mt-1 text-[1rem] uppercase tracking-[0.1em] text-[#999]">{p.cat}</p>
                <span className="mt-3 inline-block text-[1rem] font-600 uppercase tracking-[0.1em] text-[#E71840]">View Case Study &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="portfolio" className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center"
        style={{ width: "max-content" }}
      >
        {/* Heading card */}
        <div className="flex h-screen w-[40vw] shrink-0 flex-col justify-center px-5 lg:px-16">
          <Reveal>
            <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,6vw,5rem)] font-700 uppercase leading-none text-white">
              Selected Work
            </h2>
            <p className="mt-4 max-w-md text-[1.2rem] leading-[1.7] text-white/85">
              Real projects, real results. Scroll to explore our portfolio.
            </p>
          </Reveal>
        </div>

        {/* Portfolio cards */}
        {PORTFOLIO.map((p) => (
          <Link
            key={p.name}
            href={`/portfolio/${p.slug}`}
            className="group relative mx-4 h-[70vh] w-[40vw] shrink-0 overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {p.image ? (
              <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient}`} />
            )}
            <div className="portfolio-scanline absolute inset-0 pointer-events-none z-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <h3 className="font-[family-name:var(--font-oswald)] text-[1.5rem] font-800 uppercase text-white">
                {p.name}
              </h3>
              <p className="mt-1 text-[1rem] uppercase tracking-[0.1em] text-white/85">
                {p.cat}
              </p>
              <span className="mt-4 text-[1rem] font-600 uppercase tracking-[0.1em] text-[#E71840]">
                View Case Study &rarr;
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 lg:bottom-5 lg:left-5 lg:right-5">
              <div className="inline-block rounded-xl bg-white px-4 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
                <p className="text-[1rem] font-800 uppercase tracking-[0.08em] text-[#0A0A0A] leading-tight">
                  {p.name}
                </p>
                <p className="mt-1 text-[1rem] font-600 uppercase tracking-[0.08em] text-[#E71840] leading-tight">
                  {p.cat}
                </p>
              </div>
            </div>
          </Link>
        ))}

        {/* Spacer at end */}
        <div className="w-[10vw] shrink-0" />
      </div>
    </section>
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
      <p className="mt-3 text-[1rem] font-500 uppercase tracking-[0.1em] text-[#666]">
        {label}
      </p>
    </div>
  );
}
