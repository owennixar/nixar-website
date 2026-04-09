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

/* Chaos: ALL boxes clustered in center with slight offsets & random rotations */
const CHAOS: { x: number; y: number; r: number }[] = [
  { x: 46, y: 44, r: -12 },
  { x: 52, y: 48, r: 8 },
  { x: 48, y: 52, r: -15 },
  { x: 54, y: 46, r: 11 },
  { x: 50, y: 50, r: -7 },
  { x: 47, y: 53, r: 14 },
  { x: 53, y: 47, r: -10 },
  { x: 49, y: 51, r: 13 },
  { x: 51, y: 45, r: -9 },
];

/* Ordered pipeline positions (% of container) */
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

/* Flicker animation delays/durations per box */
const FLICKER_DURATIONS = [2.3, 3.1, 2.7, 3.5, 2.0, 2.9, 3.3, 2.5, 3.8];

const WARNINGS = [
  { text: "NO STRATEGY", x: 38, y: 38 },
  { text: "WASTED $", x: 56, y: 37 },
  { text: "INCONSISTENT", x: 42, y: 58 },
  { text: "DISCONNECTED", x: 55, y: 57 },
];

/* All 12 connection lines for the organized pipeline */
const CONN_LINES = [
  // Group 0: STRATEGY → three column tops (55-60%)
  { x1: 50, y1: 16, x2: 20, y2: 27, group: 0 },  // STRATEGY → Branding
  { x1: 50, y1: 16, x2: 50, y2: 27, group: 0 },  // STRATEGY → Social Media
  { x1: 50, y1: 16, x2: 80, y2: 27, group: 0 },  // STRATEGY → Paid Ads
  // Group 1: vertical column lines (58-63%)
  { x1: 20, y1: 34, x2: 20, y2: 44, group: 1 },  // Branding → Content
  { x1: 20, y1: 52, x2: 20, y2: 62, group: 1 },  // Content → SEO
  { x1: 50, y1: 34, x2: 50, y2: 44, group: 1 },  // Social Media → Website
  { x1: 50, y1: 52, x2: 50, y2: 62, group: 1 },  // Website → Email
  { x1: 80, y1: 34, x2: 80, y2: 44, group: 1 },  // Paid Ads → Analytics
  { x1: 80, y1: 52, x2: 80, y2: 62, group: 1 },  // Analytics → AI Agents
  // Group 2: three bottom lines → GROWTH (63-68%)
  { x1: 20, y1: 70, x2: 50, y2: 80, group: 2 },  // SEO → GROWTH
  { x1: 50, y1: 70, x2: 50, y2: 80, group: 2 },  // Email → GROWTH
  { x1: 80, y1: 70, x2: 50, y2: 80, group: 2 },  // AI Agents → GROWTH
];

const TRACK_MARKS = [
  { at: 0.2, label: "CHAOS" },
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
  const pulseRef1 = useRef<HTMLDivElement>(null);
  const pulseRef2 = useRef<HTMLDivElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const strikeRef = useRef<HTMLSpanElement>(null);
  const keepScrollRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const colLabelsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLParagraphElement>(null);
  const dollarRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const moneyFlowRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

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
      const st = {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      };

      // Pin the viewport
      ScrollTrigger.create({ ...st, pin });

      /* ── BOX ANIMATIONS ──────────────────────────────────────────── */
      boxRefs.current.forEach((box, i) => {
        if (!box) return;
        const c = CHAOS[i];
        const o = ORDER[i];

        // Initial: clustered center, flickering
        gsap.set(box, {
          xPercent: -50,
          yPercent: -50,
          left: `${c.x}%`,
          top: `${c.y}%`,
          rotation: c.r,
        });

        // 0-20%: stay clustered, slight jitter
        // (no tween needed — boxes stay at initial positions)

        // 20-55%: move to organized positions
        gsap.to(box, {
          left: `${o.x}%`,
          top: `${o.y}%`,
          rotation: 0,
          scrollTrigger: { ...st, start: "20% top", end: "55% top" },
          ease: "power2.inOut",
        });

        // Flicker → steady opacity: 0-20% flickering, 20-45% fading to solid
        const inner = box.querySelector("[data-card-inner]") as HTMLElement;
        if (inner) {
          // Stop flicker by transitioning to full opacity
          gsap.to(inner, {
            opacity: 1,
            scrollTrigger: { ...st, start: "20% top", end: "45% top" },
            ease: "power2.inOut",
          });

          // Color transitions: 20-55%
          gsap.to(inner, {
            "--icon-color": "#E71840",
            "--text-color": "#ffffff",
            "--border-color": "rgba(231,24,64,0.25)",
            "--bg-color": "rgba(231,24,64,0.06)",
            "--blur": "40px",
            scrollTrigger: { ...st, start: "20% top", end: "55% top" },
            ease: "power2.inOut",
          });

          // Remove flicker animation class during transition
          ScrollTrigger.create({
            ...st,
            start: "25% top",
            end: "25% top",
            onEnter: () => inner.classList.remove("flicker-anim"),
            onLeaveBack: () => inner.classList.add("flicker-anim"),
          });
        }
      });

      /* ── WARNING LABELS ──────────────────────────────────────────── */
      warningRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0 }, {
          opacity: 0.35,
          scrollTrigger: { ...st, start: "5% top", end: "15% top" },
          ease: "none",
        });
        gsap.to(el, {
          opacity: 0,
          scrollTrigger: { ...st, start: "20% top", end: "35% top" },
          ease: "none",
        });
      });

      /* ── BROKEN LINES ────────────────────────────────────────────── */
      if (brokenLineRef.current) {
        gsap.to(brokenLineRef.current, {
          opacity: 0,
          scrollTrigger: { ...st, start: "20% top", end: "35% top" },
          ease: "none",
        });
      }

      /* ── STRIKETHROUGH ───────────────────────────────────────────── */
      if (strikeRef.current) {
        gsap.fromTo(strikeRef.current, { width: "0%" }, {
          width: "100%",
          scrollTrigger: { ...st, start: "5% top", end: "30% top" },
          ease: "none",
        });
      }

      /* ── HEADING CROSS-FADE ──────────────────────────────────────── */
      if (heading1Ref.current) {
        gsap.to(heading1Ref.current, {
          opacity: 0,
          scrollTrigger: { ...st, start: "50% top", end: "55% top" },
          ease: "none",
        });
      }
      if (heading2Ref.current) {
        gsap.fromTo(heading2Ref.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...st, start: "55% top", end: "60% top" },
          ease: "none",
        });
      }

      /* ── KEEP SCROLLING PROMPT ───────────────────────────────────── */
      if (keepScrollRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { ...st, start: "15% top", end: "30% top" },
        });
        tl.fromTo(keepScrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        tl.to(keepScrollRef.current, { opacity: 0, duration: 0.3 }, 0.7);
      }

      /* ── "NOW IMAGINE THIS." FLASH ───────────────────────────────── */
      if (flashRef.current) {
        const tl2 = gsap.timeline({
          scrollTrigger: { ...st, start: "30% top", end: "45% top" },
        });
        tl2.fromTo(flashRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
        tl2.to(flashRef.current, { opacity: 0, duration: 0.35 }, 0.65);
      }

      /* ── STRATEGY NODE ───────────────────────────────────────────── */
      if (strategyRef.current) {
        gsap.fromTo(strategyRef.current, { opacity: 0, scale: 0.8 }, {
          opacity: 1, scale: 1,
          scrollTrigger: { ...st, start: "50% top", end: "58% top" },
          ease: "power2.out",
        });
      }

      /* ── GROWTH NODE ─────────────────────────────────────────────── */
      if (growthRef.current) {
        gsap.fromTo(growthRef.current, { opacity: 0, scale: 0.8 }, {
          opacity: 1, scale: 1,
          scrollTrigger: { ...st, start: "55% top", end: "63% top" },
          ease: "power2.out",
        });
      }

      /* ── CONNECTION LINES (draw via dashoffset) ──────────────────── */
      if (connLineRef.current) {
        const lines = connLineRef.current.querySelectorAll<SVGLineElement>("line");
        lines.forEach((line) => {
          const dx = parseFloat(line.getAttribute("x2") || "0") - parseFloat(line.getAttribute("x1") || "0");
          const dy = parseFloat(line.getAttribute("y2") || "0") - parseFloat(line.getAttribute("y1") || "0");
          // Use a generous length for percentage-based coords
          const len = Math.sqrt(dx * dx + dy * dy) * 15;
          const group = Number(line.dataset.group);
          const startPct = 55 + group * 4;
          const endPct = startPct + 6;

          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
          gsap.to(line, {
            strokeDashoffset: 0, opacity: 0.7,
            scrollTrigger: { ...st, start: `${startPct}% top`, end: `${endPct}% top` },
            ease: "power2.inOut",
          });
        });
      }

      /* ── RED PULSE at 70% ────────────────────────────────────────── */
      if (pulseRef1.current) {
        gsap.set(pulseRef1.current, { scale: 0.5, opacity: 0 });
        const pulseTl = gsap.timeline({
          scrollTrigger: { ...st, start: "68% top", end: "72% top" },
        });
        pulseTl.to(pulseRef1.current, { scale: 5, opacity: 0.4, duration: 0.3, ease: "power2.out" });
        pulseTl.to(pulseRef1.current, { opacity: 0, duration: 0.7, ease: "none" }, 0.3);
      }
      if (pulseRef2.current) {
        gsap.set(pulseRef2.current, { scale: 0.5, opacity: 0 });
        const pulseTl2 = gsap.timeline({
          scrollTrigger: { ...st, start: "69% top", end: "73% top" },
        });
        pulseTl2.to(pulseRef2.current, { scale: 5, opacity: 0.4, duration: 0.3, ease: "power2.out" });
        pulseTl2.to(pulseRef2.current, { opacity: 0, duration: 0.7, ease: "none" }, 0.3);
      }

      // Flash all connection lines brighter at 70%
      if (connLineRef.current) {
        const allLines = connLineRef.current.querySelectorAll<SVGLineElement>("line");
        allLines.forEach((line) => {
          const flashTl = gsap.timeline({
            scrollTrigger: { ...st, start: "69% top", end: "73% top" },
          });
          flashTl.to(line, { opacity: 1, duration: 0.3 });
          flashTl.to(line, { opacity: 0.7, duration: 0.7 }, 0.3);
        });
      }

      /* ── COLUMN LABELS ───────────────────────────────────────────── */
      if (colLabelsRef.current) {
        gsap.fromTo(colLabelsRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...st, start: "62% top", end: "68% top" },
          ease: "none",
        });
      }

      /* ── STATS LINE ──────────────────────────────────────────────── */
      if (statsRef.current) {
        gsap.fromTo(statsRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...st, start: "88% top", end: "95% top" },
          ease: "none",
        });
      }

      /* ── DOLLAR SIGNS (chaos: fall down, order: flow up green) ──── */
      dollarRefs.current.forEach((el, i) => {
        if (!el) return;
        const startY = 20 + (i * 4) % 40;
        gsap.set(el, { top: `${startY}%`, opacity: 0.15 });

        // Drift down 0-40%
        gsap.to(el, {
          top: `${startY + 35}%`,
          scrollTrigger: { ...st, start: "0% top", end: "40% top" },
          ease: "none",
        });
        // Slow, reverse direction 40-65%
        gsap.to(el, {
          top: `${startY + 10}%`,
          color: "rgba(34,197,94,0.35)",
          opacity: 0.3,
          scrollTrigger: { ...st, start: "40% top", end: "65% top" },
          ease: "power2.inOut",
        });
        // Flow upward 65-100%
        gsap.to(el, {
          top: `${startY - 25}%`,
          opacity: 0.25,
          scrollTrigger: { ...st, start: "65% top", end: "100% top" },
          ease: "none",
        });
      });

      /* ── MONEY FLOW (green $ along paths, 72%+) ──────────────────── */
      if (moneyFlowRef.current) {
        gsap.fromTo(moneyFlowRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...st, start: "70% top", end: "80% top" },
          ease: "none",
        });
      }

      /* ── SPARKLES (Phase 2 energy) ───────────────────────────────── */
      if (sparklesRef.current) {
        gsap.fromTo(sparklesRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...st, start: "72% top", end: "85% top" },
          ease: "none",
        });
      }

      /* ── SCROLL PROGRESS DOT ─────────────────────────────────────── */
      if (dotRef.current) {
        gsap.fromTo(dotRef.current, { top: "0%" }, {
          top: "100%",
          scrollTrigger: st,
          ease: "none",
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════ */
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
    <section ref={sectionRef} className="relative" style={{ height: "400vh" }}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">

        {/* ── HEADING 1: OTHER AGENCIES ── */}
        <h2
          ref={heading1Ref}
          className="absolute top-6 left-6 z-30 font-[family-name:var(--font-oswald)] text-[clamp(1rem,2vw,1.4rem)] font-700 uppercase tracking-[0.1em] text-[#666] lg:top-8 lg:left-10"
        >
          <span className="relative inline-block">
            Other Agencies
            <span ref={strikeRef} className="absolute left-0 top-1/2 h-[2px] bg-[#E71840]" style={{ width: "0%" }} />
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

        {/* ── KEEP SCROLLING ── */}
        <div
          ref={keepScrollRef}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <span className="text-[0.65rem] font-700 uppercase tracking-[0.2em] text-[#E71840]">Keep Scrolling</span>
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
            <span className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-wider text-white">Strategy</span>
          </div>
          {/* Pulse ring from Strategy */}
          <div
            ref={pulseRef1}
            className="absolute rounded-full border-2 border-[#E71840] pointer-events-none"
            style={{ width: 60, height: 60, top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0 }}
          />
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
            <span className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-wider text-white">Growth</span>
          </div>
          <p ref={statsRef} className="mt-3 text-[0.6rem] font-500 text-[#666]" style={{ opacity: 0 }}>
            20+ Years &bull; 500+ Projects &bull; 97% Satisfaction
          </p>
          {/* Pulse ring from Growth */}
          <div
            ref={pulseRef2}
            className="absolute rounded-full border-2 border-[#22C55E] pointer-events-none"
            style={{ width: 60, height: 60, top: "25%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0 }}
          />
        </div>

        {/* ── COLUMN LABELS ── */}
        <div ref={colLabelsRef} className="absolute inset-0 z-10 pointer-events-none" style={{ opacity: 0 }}>
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
        <svg ref={brokenLineRef} className="absolute inset-0 z-[4] h-full w-full pointer-events-none">
          {[
            [42, 40, 55, 42],
            [48, 55, 53, 48],
            [44, 47, 56, 53],
            [50, 43, 47, 54],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={`bl-${i}`} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
              stroke="#333" strokeWidth="1" strokeDasharray="8 4" opacity="0.25" />
          ))}
        </svg>

        {/* ── CONNECTION LINES (all 12, order phase) ── */}
        <svg ref={connLineRef} className="absolute inset-0 z-[5] h-full w-full pointer-events-none">
          {CONN_LINES.map((ln, i) => (
            <line key={`cl-${i}`}
              x1={`${ln.x1}%`} y1={`${ln.y1}%`} x2={`${ln.x2}%`} y2={`${ln.y2}%`}
              stroke="#E71840" strokeWidth="2" data-group={ln.group} opacity="0" />
          ))}
        </svg>

        {/* ── CHANNEL BOXES (9 boxes, start clustered & flickering) ── */}
        {CHANNELS.map((ch, i) => (
          <div
            key={ch.id}
            ref={(el) => { boxRefs.current[i] = el; }}
            className="absolute z-10"
            style={{ width: 140, willChange: "transform, left, top" }}
          >
            <div
              data-card-inner
              className="flicker-anim flex flex-col items-center gap-2 rounded-xl border px-4 py-4 text-center"
              style={{
                ["--icon-color" as string]: "#333",
                ["--text-color" as string]: "#444",
                ["--border-color" as string]: "rgba(255,255,255,0.03)",
                ["--bg-color" as string]: "rgba(255,255,255,0.02)",
                ["--blur" as string]: "10px",
                background: "var(--bg-color)",
                borderColor: "var(--border-color)",
                backdropFilter: "blur(var(--blur))",
                WebkitBackdropFilter: "blur(var(--blur))",
                animationDuration: `${FLICKER_DURATIONS[i]}s`,
                animationDelay: `${(i * 0.37) % 2}s`,
              }}
            >
              <ch.Icon size={24} style={{ color: "var(--icon-color)" }} />
              <span className="text-[0.7rem] font-600 uppercase tracking-wider" style={{ color: "var(--text-color)" }}>
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
            className="absolute z-[6] pointer-events-none"
            style={{ left: `${w.x}%`, top: `${w.y}%`, opacity: 0 }}
          >
            <span className="text-[0.55rem] font-700 uppercase tracking-wider text-[#E71840]">{w.text}</span>
          </div>
        ))}

        {/* ── DOLLAR SIGNS ── */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={`d-${i}`}
            ref={(el) => { dollarRefs.current[i] = el; }}
            className="absolute z-[3] select-none pointer-events-none font-[family-name:var(--font-oswald)] font-700"
            style={{
              left: `${8 + ((i * 37 + 13) % 82)}%`,
              fontSize: 14,
              color: "rgba(231,24,64,0.15)",
              willChange: "top",
            }}
          >
            $
          </span>
        ))}

        {/* ── MONEY FLOW (green $ along pipeline paths, 72%+) ── */}
        <div ref={moneyFlowRef} className="absolute inset-0 z-[7] pointer-events-none" style={{ opacity: 0 }}>
          {Array.from({ length: 15 }).map((_, i) => {
            // Distribute money along three columns
            const col = i % 3;
            const xBase = col === 0 ? 20 : col === 1 ? 50 : 80;
            const xOffset = (Math.sin(i * 2.5) * 2);
            const speed = 3 + (i % 4);
            const delay = (i * 0.4) % 3;
            return (
              <span
                key={`m-${i}`}
                className="absolute font-[family-name:var(--font-oswald)] font-700"
                style={{
                  left: `${xBase + xOffset}%`,
                  fontSize: 14,
                  color: "rgba(34,197,94,0.2)",
                  animation: `moneyUp ${speed}s linear ${delay}s infinite`,
                  transform: "translateX(-50%)",
                }}
              >
                $
              </span>
            );
          })}
        </div>

        {/* ── SPARKLES (Phase 2) ── */}
        <div ref={sparklesRef} className="absolute inset-0 z-[6] pointer-events-none" style={{ opacity: 0 }}>
          {ORDER.map((pos, i) => (
            <span
              key={`sp-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${pos.x}%`, top: `${pos.y - 6}%`,
                width: 3, height: 3,
                background: "#E71840",
                boxShadow: "0 0 6px rgba(231,24,64,0.4)",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
          {/* Flowing dots along connection lines */}
          {[20, 50, 80].map((x, ci) => (
            <span
              key={`dot-${ci}`}
              className="absolute rounded-full"
              style={{
                left: `${x}%`, width: 4, height: 4,
                background: "#E71840",
                boxShadow: "0 0 8px rgba(231,24,64,0.5)",
                animation: `flowDot ${3 + ci * 0.5}s ease-in-out ${ci * 0.4}s infinite`,
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>

        {/* ── SCROLL PROGRESS TRACK ── */}
        <div className="absolute right-5 top-[12%] bottom-[12%] z-20 hidden lg:flex flex-col items-center">
          <div className="relative h-full w-[2px] bg-[#222] rounded-full">
            {TRACK_MARKS.map((mark) => (
              <div key={mark.label} className="absolute flex items-center gap-2"
                style={{ top: `${mark.at * 100}%`, right: 8, transform: "translateY(-50%)" }}>
                <span className="text-[0.5rem] font-600 uppercase tracking-wider text-[#444] whitespace-nowrap">{mark.label}</span>
                <span className="block h-[1px] w-2 bg-[#444]" />
              </div>
            ))}
            <div ref={dotRef} className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#E71840]"
              style={{ top: "0%", transform: "translate(-50%, -50%)", boxShadow: "0 0 8px rgba(231,24,64,0.5)", willChange: "top" }} />
          </div>
        </div>

        {/* ── KEYFRAME STYLES ── */}
        <style jsx>{`
          .flicker-anim {
            animation-name: flicker;
            animation-timing-function: steps(1);
            animation-iteration-count: infinite;
          }
          @keyframes flicker {
            0% { opacity: 0.4; }
            5% { opacity: 0.6; }
            10% { opacity: 0.3; }
            15% { opacity: 0.5; }
            20% { opacity: 0.35; }
            50% { opacity: 0.55; }
            55% { opacity: 0.3; }
            100% { opacity: 0.4; }
          }
          @keyframes moneyUp {
            0% { top: 85%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 10%; opacity: 0; }
          }
          @keyframes flowDot {
            0% { top: 28%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 72%; opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  );
}
