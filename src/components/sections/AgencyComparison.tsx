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
  const introTextRef = useRef<HTMLDivElement>(null);
  const imagineRef = useRef<HTMLDivElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
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
    if (typeof window !== "undefined" && window.innerWidth < 768) return; // Mobile uses CSS-only static version
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const st = {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      };

      // Pin the viewport
      ScrollTrigger.create({ ...st, pin });

      /* ── PHASE 1: "OTHER AGENCIES" (visible 0-3%, fades 3-7%) ──── */
      if (introTextRef.current) {
        gsap.fromTo(introTextRef.current,
          { opacity: 1, scale: 1, filter: "blur(0px)" },
          {
            opacity: 0, scale: 0.6, filter: "blur(6px)",
            scrollTrigger: { ...st, start: "3% top", end: "7% top" },
            ease: "power1.inOut",
          }
        );
      }

      /* ── PHASE 2: "Now imagine this." (crossfades in at 5%, out at 12%) ── */
      if (imagineRef.current) {
        gsap.set(imagineRef.current, { opacity: 0, scale: 0.9, y: 20 });
        // Fade in 5-9% (overlaps with phase 1 exit for crossfade)
        gsap.to(imagineRef.current, {
          opacity: 1, scale: 1, y: 0,
          scrollTrigger: { ...st, start: "5% top", end: "9% top" },
          ease: "power1.out",
        });
        // Fade out 12-16%
        gsap.to(imagineRef.current, {
          opacity: 0, scale: 1.05, y: -20, filter: "blur(4px)",
          scrollTrigger: { ...st, start: "12% top", end: "16% top" },
          ease: "power1.inOut",
        });
      }

      /* ── PHASE 3: BOXES FADE IN (13-18%, crossfades with phase 2 exit) ── */
      boxRefs.current.forEach((box, i) => {
        if (!box) return;
        const c = CHAOS[i];
        const o = ORDER[i];

        gsap.set(box, {
          xPercent: -50, yPercent: -50,
          left: `${c.x}%`, top: `${c.y}%`,
          rotation: c.r, scale: 0.8, opacity: 0,
        });

        // 13-18%: gentle scale in with stagger (each box ~0.3% apart)
        const popStart = 13 + i * 0.3;
        const popEnd = popStart + 4;
        gsap.to(box, {
          scale: 1, opacity: 1,
          scrollTrigger: { ...st, start: `${popStart}% top`, end: `${popEnd}% top` },
          ease: "power2.out",
        });

        // 22-50%: move to organized positions
        gsap.to(box, {
          left: `${o.x}%`, top: `${o.y}%`, rotation: 0,
          scrollTrigger: { ...st, start: "22% top", end: "50% top" },
          ease: "power2.inOut",
        });

        const inner = box.querySelector("[data-card-inner]") as HTMLElement;
        if (inner) {
          gsap.to(inner, {
            opacity: 1,
            scrollTrigger: { ...st, start: "22% top", end: "40% top" },
            ease: "power2.inOut",
          });
          gsap.to(inner, {
            "--icon-color": "#E71840",
            "--text-color": "#ffffff",
            "--border-color": "rgba(231,24,64,0.25)",
            "--bg-color": "rgba(231,24,64,0.06)",
            "--blur": "40px",
            scrollTrigger: { ...st, start: "22% top", end: "50% top" },
            ease: "power2.inOut",
          });
          ScrollTrigger.create({
            ...st, start: "30% top", end: "30% top",
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
          scrollTrigger: { ...st, start: "14% top", end: "20% top" },
          ease: "none",
        });
        gsap.to(el, {
          opacity: 0,
          scrollTrigger: { ...st, start: "22% top", end: "32% top" },
          ease: "none",
        });
      });

      /* ── BROKEN LINES ────────────────────────────────────────────── */
      if (brokenLineRef.current) {
        gsap.to(brokenLineRef.current, {
          opacity: 0,
          scrollTrigger: { ...st, start: "22% top", end: "32% top" },
          ease: "none",
        });
      }

      /* ── HEADING: THE NIXAR WAY (fades in at 60-65% with scale) ── */
      if (heading2Ref.current) {
        gsap.fromTo(heading2Ref.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: { ...st, start: "60% top", end: "65% top" },
            ease: "power2.out",
          }
        );
      }

      /* ── KEEP SCROLLING PROMPT ───────────────────────────────────── */
      if (keepScrollRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { ...st, start: "15% top", end: "25% top" },
        });
        tl.fromTo(keepScrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        tl.to(keepScrollRef.current, { opacity: 0, duration: 0.3 }, 0.7);
      }

      /* ── "NOW IMAGINE THIS." FLASH (removed. replaced by Phase 2 text) ── */

      /* ── STRATEGY NODE ───────────────────────────────────────────── */
      if (strategyRef.current) {
        gsap.fromTo(strategyRef.current, { opacity: 0, scale: 0.8 }, {
          opacity: 1, scale: 1,
          scrollTrigger: { ...st, start: "48% top", end: "55% top" },
          ease: "power2.out",
        });
      }

      /* ── GROWTH NODE ─────────────────────────────────────────────── */
      if (growthRef.current) {
        gsap.fromTo(growthRef.current, { opacity: 0, scale: 0.8 }, {
          opacity: 1, scale: 1,
          scrollTrigger: { ...st, start: "52% top", end: "58% top" },
          ease: "power2.out",
        });
      }

      /* ── CONNECTION LINES (draw via dashoffset, 55-65%) ──────────── */
      if (connLineRef.current) {
        const lines = connLineRef.current.querySelectorAll<SVGLineElement>("line");
        lines.forEach((line) => {
          const dx = parseFloat(line.getAttribute("x2") || "0") - parseFloat(line.getAttribute("x1") || "0");
          const dy = parseFloat(line.getAttribute("y2") || "0") - parseFloat(line.getAttribute("y1") || "0");
          const len = Math.sqrt(dx * dx + dy * dy) * 15;
          const group = Number(line.dataset.group);
          const startPct = 55 + group * 3;
          const endPct = startPct + 4;

          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
          gsap.to(line, {
            strokeDashoffset: 0, opacity: 0.7,
            scrollTrigger: { ...st, start: `${startPct}% top`, end: `${endPct}% top` },
            ease: "power2.inOut",
          });
        });
      }

      /* ── RED PULSE at 65-70% ─────────────────────────────────────── */
      if (pulseRef1.current) {
        gsap.set(pulseRef1.current, { scale: 0.5, opacity: 0 });
        const pulseTl = gsap.timeline({
          scrollTrigger: { ...st, start: "65% top", end: "69% top" },
        });
        pulseTl.to(pulseRef1.current, { scale: 5, opacity: 0.4, duration: 0.3, ease: "power2.out" });
        pulseTl.to(pulseRef1.current, { opacity: 0, duration: 0.7, ease: "none" }, 0.3);
      }
      if (pulseRef2.current) {
        gsap.set(pulseRef2.current, { scale: 0.5, opacity: 0 });
        const pulseTl2 = gsap.timeline({
          scrollTrigger: { ...st, start: "66% top", end: "70% top" },
        });
        pulseTl2.to(pulseRef2.current, { scale: 5, opacity: 0.4, duration: 0.3, ease: "power2.out" });
        pulseTl2.to(pulseRef2.current, { opacity: 0, duration: 0.7, ease: "none" }, 0.3);
      }

      // Flash all connection lines brighter at 66%
      if (connLineRef.current) {
        const allLines = connLineRef.current.querySelectorAll<SVGLineElement>("line");
        allLines.forEach((line) => {
          const flashTl = gsap.timeline({
            scrollTrigger: { ...st, start: "66% top", end: "70% top" },
          });
          flashTl.to(line, { opacity: 1, duration: 0.3 });
          flashTl.to(line, { opacity: 0.7, duration: 0.7 }, 0.3);
        });
      }

      /* ── COLUMN LABELS ───────────────────────────────────────────── */
      if (colLabelsRef.current) {
        gsap.fromTo(colLabelsRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...st, start: "70% top", end: "76% top" },
          ease: "none",
        });
      }

      /* ── STATS LINE ──────────────────────────────────────────────── */
      if (statsRef.current) {
        gsap.fromTo(statsRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...st, start: "90% top", end: "96% top" },
          ease: "none",
        });
      }

      /* ── DOLLAR SIGNS (chaos: fall down, order: flow up green) ──── */
      dollarRefs.current.forEach((el, i) => {
        if (!el) return;
        const startY = 20 + (i * 4) % 40;
        gsap.set(el, { top: `${startY}%`, opacity: 0.15 });

        // Drift down 20-45%
        gsap.to(el, {
          top: `${startY + 35}%`,
          scrollTrigger: { ...st, start: "20% top", end: "45% top" },
          ease: "none",
        });
        // Slow, reverse direction 45-65%
        gsap.to(el, {
          top: `${startY + 10}%`,
          color: "rgba(34,197,94,0.35)",
          opacity: 0.3,
          scrollTrigger: { ...st, start: "45% top", end: "65% top" },
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

      /* ── MONEY FLOW (mixed $ + bills along paths, starts at 70%) ── */
      if (moneyFlowRef.current) {
        gsap.fromTo(moneyFlowRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...st, start: "70% top", end: "76% top" },
          ease: "none",
        });
      }

      /* ── SPARKLES (Phase 2 energy) ───────────────────────────────── */
      if (sparklesRef.current) {
        gsap.fromTo(sparklesRef.current, { opacity: 0 }, {
          opacity: 1,
          scrollTrigger: { ...st, start: "72% top", end: "82% top" },
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
  const MobileStatic = (
    <section className="block md:hidden relative py-16 px-6" style={{ background: '#0A0A0A' }}>
      <div className="text-center mb-10">
        <p className="text-base uppercase tracking-widest mb-3" style={{ color: '#E71840' }}>Our Approach</p>
        <h2 className="font-[family-name:var(--font-oswald)] font-700 text-2xl text-white uppercase">
          THE NIXAR <span style={{ color: '#E71840' }}>WAY.</span>
        </h2>
        <p className="text-gray-400 mt-3 text-base max-w-xs mx-auto">
          Every channel connected. Every dollar tracked. One unified strategy driving growth.
        </p>
      </div>
      <div className="flex justify-center mb-6">
        <div className="text-center px-8 py-4 rounded-xl" style={{ background: 'rgba(231,24,64,0.1)', border: '1px solid rgba(231,24,64,0.25)' }}>
          <p className="font-[family-name:var(--font-oswald)] font-700 text-white text-base uppercase tracking-wider">STRATEGY</p>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <div style={{ width: '2px', height: '32px', background: 'rgba(231,24,64,0.3)' }} />
      </div>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[
          { label: 'Attract', items: ['Branding', 'Content', 'SEO'] },
          { label: 'Engage', items: ['Social', 'Website', 'Email'] },
          { label: 'Convert', items: ['Paid Ads', 'Analytics', 'AI Agents'] },
        ].map((col) => (
          <div key={col.label} className="text-center">
            <p className="text-[16px] uppercase tracking-wider mb-2 font-bold" style={{ color: '#E71840' }}>{col.label}</p>
            <div className="space-y-2">
              {col.items.map((item) => (
                <div key={item} className="py-2.5 px-1 rounded-lg text-[16px] text-white font-medium" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-6">
        <div style={{ width: '2px', height: '32px', background: 'rgba(34,197,94,0.3)' }} />
      </div>
      <div className="flex justify-center">
        <div className="text-center px-8 py-4 rounded-xl" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
          <p className="font-[family-name:var(--font-oswald)] font-700 text-white text-base uppercase tracking-wider">GROWTH</p>
        </div>
      </div>
    </section>
  );

  if (reducedMotion) {
    return (
      <>
        {MobileStatic}
        <section className="hidden md:block relative bg-[#0A0A0A] py-24 px-5 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,5vw,3.5rem)] font-700 uppercase leading-none mb-16">
            <span className="text-white">The NIXAR </span>
            <span className="text-[#E71840]">Way.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {CHANNELS.map((ch) => (
              <div key={ch.id} className="flex flex-col items-center gap-2 rounded-xl border border-[rgba(231,24,64,0.25)] bg-[rgba(231,24,64,0.06)] p-5 backdrop-blur-[40px]">
                <ch.Icon size={24} color="#E71840" />
                <span className="text-[1rem] font-600 uppercase tracking-wider text-white">{ch.label}</span>
              </div>
            ))}
          </div>
        </div>
        </section>
      </>
    );
  }

  return (
    <>
      {MobileStatic}
      <section ref={sectionRef} className="hidden md:block relative" style={{ height: "500vh" }}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">

        {/* ── PHASE 1: OTHER AGENCIES (bold, centered, fast exit) ── */}
        <div
          ref={introTextRef}
          className="absolute z-30 pointer-events-none"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', willChange: 'transform, opacity, filter' }}
        >
          <div className="font-[family-name:var(--font-oswald)] font-700 uppercase text-white" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1, letterSpacing: '0.05em' }}>OTHER</div>
          <div className="font-[family-name:var(--font-oswald)] font-700 uppercase text-[#E71840]" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1, letterSpacing: '0.05em' }}>AGENCIES</div>
        </div>

        {/* ── PHASE 2: "Now imagine this." (dreamy, centered) ── */}
        <div
          ref={imagineRef}
          className="absolute z-30 pointer-events-none"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            display: 'flex', alignItems: 'baseline', gap: '0.4em',
            whiteSpace: 'nowrap', opacity: 0, willChange: 'transform, opacity',
          }}
        >
          <span style={{
            fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: 'rgba(255,255,255,0.5)',
            textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.05)',
            filter: 'blur(0.5px)',
            letterSpacing: '0.05em',
          }}>Now</span>
          <span style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            color: '#E71840',
            lineHeight: 1,
            padding: '0 0.1em',
            overflow: 'visible',
          }}>imagine</span>
          <span style={{
            fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: 'rgba(255,255,255,0.5)',
            textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.05)',
            filter: 'blur(0.5px)',
            letterSpacing: '0.05em',
          }}>this.</span>
        </div>

        {/* ── HEADING 2: THE NIXAR WAY (bold, stable, confident) ── */}
        <h2
          ref={heading2Ref}
          className="absolute top-6 left-6 z-30 font-[family-name:var(--font-oswald)] text-[clamp(1.2rem,2.5vw,1.6rem)] font-700 uppercase lg:top-8 lg:left-10"
          style={{ opacity: 0, letterSpacing: '0.05em', willChange: 'transform, opacity' }}
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
          <span className="text-[1rem] font-700 uppercase tracking-[0.2em] text-[#E71840]">Keep Scrolling</span>
          <ChevronDown size={16} color="#E71840" className="animate-bounce" />
        </div>

        {/* (Flash text replaced by Phase 2 "Now imagine this." above) */}

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
          <p ref={statsRef} className="mt-3 text-[1rem] font-500 text-[#666]" style={{ opacity: 0 }}>
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
              className="absolute font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-[0.2em] text-[#E71840]"
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
                ["--icon-color" as string]: "#555",
                ["--text-color" as string]: "#888",
                ["--border-color" as string]: "rgba(255,255,255,0.1)",
                ["--bg-color" as string]: "rgba(255,255,255,0.04)",
                ["--blur" as string]: "15px",
                background: "var(--bg-color)",
                borderColor: "var(--border-color)",
                backdropFilter: "blur(var(--blur))",
                WebkitBackdropFilter: "blur(var(--blur))",
                animationDuration: `${FLICKER_DURATIONS[i]}s`,
                animationDelay: `${(i * 0.37) % 2}s`,
              }}
            >
              <ch.Icon size={24} style={{ color: "var(--icon-color)" }} />
              <span className="text-[1rem] font-600 uppercase tracking-wider" style={{ color: "var(--text-color)" }}>
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

        {/* ── MONEY FLOW (mixed $ text + paper bill SVGs, flows upward) ── */}
        <div ref={moneyFlowRef} className="absolute inset-0 z-[7] pointer-events-none" style={{ opacity: 0 }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const col = i % 3;
            const xBase = col === 0 ? 20 : col === 1 ? 50 : 80;
            const xDrift = Math.sin(i * 1.7) * 5;
            const speed = 3 + (i % 5);
            const delay = (i * 0.35) % 4;
            const isBill = i % 3 === 0;
            const fontSize = 14 + (i % 4) * 2;

            if (isBill) {
              return (
                <span
                  key={`m-${i}`}
                  className="absolute"
                  style={{
                    left: `${xBase + xDrift}%`,
                    animation: `moneyUp ${speed}s linear ${delay}s infinite`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <svg width="24" height="14" viewBox="0 0 24 14">
                    <rect x="0" y="0" width="24" height="14" rx="2" fill="#22C55E" fillOpacity="0.6" />
                    <circle cx="12" cy="7" r="4" fill="none" stroke="#166534" strokeWidth="1" />
                    <text x="12" y="9.5" textAnchor="middle" fontSize="7" fill="#166534" fontWeight="bold">$</text>
                  </svg>
                </span>
              );
            }
            return (
              <span
                key={`m-${i}`}
                className="absolute font-[family-name:var(--font-oswald)] font-700"
                style={{
                  left: `${xBase + xDrift}%`,
                  fontSize,
                  color: "rgba(34,197,94,0.25)",
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
            0% { opacity: 0.6; }
            5% { opacity: 0.8; }
            10% { opacity: 0.5; }
            15% { opacity: 0.7; }
            20% { opacity: 0.55; }
            50% { opacity: 0.75; }
            55% { opacity: 0.5; }
            100% { opacity: 0.6; }
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
    </>
  );
}
