"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Search,
  Share2,
  Target,
  Monitor,
  Mail,
  PenTool,
  Palette,
  BarChart3,
  Brain,
  TrendingUp,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */
// Attempt power2 in-out easing for 0-1 input
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(
  r1: number, g1: number, b1: number, a1: number,
  r2: number, g2: number, b2: number, a2: number,
  t: number
): string {
  return `rgba(${Math.round(lerp(r1, r2, t))},${Math.round(lerp(g1, g2, t))},${Math.round(lerp(b1, b2, t))},${lerp(a1, a2, t).toFixed(3)})`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHANNEL DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const CHANNELS = [
  { id: "seo", label: "SEO", Icon: Search, branch: "attract", row: 2 },
  { id: "social", label: "Social Media", Icon: Share2, branch: "engage", row: 0 },
  { id: "ads", label: "Paid Ads", Icon: Target, branch: "convert", row: 0 },
  { id: "website", label: "Website", Icon: Monitor, branch: "engage", row: 1 },
  { id: "email", label: "Email", Icon: Mail, branch: "engage", row: 2 },
  { id: "content", label: "Content", Icon: PenTool, branch: "attract", row: 1 },
  { id: "branding", label: "Branding", Icon: Palette, branch: "attract", row: 0 },
  { id: "analytics", label: "Analytics", Icon: BarChart3, branch: "convert", row: 1 },
] as const;

/* Chaos positions — scattered randomly across the viewport area */
const CHAOS_POSITIONS = [
  { x: 8, y: 15, r: -12 },
  { x: 65, y: 10, r: 10 },
  { x: 78, y: 55, r: -8 },
  { x: 15, y: 60, r: 14 },
  { x: 42, y: 72, r: -6 },
  { x: 88, y: 32, r: 11 },
  { x: 30, y: 38, r: -15 },
  { x: 55, y: 48, r: 7 },
];

/* Error labels — more appear as chaos intensifies */
const CHAOS_ERRORS: Record<string, { label: string; threshold: number }> = {
  seo: { label: "NO STRATEGY", threshold: 0 },
  ads: { label: "WASTED BUDGET", threshold: 0 },
  social: { label: "INCONSISTENT", threshold: 0 },
  email: { label: "IGNORED LEADS", threshold: 0.15 },
  website: { label: "OUTDATED", threshold: 0.2 },
};

/* Order positions — structured pipeline grid (% based) */
const ORDER_POSITIONS: Record<string, { x: number; y: number }> = {
  branding: { x: 15, y: 32 },
  content: { x: 15, y: 50 },
  seo: { x: 15, y: 68 },
  social: { x: 46, y: 32 },
  website: { x: 46, y: 50 },
  email: { x: 46, y: 68 },
  ads: { x: 77, y: 32 },
  analytics: { x: 77, y: 50 },
};

/* Broken line coords for chaos phase */
const BROKEN_LINES = [
  [15, 22, 60, 17],
  [70, 60, 20, 65],
  [85, 37, 45, 52],
  [35, 42, 80, 57],
  [22, 75, 55, 15],
  [68, 25, 30, 70],
];

/* Connection lines for order phase — [x1%, y1%, x2%, y2%] */
const ORDER_CONNECTIONS = [
  // Strategy to branch tops
  { from: [50, 20], to: [15, 30], row: -1 },
  { from: [50, 20], to: [46, 30], row: -1 },
  { from: [50, 20], to: [77, 30], row: -1 },
  // Branch verticals (attract)
  { from: [15, 35], to: [15, 48], row: 0 },
  { from: [15, 53], to: [15, 66], row: 1 },
  // Branch verticals (engage)
  { from: [46, 35], to: [46, 48], row: 0 },
  { from: [46, 53], to: [46, 66], row: 1 },
  // Branch verticals (convert)
  { from: [77, 35], to: [77, 48], row: 0 },
  // Branches to results
  { from: [15, 71], to: [50, 85], row: 2 },
  { from: [46, 71], to: [50, 85], row: 2 },
  { from: [77, 53], to: [50, 85], row: 2 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL PROGRESS TRACK MARKS
   ═══════════════════════════════════════════════════════════════════════════ */
const TRACK_MARKS = [
  { at: 0.3, label: "CHAOS" },
  { at: 0.5, label: "SHIFT" },
  { at: 0.7, label: "ORDER" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function TheDifference() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // GSAP ScrollTrigger pinning + progress
  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current!,
      scrub: 1.5,
      onUpdate: (self) => setProgress(self.progress),
    });
    triggerRef.current = trigger;

    return () => {
      trigger.kill();
      triggerRef.current = null;
    };
  }, [reducedMotion]);

  // Magnetic snap: if user stops scrolling in 40-60% zone, nudge them out
  useEffect(() => {
    if (reducedMotion) return;
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);

    if (progress > 0.4 && progress < 0.6) {
      snapTimerRef.current = setTimeout(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionHeight = rect.height;
        const targetProgress = progress < 0.5 ? 0.35 : 0.65;
        const targetScroll = sectionTop + sectionHeight * targetProgress;
        gsap.to(window, {
          scrollTo: { y: targetScroll },
          duration: 1,
          ease: "power2.inOut",
        });
      }, 1200);
    }

    return () => {
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
  }, [progress, reducedMotion]);

  /* ─── Derived animation values ─────────────────────────────────────── */

  // Chaos intensity: ramps from 0→1 over 0-30% scroll
  const chaosIntensity = clamp01(progress / 0.3);

  // Transition: 0→1 over 45-65% (the main move)
  const rawTransition = clamp01((progress - 0.45) / 0.2);
  const transitionAmount = easeInOut(rawTransition);

  // Rotation unwinds first: 0→1 over 40-50%
  const rotationDone = easeInOut(clamp01((progress - 0.4) / 0.1));

  // "Keep scrolling" prompt: visible 30-35%
  const keepScrolling = progress > 0.28 && progress < 0.37;
  const keepScrollingOpacity = keepScrolling
    ? Math.sin(clamp01((progress - 0.28) / 0.09) * Math.PI)
    : 0;

  // "Now imagine this" flash: visible 35-45%
  const flashOpacity =
    progress > 0.35 && progress < 0.45
      ? Math.sin(clamp01((progress - 0.35) / 0.1) * Math.PI)
      : 0;

  // Red sweep line: 38-48%
  const sweepProgress = clamp01((progress - 0.38) / 0.1);

  // Phase 2 energy: ramps from 0→1 over 65-100%
  const orderEnergy = clamp01((progress - 0.65) / 0.35);

  // Phase labels cross-fade
  const phase1LabelOpacity = clamp01(1 - (progress - 0.35) / 0.1);
  const phase2LabelOpacity = clamp01((progress - 0.45) / 0.1);

  // Dollar transition: slowing (42-50%), paused (50-52%), reversing (52-60%)
  const dollarPhase = progress < 0.42 ? "fall" : progress < 0.52 ? "pause" : "rise";
  const dollarSpeed =
    dollarPhase === "fall"
      ? 1 + chaosIntensity * 0.5
      : dollarPhase === "pause"
        ? 0
        : 0.3 + orderEnergy * 0.7;

  // Connection line draw progress: 0→1 over 45-65%
  const lineDrawProgress = easeInOut(clamp01((progress - 0.45) / 0.2));

  /* ─── Card positioning ─────────────────────────────────────────────── */
  const getCardStyle = useCallback(
    (index: number, id: string, row: number) => {
      const chaos = CHAOS_POSITIONS[index];
      const order = ORDER_POSITIONS[id];

      // Stagger: row -1 (strategy) moves first, then row 0, 1, 2
      const rowDelay = Math.max(0, row) * 0.08; // 8% scroll delay per row
      const cardTransition = easeInOut(clamp01((rawTransition - rowDelay) / (1 - rowDelay * 3)));

      // Chaos drift intensifies with scroll
      const driftX = Math.sin(Date.now() / 2000 + index * 1.5) * (3 + chaosIntensity * 5) * (1 - cardTransition);
      const driftY = Math.cos(Date.now() / 2500 + index * 2) * (2 + chaosIntensity * 4) * (1 - cardTransition);

      // Rotation: unwind first, then position moves
      const chaosR = chaos.r * (1 + chaosIntensity * 0.3); // rotations intensify
      const r = chaosR * (1 - rotationDone);

      const x = lerp(chaos.x, order.x, cardTransition) + driftX;
      const y = lerp(chaos.y, order.y, cardTransition) + driftY;

      return {
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${r}deg)`,
      };
    },
    [rawTransition, rotationDone, chaosIntensity]
  );

  // Color interpolation for cards
  const cardIconColor = lerpColor(85, 85, 85, 1, 231, 24, 64, 1, transitionAmount);
  const cardTextColor = lerpColor(102, 102, 102, 1, 255, 255, 255, 1, transitionAmount);
  const cardBg = lerpColor(255, 255, 255, 0.03, 231, 24, 64, 0.06, transitionAmount);
  const cardBorder = lerpColor(255, 255, 255, 0.08, 231, 24, 64, 0.25, transitionAmount);
  const cardGlow = transitionAmount > 0.5
    ? `inset 0 0 ${15 + orderEnergy * 10}px rgba(231,24,64,${0.05 + orderEnergy * 0.05})`
    : "none";

  return (
    <section ref={sectionRef} className="relative" style={{ height: "400vh" }}>
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        {/* ── PHASE LABELS (top-left editorial) ── */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none lg:top-8 lg:left-10">
          <p
            className="font-[family-name:var(--font-oswald)] text-[0.7rem] font-700 uppercase tracking-[0.2em] text-[#666]"
            style={{ opacity: phase1LabelOpacity }}
          >
            01 — Other Agencies
          </p>
          <p
            className="font-[family-name:var(--font-oswald)] text-[0.7rem] font-700 uppercase tracking-[0.2em] text-[#E71840] absolute top-0 left-0"
            style={{ opacity: phase2LabelOpacity }}
          >
            02 — The NIXAR Way
          </p>
        </div>

        {/* ── HEADING ── */}
        <div className="absolute top-12 left-0 right-0 z-20 text-center px-5 lg:top-16">
          <h2
            className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,5vw,3.5rem)] font-700 uppercase relative inline-block"
            style={{ color: lerpColor(102, 102, 102, 1, 255, 255, 255, 1, transitionAmount) }}
          >
            {transitionAmount < 0.5 ? (
              <>
                Other Agencies
                <span
                  className="absolute left-0 top-1/2 h-[2px] bg-[#E71840]"
                  style={{ width: `${Math.min(100, progress * 330)}%` }}
                />
              </>
            ) : (
              <>
                <span className="text-white">The NIXAR </span>
                <span className="text-[#E71840]">Way.</span>
              </>
            )}
          </h2>
        </div>

        {/* ── BOTTOM PHASE DESCRIPTORS ── */}
        <div className="absolute bottom-10 left-0 right-0 z-20 text-center pointer-events-none">
          <p
            className="text-[0.85rem] italic text-[#666]"
            style={{ opacity: phase1LabelOpacity * (progress < 0.3 ? 1 : 0) }}
          >
            Fragmented. Disconnected. Expensive.
          </p>
          <p
            className="text-[0.85rem] italic text-[#999] absolute inset-0 flex items-center justify-center"
            style={{ opacity: phase2LabelOpacity * (orderEnergy > 0.2 ? 1 : 0) }}
          >
            Strategic. Connected. Profitable.
          </p>
        </div>

        {/* ── KEEP SCROLLING PROMPT ── */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
          style={{ opacity: keepScrollingOpacity }}
        >
          <span className="text-[0.65rem] font-700 uppercase tracking-[0.2em] text-[#E71840]">
            Keep Scrolling
          </span>
          <ChevronDown
            size={16}
            color="#E71840"
            className="animate-bounce"
          />
        </div>

        {/* ── "NOW IMAGINE THIS." FLASH ── */}
        <div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ opacity: flashOpacity }}
        >
          <p className="font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,4vw,2.5rem)] font-700 uppercase text-[#E71840]">
            Now Imagine This.
          </p>
        </div>

        {/* ── RED SWEEP LINE ── */}
        {sweepProgress > 0 && sweepProgress < 1 && (
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-[#E71840] z-30 pointer-events-none"
            style={{
              width: `${sweepProgress * 100}%`,
              boxShadow: "0 0 20px rgba(231,24,64,0.5)",
            }}
          />
        )}

        {/* ── STRATEGY NODE ── */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{
            left: "50%",
            top: "15%",
            transform: "translate(-50%, -50%)",
            opacity: easeInOut(clamp01((rawTransition) / 0.3)),
          }}
        >
          <div
            className="flex items-center gap-3 rounded-xl border px-6 py-3"
            style={{
              background: `rgba(231,24,64,${0.04 + orderEnergy * 0.06})`,
              borderColor: `rgba(231,24,64,${0.2 + orderEnergy * 0.15})`,
              boxShadow: `0 0 ${20 + orderEnergy * 25}px rgba(231,24,64,${0.1 + orderEnergy * 0.1}), inset 0 0 ${10 + orderEnergy * 15}px rgba(231,24,64,${0.03 + orderEnergy * 0.04})`,
            }}
          >
            <Brain size={24} color="#E71840" />
            <span className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-wider text-white">
              Strategy
            </span>
          </div>
        </div>

        {/* ── BRANCH LABELS ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[
            { label: "ATTRACT", x: 15 },
            { label: "ENGAGE", x: 46 },
            { label: "CONVERT", x: 77 },
          ].map((b) => (
            <span
              key={b.label}
              className="absolute font-[family-name:var(--font-oswald)] text-[0.6rem] font-700 uppercase tracking-[0.2em]"
              style={{
                left: `${b.x}%`,
                top: "23%",
                transform: "translateX(-50%)",
                opacity: easeInOut(clamp01((transitionAmount - 0.4) / 0.3)),
                color: `rgba(231,24,64,${0.4 + orderEnergy * 0.3})`,
              }}
            >
              {b.label}
            </span>
          ))}
        </div>

        {/* ── CONNECTION LINES (order phase — draw themselves) ── */}
        <svg className="absolute inset-0 z-[5] h-full w-full pointer-events-none">
          {ORDER_CONNECTIONS.map((conn, i) => {
            // Stagger line drawing by row
            const rowDelay = Math.max(0, conn.row + 1) * 0.15;
            const thisLineDraw = easeInOut(clamp01((lineDrawProgress - rowDelay) / (1 - rowDelay)));
            const lineLen = 200; // approximate; dashoffset hides the rest
            const pulseOpacity = 0.3 + orderEnergy * 0.4;

            return (
              <line
                key={`conn-${i}`}
                x1={`${conn.from[0]}%`}
                y1={`${conn.from[1]}%`}
                x2={`${conn.to[0]}%`}
                y2={`${conn.to[1]}%`}
                stroke="#E71840"
                strokeWidth="1.5"
                strokeDasharray={lineLen}
                strokeDashoffset={lineLen * (1 - thisLineDraw)}
                opacity={thisLineDraw * pulseOpacity}
              />
            );
          })}
        </svg>

        {/* ── BROKEN LINES (chaos phase — dash gap shrinks during transition) ── */}
        <svg
          className="absolute inset-0 z-[4] h-full w-full pointer-events-none"
          style={{ opacity: 1 - transitionAmount }}
        >
          {BROKEN_LINES.map(([x1, y1, x2, y2], i) => {
            const flashIntensity = chaosIntensity > 0.5
              ? 0.2 + Math.sin(Date.now() / 500 + i * 2) * 0.15 * chaosIntensity
              : 0.2;
            return (
              <line
                key={`broken-${i}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="#333"
                strokeWidth="1"
                strokeDasharray={`6 ${8 - transitionAmount * 6}`}
                opacity={flashIntensity + chaosIntensity * 0.15}
              />
            );
          })}
        </svg>

        {/* ── WARNING TRIANGLES (chaos phase) ── */}
        {transitionAmount < 0.3 && (
          <div className="absolute inset-0 z-[6] pointer-events-none">
            {[
              { x: 25, y: 25 },
              { x: 72, y: 42 },
              { x: 50, y: 18 },
              { x: 60, y: 68 },
              { x: 18, y: 45 },
            ].map((pos, i) => (
              <span
                key={`warn-${i}`}
                className="absolute text-[#E71840]"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  opacity: chaosIntensity > (i * 0.15) ? 0.15 + chaosIntensity * 0.15 : 0,
                  fontSize: 12 + i * 2,
                }}
              >
                <AlertTriangle size={12 + i * 2} />
              </span>
            ))}
          </div>
        )}

        {/* ── CHANNEL CARDS ── */}
        {CHANNELS.map((ch, i) => {
          const style = getCardStyle(i, ch.id, ch.row);
          const errorInfo = CHAOS_ERRORS[ch.id];
          const showError =
            errorInfo &&
            transitionAmount < 0.3 &&
            chaosIntensity > errorInfo.threshold;

          return (
            <div
              key={ch.id}
              className="absolute z-10"
              style={{ ...style, width: 120 }}
            >
              <div
                className="flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-center backdrop-blur-sm"
                style={{
                  background: cardBg,
                  borderColor: cardBorder,
                  boxShadow: cardGlow,
                }}
              >
                <ch.Icon size={22} style={{ color: cardIconColor }} />
                <span
                  className="text-[0.65rem] font-600 uppercase tracking-wider"
                  style={{ color: cardTextColor }}
                >
                  {ch.label}
                </span>
              </div>

              {/* Error labels in chaos mode */}
              {showError && errorInfo && (
                <div
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 whitespace-nowrap"
                  style={{ opacity: (1 - transitionAmount) * Math.min(1, chaosIntensity * 2) }}
                >
                  <AlertTriangle size={10} color="#E71840" />
                  <span className="text-[0.5rem] font-600 uppercase text-[#E71840]/70">
                    {errorInfo.label}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* ── DOLLAR SIGNS ── */}
        {Array.from({ length: 18 }).map((_, i) => {
          const baseX = 10 + ((i * 37 + 13) % 80);
          const size = 10 + (i % 4) * 4;
          const delay = (i * 0.7) % 4;
          const isRising = dollarPhase === "rise";
          const isPaused = dollarPhase === "pause";
          const speed = dollarSpeed > 0 ? (3 + (i % 3)) / dollarSpeed : 0;

          return (
            <span
              key={`dollar-${i}`}
              className="absolute z-[3] select-none pointer-events-none font-[family-name:var(--font-oswald)] font-700"
              style={{
                left: `${baseX}%`,
                fontSize: size,
                color: isRising
                  ? `rgba(34,197,94,${0.3 + orderEnergy * 0.3})`
                  : `rgba(231,24,64,${0.08 + chaosIntensity * 0.08})`,
                animation:
                  reducedMotion || isPaused
                    ? "none"
                    : isRising
                      ? `dollarRise ${speed}s linear ${delay}s infinite`
                      : `dollarFall ${speed}s linear ${delay}s infinite`,
                top: isPaused ? "50%" : undefined,
                opacity: isPaused ? 0.3 : undefined,
              }}
            >
              $
            </span>
          );
        })}

        {/* ── RESULTS NODE ── */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{
            left: "50%",
            top: "88%",
            transform: "translate(-50%, -50%)",
            opacity: transitionAmount,
          }}
        >
          <div
            className="flex items-center gap-3 rounded-xl border px-6 py-3"
            style={{
              background: `rgba(34,197,94,${0.04 + orderEnergy * 0.06})`,
              borderColor: `rgba(34,197,94,${0.15 + orderEnergy * 0.15})`,
              boxShadow: `0 0 ${25 + orderEnergy * 30}px rgba(34,197,94,${0.1 + orderEnergy * 0.12}), inset 0 0 ${10 + orderEnergy * 15}px rgba(34,197,94,${0.03 + orderEnergy * 0.04})`,
            }}
          >
            <TrendingUp size={24} color="#22C55E" />
            <span className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-wider text-white">
              Growth
            </span>
          </div>
          <p className="mt-2 text-[0.6rem] font-500 text-[#666]">
            20+ Years &bull; 500+ Projects &bull; 97% Satisfaction
          </p>
        </div>

        {/* ── SPARKLES (order phase energy) ── */}
        {orderEnergy > 0.3 && (
          <div className="absolute inset-0 z-[6] pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => {
              const positions = [
                { x: 15, y: 32 }, { x: 46, y: 32 }, { x: 77, y: 32 },
                { x: 15, y: 50 }, { x: 46, y: 50 }, { x: 77, y: 50 },
                { x: 15, y: 68 }, { x: 46, y: 68 },
              ];
              const p = positions[i];
              return (
                <span
                  key={`sparkle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    left: `${p.x + Math.sin(Date.now() / 1000 + i) * 2}%`,
                    top: `${p.y - 5}%`,
                    width: 3,
                    height: 3,
                    background: "#E71840",
                    opacity: orderEnergy * 0.4 * (0.5 + Math.sin(Date.now() / 600 + i * 1.3) * 0.5),
                    boxShadow: `0 0 6px rgba(231,24,64,${orderEnergy * 0.3})`,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* ── SCROLL PROGRESS TRACK ── */}
        <div className="absolute right-5 top-[15%] bottom-[15%] z-20 hidden lg:flex flex-col items-center">
          <div className="relative h-full w-[2px] bg-[#222] rounded-full">
            {/* Tick marks */}
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
            {/* Red dot */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#E71840]"
              style={{
                top: `${progress * 100}%`,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 8px rgba(231,24,64,0.5)",
              }}
            />
          </div>
        </div>

        {/* ── KEYFRAME STYLES ── */}
        <style jsx>{`
          @keyframes dollarFall {
            0% { top: -5%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 105%; opacity: 0; }
          }
          @keyframes dollarRise {
            0% { top: 105%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: -5%; opacity: 0; }
          }
        `}</style>
      </div>
    </section>
  );
}
