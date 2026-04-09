"use client";

import { useRef, useEffect, useState } from "react";
import {
  Search,
  Share2,
  Target,
  Monitor,
  Mail,
  PenTool,
  Palette,
  BarChart3,
  Bot,
  Brain,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const CHANNELS = [
  { id: "branding", label: "Branding", Icon: Palette },
  { id: "content", label: "Content", Icon: PenTool },
  { id: "seo", label: "SEO", Icon: Search },
  { id: "social", label: "Social Media", Icon: Share2 },
  { id: "website", label: "Website", Icon: Monitor },
  { id: "email", label: "Email", Icon: Mail },
  { id: "ads", label: "Paid Ads", Icon: Target },
  { id: "analytics", label: "Analytics", Icon: BarChart3 },
  { id: "ai", label: "AI Agents", Icon: Bot },
] as const;

/* Chaos positions: x (vw-ish %), y (vh-ish %), rotation (deg) */
const CHAOS: { x: number; y: number; r: number }[] = [
  { x: 10, y: 15, r: -14 },
  { x: 62, y: 12, r: 18 },
  { x: 82, y: 52, r: -11 },
  { x: 18, y: 58, r: 16 },
  { x: 45, y: 70, r: -8 },
  { x: 75, y: 28, r: 12 },
  { x: 32, y: 35, r: -19 },
  { x: 55, y: 45, r: 9 },
  { x: 88, y: 68, r: -16 },
];

/* Ordered positions: desktop pipeline layout (% of container)
   Left col (ATTRACT): branding, content, seo  @ x=20
   Center col (ENGAGE): social, website, email  @ x=50
   Right col (CONVERT): ads, analytics, ai      @ x=80 */
const ORDER: { x: number; y: number }[] = [
  { x: 20, y: 30 }, // branding
  { x: 20, y: 48 }, // content
  { x: 20, y: 66 }, // seo
  { x: 50, y: 30 }, // social
  { x: 50, y: 48 }, // website
  { x: 50, y: 66 }, // email
  { x: 80, y: 30 }, // ads
  { x: 80, y: 48 }, // analytics
  { x: 80, y: 66 }, // ai
];

const WARNINGS = [
  { text: "NO STRATEGY", x: 12, y: 28 },
  { text: "WASTED $", x: 70, y: 20 },
  { text: "INCONSISTENT", x: 40, y: 62 },
  { text: "DISCONNECTED", x: 80, y: 45 },
];

/* Broken lines between random chaos pairs [x1%, y1%, x2%, y2%] */
const BROKEN_LINES = [
  [12, 20, 58, 15],
  [75, 55, 22, 62],
  [85, 32, 48, 50],
  [35, 40, 78, 30],
  [20, 65, 55, 73],
];

/* Connection line segments for the ordered pipeline */
const CONN_LINES = [
  // Strategy → column tops
  { x1: 50, y1: 16, x2: 20, y2: 27, group: 0 },
  { x1: 50, y1: 16, x2: 50, y2: 27, group: 0 },
  { x1: 50, y1: 16, x2: 80, y2: 27, group: 0 },
  // Left column verticals
  { x1: 20, y1: 34, x2: 20, y2: 45, group: 1 },
  { x1: 20, y1: 52, x2: 20, y2: 63, group: 1 },
  // Center column verticals
  { x1: 50, y1: 34, x2: 50, y2: 45, group: 1 },
  { x1: 50, y1: 52, x2: 50, y2: 63, group: 1 },
  // Right column verticals
  { x1: 80, y1: 34, x2: 80, y2: 45, group: 1 },
  { x1: 80, y1: 52, x2: 80, y2: 63, group: 1 },
  // Column bottoms → Growth
  { x1: 20, y1: 70, x2: 50, y2: 80, group: 2 },
  { x1: 50, y1: 70, x2: 50, y2: 80, group: 2 },
  { x1: 80, y1: 70, x2: 50, y2: 80, group: 2 },
];

const TRACK_MARKS = [
  { at: 0.3, label: "CHAOS" },
  { at: 0.5, label: "SHIFT" },
  { at: 0.75, label: "ORDER" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function AgencyComparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const warningRefs = useRef<(HTMLDivElement | null)[]>([]);
  const brokenLineRef = useRef<SVGSVGElement>(null);
  const connLineRef = useRef<SVGSVGElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const strikeRef = useRef<HTMLSpanElement>(null);
  const keepScrollRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const colLabelsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLParagraphElement>(null);
  const dollarRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  /* ─── GSAP SETUP ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const commonTrigger = {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      };

      // Pin the viewport
      ScrollTrigger.create({
        ...commonTrigger,
        pin: pin,
      });

      /* ── BOX ANIMATIONS ──────────────────────────────────────────── */
      boxRefs.current.forEach((box, i) => {
        if (!box) return;
        const c = CHAOS[i];
        const o = ORDER[i];

        // Set initial chaos position
        gsap.set(box, {
          xPercent: -50,
          yPercent: -50,
          left: `${c.x}%`,
          top: `${c.y}%`,
          rotation: c.r,
        });

        // Chaos intensifies 0-40%
        gsap.to(box, {
          rotation: c.r + (c.r > 0 ? 6 : -6),
          left: `${c.x + (c.x > 50 ? 3 : -3)}%`,
          top: `${c.y + (c.y > 50 ? 2 : -2)}%`,
          scrollTrigger: { ...commonTrigger, start: "top top", end: "40% bottom" },
          ease: "none",
        });

        // Transition to order: 40-65%
        gsap.to(box, {
          left: `${o.x}%`,
          top: `${o.y}%`,
          rotation: 0,
          scrollTrigger: {
            ...commonTrigger,
            start: "40% top",
            end: "65% top",
          },
          ease: "power2.inOut",
        });

        // Color transitions on inner card
        const inner = box.querySelector("[data-card-inner]") as HTMLElement;
        if (inner) {
          gsap.to(inner, {
            "--icon-color": "#E71840",
            "--text-color": "#ffffff",
            "--border-color": "rgba(231,24,64,0.25)",
            "--bg-color": "rgba(231,24,64,0.06)",
            "--blur": "40px",
            scrollTrigger: {
              ...commonTrigger,
              start: "40% top",
              end: "65% top",
            },
            ease: "power2.inOut",
          });
        }
      });

      /* ── WARNING LABELS ──────────────────────────────────────────── */
      warningRefs.current.forEach((el) => {
        if (!el) return;
        // Fade in during chaos
        gsap.fromTo(el, { opacity: 0 }, {
          opacity: 0.35,
          scrollTrigger: { ...commonTrigger, start: "10% top", end: "30% top" },
          ease: "none",
        });
        // Fade out during transition
        gsap.to(el, {
          opacity: 0,
          scrollTrigger: { ...commonTrigger, start: "38% top", end: "50% top" },
          ease: "none",
        });
      });

      /* ── BROKEN LINES ────────────────────────────────────────────── */
      if (brokenLineRef.current) {
        gsap.to(brokenLineRef.current, {
          opacity: 0,
          scrollTrigger: { ...commonTrigger, start: "35% top", end: "50% top" },
          ease: "none",
        });
      }

      /* ── STRIKETHROUGH ON "OTHER AGENCIES" ───────────────────────── */
      if (strikeRef.current) {
        gsap.fromTo(strikeRef.current,
          { width: "0%" },
          {
            width: "100%",
            scrollTrigger: { ...commonTrigger, start: "5% top", end: "40% top" },
            ease: "none",
          }
        );
      }

      /* ── HEADING CROSS-FADE ──────────────────────────────────────── */
      if (heading1Ref.current) {
        gsap.to(heading1Ref.current, {
          opacity: 0,
          scrollTrigger: { ...commonTrigger, start: "55% top", end: "62% top" },
          ease: "none",
        });
      }
      if (heading2Ref.current) {
        gsap.fromTo(heading2Ref.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...commonTrigger, start: "60% top", end: "67% top" },
          ease: "none",
        });
      }

      /* ── KEEP SCROLLING PROMPT ───────────────────────────────────── */
      if (keepScrollRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { ...commonTrigger, start: "28% top", end: "45% top" },
        });
        tl.fromTo(keepScrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        tl.to(keepScrollRef.current, { opacity: 0, duration: 0.3 }, 0.7);
      }

      /* ── "NOW IMAGINE THIS." FLASH ───────────────────────────────── */
      if (flashRef.current) {
        const tl2 = gsap.timeline({
          scrollTrigger: { ...commonTrigger, start: "35% top", end: "52% top" },
        });
        tl2.fromTo(flashRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
        tl2.to(flashRef.current, { opacity: 0, duration: 0.35 }, 0.65);
      }

      /* ── RED SWEEP LINE ──────────────────────────────────────────── */
      if (sweepRef.current) {
        gsap.fromTo(sweepRef.current,
          { width: "0%", opacity: 1 },
          {
            width: "100%",
            scrollTrigger: { ...commonTrigger, start: "55% top", end: "62% top" },
            ease: "power2.inOut",
          }
        );
        gsap.to(sweepRef.current, {
          opacity: 0,
          scrollTrigger: { ...commonTrigger, start: "62% top", end: "66% top" },
          ease: "none",
        });
      }

      /* ── STRATEGY NODE ───────────────────────────────────────────── */
      if (strategyRef.current) {
        gsap.fromTo(strategyRef.current, { opacity: 0, scale: 0.8 }, {
          opacity: 1,
          scale: 1,
          scrollTrigger: { ...commonTrigger, start: "48% top", end: "60% top" },
          ease: "power2.out",
        });
      }

      /* ── GROWTH NODE ─────────────────────────────────────────────── */
      if (growthRef.current) {
        gsap.fromTo(growthRef.current, { opacity: 0, scale: 0.8 }, {
          opacity: 1,
          scale: 1,
          scrollTrigger: { ...commonTrigger, start: "55% top", end: "67% top" },
          ease: "power2.out",
        });
      }

      /* ── CONNECTION LINES (draw via dashoffset) ──────────────────── */
      if (connLineRef.current) {
        const lines = connLineRef.current.querySelectorAll("line");
        lines.forEach((line) => {
          const len = Math.sqrt(
            Math.pow(line.x2.baseVal.value - line.x1.baseVal.value, 2) +
            Math.pow(line.y2.baseVal.value - line.y1.baseVal.value, 2)
          );
          const group = Number(line.dataset.group);
          const startPct = 55 + group * 3; // stagger: 55%, 58%, 61%
          const endPct = startPct + 8;
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
          gsap.to(line, {
            strokeDashoffset: 0,
            opacity: 0.6,
            scrollTrigger: {
              ...commonTrigger,
              start: `${startPct}% top`,
              end: `${endPct}% top`,
            },
            ease: "power2.inOut",
          });
          // Energize in phase 2
          gsap.to(line, {
            opacity: 0.9,
            scrollTrigger: { ...commonTrigger, start: "70% top", end: "95% top" },
            ease: "none",
          });
        });
      }

      /* ── COLUMN LABELS ───────────────────────────────────────────── */
      if (colLabelsRef.current) {
        gsap.fromTo(colLabelsRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...commonTrigger, start: "65% top", end: "72% top" },
          ease: "none",
        });
      }

      /* ── STATS LINE ──────────────────────────────────────────────── */
      if (statsRef.current) {
        gsap.fromTo(statsRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...commonTrigger, start: "88% top", end: "95% top" },
          ease: "none",
        });
      }

      /* ── DOLLAR SIGNS ────────────────────────────────────────────── */
      dollarRefs.current.forEach((el, i) => {
        if (!el) return;
        const startY = -10 + (i * 7) % 50;
        gsap.set(el, { top: `${startY}%`, opacity: 0.15 });

        // Phase 1: drift downward
        gsap.to(el, {
          top: `${startY + 50}%`,
          scrollTrigger: { ...commonTrigger, start: "0% top", end: "45% top" },
          ease: "none",
        });
        // Transition: pause and reverse
        gsap.to(el, {
          top: `${startY + 20}%`,
          color: "rgba(34,197,94,0.5)",
          scrollTrigger: { ...commonTrigger, start: "45% top", end: "65% top" },
          ease: "power2.inOut",
        });
        // Phase 2: flow upward
        gsap.to(el, {
          top: `${startY - 20}%`,
          scrollTrigger: { ...commonTrigger, start: "65% top", end: "100% top" },
          ease: "none",
        });
      });

      /* ── SPARKLES (Phase 2 energy) ───────────────────────────────── */
      if (sparklesRef.current) {
        gsap.fromTo(sparklesRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...commonTrigger, start: "72% top", end: "85% top" },
          ease: "none",
        });
      }

      /* ── SCROLL PROGRESS DOT ─────────────────────────────────────── */
      if (dotRef.current) {
        gsap.fromTo(dotRef.current,
          { top: "0%" },
          {
            top: "100%",
            scrollTrigger: commonTrigger,
            ease: "none",
          }
        );
      }
    }, section);

    ctxRef.current = ctx;
    return () => ctx.revert();
  }, [reducedMotion]);

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════ */

  // Reduced motion: show static ordered layout
  if (reducedMotion) {
    return (
      <section className="relative bg-[#0A0A0A] py-24 px-5 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,5vw,3.5rem)] font-700 uppercase leading-none mb-16">
            <span className="text-white">The NIXAR </span>
            <span className="text-[#E71840]">Way.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {CHANNELS.map((ch) => (
              <div key={ch.id} className="flex flex-col items-center gap-2 rounded-xl border border-[rgba(231,24,64,0.25)] bg-[rgba(231,24,64,0.06)] p-5 backdrop-blur-[40px]">
                <ch.Icon size={24} color="#E71840" />
                <span className="text-[0.75rem] font-600 uppercase tracking-wider text-white">{ch.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]"
      >
        {/* ── HEADING 1: OTHER AGENCIES ── */}
        <h2
          ref={heading1Ref}
          className="absolute top-6 left-6 z-30 font-[family-name:var(--font-oswald)] text-[clamp(1rem,2vw,1.4rem)] font-700 uppercase tracking-[0.1em] text-[#666] lg:top-8 lg:left-10"
        >
          <span className="relative inline-block">
            Other Agencies
            <span
              ref={strikeRef}
              className="absolute left-0 top-1/2 h-[2px] bg-[#E71840]"
              style={{ width: "0%" }}
            />
          </span>
        </h2>

        {/* ── HEADING 2: THE NIXAR WAY ── */}
        <h2
          ref={heading2Ref}
          className="absolute top-6 left-6 z-30 font-[family-name:var(--font-oswald)] text-[clamp(1rem,2vw,1.4rem)] font-700 uppercase tracking-[0.1em] lg:top-8 lg:left-10"
          style={{ opacity: 0 }}
        >
          <span className="text-white">The NIXAR </span>
          <span className="text-[#E71840]">Way.</span>
        </h2>

        {/* ── KEEP SCROLLING PROMPT ── */}
        <div
          ref={keepScrollRef}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <span className="text-[0.65rem] font-700 uppercase tracking-[0.2em] text-[#E71840]">
            Keep Scrolling
          </span>
          <ChevronDown size={16} color="#E71840" className="animate-bounce" />
        </div>

        {/* ── "NOW IMAGINE THIS." FLASH ── */}
        <div
          ref={flashRef}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <p className="font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,4vw,2.5rem)] font-700 uppercase text-[#E71840]">
            Now Imagine This.
          </p>
        </div>

        {/* ── RED SWEEP LINE ── */}
        <div
          ref={sweepRef}
          className="absolute top-1/2 left-0 h-[2px] bg-[#E71840] z-30 pointer-events-none"
          style={{ width: "0%", boxShadow: "0 0 20px rgba(231,24,64,0.5)" }}
        />

        {/* ── STRATEGY NODE ── */}
        <div
          ref={strategyRef}
          className="absolute z-20 flex flex-col items-center"
          style={{ left: "50%", top: "10%", transform: "translate(-50%, -50%)", opacity: 0 }}
        >
          <div
            className="flex items-center gap-3 rounded-xl border px-6 py-3 backdrop-blur-[40px]"
            style={{
              background: "rgba(231,24,64,0.08)",
              borderColor: "rgba(231,24,64,0.3)",
              boxShadow: "0 0 30px rgba(231,24,64,0.15), inset 0 0 20px rgba(231,24,64,0.05)",
            }}
          >
            <Brain size={24} color="#E71840" />
            <span className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-wider text-white">
              Strategy
            </span>
          </div>
        </div>

        {/* ── GROWTH NODE ── */}
        <div
          ref={growthRef}
          className="absolute z-20 flex flex-col items-center"
          style={{ left: "50%", top: "85%", transform: "translate(-50%, -50%)", opacity: 0 }}
        >
          <div
            className="flex items-center gap-3 rounded-xl border px-7 py-4 backdrop-blur-[40px]"
            style={{
              background: "rgba(34,197,94,0.06)",
              borderColor: "rgba(34,197,94,0.25)",
              boxShadow: "0 0 40px rgba(34,197,94,0.15), inset 0 0 20px rgba(34,197,94,0.05)",
            }}
          >
            <TrendingUp size={24} color="#22C55E" />
            <span className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-wider text-white">
              Growth
            </span>
          </div>
          <p
            ref={statsRef}
            className="mt-3 text-[0.6rem] font-500 text-[#666]"
            style={{ opacity: 0 }}
          >
            20+ Years &bull; 500+ Projects &bull; 97% Satisfaction
          </p>
        </div>

        {/* ── COLUMN LABELS ── */}
        <div
          ref={colLabelsRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ opacity: 0 }}
        >
          {[
            { label: "ATTRACT", x: 20 },
            { label: "ENGAGE", x: 50 },
            { label: "CONVERT", x: 80 },
          ].map((col) => (
            <span
              key={col.label}
              className="absolute font-[family-name:var(--font-oswald)] text-[0.6rem] font-700 uppercase tracking-[0.2em] text-[#E71840]"
              style={{ left: `${col.x}%`, top: "22%", transform: "translateX(-50%)" }}
            >
              {col.label}
            </span>
          ))}
        </div>

        {/* ── BROKEN LINES (chaos) ── */}
        <svg
          ref={brokenLineRef}
          className="absolute inset-0 z-[4] h-full w-full pointer-events-none"
        >
          {BROKEN_LINES.map(([x1, y1, x2, y2], i) => (
            <line
              key={`bl-${i}`}
              x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
              stroke="#333" strokeWidth="1" strokeDasharray="8 4" opacity="0.3"
            />
          ))}
        </svg>

        {/* ── CONNECTION LINES (order) ── */}
        <svg
          ref={connLineRef}
          className="absolute inset-0 z-[5] h-full w-full pointer-events-none"
          style={{ willChange: "stroke-dashoffset" }}
        >
          {CONN_LINES.map((ln, i) => (
            <line
              key={`cl-${i}`}
              x1={`${ln.x1}%`} y1={`${ln.y1}%`} x2={`${ln.x2}%`} y2={`${ln.y2}%`}
              stroke="#E71840" strokeWidth="2" data-group={ln.group}
              opacity="0"
            />
          ))}
        </svg>

        {/* ── CHANNEL BOXES ── */}
        {CHANNELS.map((ch, i) => (
          <div
            key={ch.id}
            ref={(el) => { boxRefs.current[i] = el; }}
            className="absolute z-10"
            style={{ width: 140, willChange: "transform, left, top" }}
          >
            <div
              data-card-inner
              className="flex flex-col items-center gap-2 rounded-xl border px-4 py-4 text-center"
              style={{
                ["--icon-color" as string]: "#555",
                ["--text-color" as string]: "#666",
                ["--border-color" as string]: "rgba(255,255,255,0.06)",
                ["--bg-color" as string]: "rgba(255,255,255,0.03)",
                ["--blur" as string]: "20px",
                background: "var(--bg-color)",
                borderColor: "var(--border-color)",
                backdropFilter: "blur(var(--blur))",
                WebkitBackdropFilter: "blur(var(--blur))",
              }}
            >
              <ch.Icon size={24} style={{ color: "var(--icon-color)" }} />
              <span
                className="text-[0.7rem] font-600 uppercase tracking-wider"
                style={{ color: "var(--text-color)" }}
              >
                {ch.label}
              </span>
            </div>
          </div>
        ))}

        {/* ── WARNING LABELS ── */}
        {WARNINGS.map((w, i) => (
          <div
            key={`warn-${i}`}
            ref={(el) => { warningRefs.current[i] = el; }}
            className="absolute z-[6] pointer-events-none flex items-center gap-1"
            style={{ left: `${w.x}%`, top: `${w.y}%`, opacity: 0 }}
          >
            <span className="text-[0.55rem] font-700 uppercase tracking-wider text-[#E71840]">
              {w.text}
            </span>
          </div>
        ))}

        {/* ── DOLLAR SIGNS ── */}
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={`d-${i}`}
            ref={(el) => { dollarRefs.current[i] = el; }}
            className="absolute z-[3] select-none pointer-events-none font-[family-name:var(--font-oswald)] font-700"
            style={{
              left: `${8 + ((i * 37 + 13) % 82)}%`,
              fontSize: 12 + (i % 4) * 3,
              color: "rgba(231,24,64,0.15)",
              willChange: "transform, top",
            }}
          >
            $
          </span>
        ))}

        {/* ── SPARKLES (Phase 2) ── */}
        <div ref={sparklesRef} className="absolute inset-0 z-[6] pointer-events-none" style={{ opacity: 0 }}>
          {ORDER.map((pos, i) => (
            <span
              key={`sp-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y - 6}%`,
                width: 3,
                height: 3,
                background: "#E71840",
                boxShadow: "0 0 6px rgba(231,24,64,0.4)",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* ── SCROLL PROGRESS TRACK ── */}
        <div className="absolute right-5 top-[12%] bottom-[12%] z-20 hidden lg:flex flex-col items-center">
          <div className="relative h-full w-[2px] bg-[#222] rounded-full">
            {TRACK_MARKS.map((mark) => (
              <div
                key={mark.label}
                className="absolute flex items-center gap-2"
                style={{ top: `${mark.at * 100}%`, right: 8, transform: "translateY(-50%)" }}
              >
                <span className="text-[0.5rem] font-600 uppercase tracking-wider text-[#444] whitespace-nowrap">
                  {mark.label}
                </span>
                <span className="block h-[1px] w-2 bg-[#444]" />
              </div>
            ))}
            <div
              ref={dotRef}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#E71840]"
              style={{
                top: "0%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 8px rgba(231,24,64,0.5)",
                willChange: "top",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
