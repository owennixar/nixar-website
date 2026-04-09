"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Search,
  // Instagram not in lucide - use Share2
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
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   CHANNEL DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const CHANNELS = [
  { id: "seo", label: "SEO", Icon: Search, branch: "attract" },
  { id: "social", label: "Social Media", Icon: Share2, branch: "engage" },
  { id: "ads", label: "Paid Ads", Icon: Target, branch: "convert" },
  { id: "website", label: "Website", Icon: Monitor, branch: "engage" },
  { id: "email", label: "Email", Icon: Mail, branch: "engage" },
  { id: "content", label: "Content", Icon: PenTool, branch: "attract" },
  { id: "branding", label: "Branding", Icon: Palette, branch: "attract" },
  { id: "analytics", label: "Analytics", Icon: BarChart3, branch: "convert" },
] as const;

/* Chaos positions — scattered randomly across the viewport area */
const CHAOS_POSITIONS = [
  { x: 8, y: 12, r: -12 },
  { x: 65, y: 8, r: 10 },
  { x: 78, y: 55, r: -8 },
  { x: 15, y: 60, r: 14 },
  { x: 42, y: 72, r: -6 },
  { x: 88, y: 30, r: 11 },
  { x: 30, y: 35, r: -15 },
  { x: 55, y: 48, r: 7 },
];

/* Error labels on some chaos cards */
const CHAOS_ERRORS: Record<string, string> = {
  seo: "NO STRATEGY",
  ads: "WASTED BUDGET",
  social: "INCONSISTENT",
};

/* Order positions — structured pipeline grid (% based)
   Row 0: STRATEGY (rendered separately)
   Row 1: Branch headers (ATTRACT / ENGAGE / CONVERT)
   Row 2-4: Cards in each branch */
const ORDER_POSITIONS: Record<string, { x: number; y: number }> = {
  branding: { x: 12, y: 30 },
  content: { x: 12, y: 50 },
  seo: { x: 12, y: 70 },
  social: { x: 42, y: 30 },
  website: { x: 42, y: 50 },
  email: { x: 42, y: 70 },
  ads: { x: 72, y: 30 },
  analytics: { x: 72, y: 50 },
};

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function TheDifference() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

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
      scrub: 0.5,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      trigger.kill();
    };
  }, [reducedMotion]);

  // Derived states from scroll progress
  const isTransition = progress > 0.35 && progress < 0.65;
  const isPhase2 = progress >= 0.5;
  const transitionAmount = Math.min(1, Math.max(0, (progress - 0.35) / 0.3)); // 0-1 during transition
  const showFlash = progress > 0.42 && progress < 0.58;
  const sweepProgress = Math.min(1, Math.max(0, (progress - 0.38) / 0.12));

  const getCardStyle = useCallback(
    (index: number, id: string) => {
      const chaos = CHAOS_POSITIONS[index];
      const order = ORDER_POSITIONS[id];
      const t = transitionAmount;

      const x = chaos.x + (order.x - chaos.x) * t;
      const y = chaos.y + (order.y - chaos.y) * t;
      const r = chaos.r * (1 - t);

      return {
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${r}deg)`,
        transition: reducedMotion ? "none" : undefined,
      };
    },
    [transitionAmount, reducedMotion]
  );

  return (
    <section ref={sectionRef} className="relative" style={{ height: "200vh" }}>
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        {/* ── HEADING ── */}
        <div className="absolute top-8 left-0 right-0 z-20 text-center px-5">
          {!isPhase2 ? (
            <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,5vw,3.5rem)] font-700 uppercase text-[#666] relative inline-block">
              Other Agencies
              {/* Strikethrough line */}
              <span
                className="absolute left-0 top-1/2 h-[2px] bg-[#E71840]"
                style={{
                  width: `${Math.min(100, progress * 250)}%`,
                  transition: "width 0.1s linear",
                }}
              />
            </h2>
          ) : (
            <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,5vw,3.5rem)] font-700 uppercase leading-none">
              <span className="text-white">The NIXAR </span>
              <span className="text-[#E71840]">Way.</span>
            </h2>
          )}
        </div>

        {/* ── PHASE LABELS ── */}
        <div className="absolute bottom-12 left-0 right-0 z-20 text-center pointer-events-none">
          {!isPhase2 ? (
            <p
              className="text-[0.85rem] italic text-[#666] transition-opacity duration-500"
              style={{ opacity: progress < 0.35 ? 1 : 0 }}
            >
              Fragmented. Disconnected. Expensive.
            </p>
          ) : (
            <p
              className="text-[0.85rem] italic text-[#999] transition-opacity duration-500"
              style={{ opacity: progress > 0.65 ? 1 : 0 }}
            >
              Strategic. Connected. Profitable.
            </p>
          )}
        </div>

        {/* ── TRANSITION FLASH ── */}
        {showFlash && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <p
              className="font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,4vw,2.5rem)] font-700 uppercase text-[#E71840]"
              style={{
                opacity: Math.sin((progress - 0.42) / 0.16 * Math.PI),
              }}
            >
              Now Imagine This.
            </p>
          </div>
        )}

        {/* ── RED SWEEP LINE ── */}
        {isTransition && (
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-[#E71840] z-30 pointer-events-none"
            style={{
              width: `${sweepProgress * 100}%`,
              boxShadow: "0 0 20px rgba(231,24,64,0.5)",
            }}
          />
        )}

        {/* ── STRATEGY NODE (Phase 2 only) ── */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{
            left: "50%",
            top: "15%",
            transform: "translate(-50%, -50%)",
            opacity: transitionAmount,
            transition: "opacity 0.3s",
          }}
        >
          <div
            className="flex items-center gap-3 rounded-xl border px-6 py-3"
            style={{
              background: "rgba(231,24,64,0.08)",
              borderColor: "rgba(231,24,64,0.3)",
              boxShadow: isPhase2
                ? "0 0 30px rgba(231,24,64,0.15), inset 0 0 20px rgba(231,24,64,0.05)"
                : "none",
            }}
          >
            <Brain size={24} color="#E71840" />
            <span className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-wider text-white">
              Strategy
            </span>
          </div>
        </div>

        {/* ── BRANCH LABELS (Phase 2) ── */}
        {isPhase2 && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {[
              { label: "ATTRACT", x: 12 },
              { label: "ENGAGE", x: 42 },
              { label: "CONVERT", x: 72 },
            ].map((b) => (
              <span
                key={b.label}
                className="absolute font-[family-name:var(--font-oswald)] text-[0.65rem] font-700 uppercase tracking-[0.2em] text-[#E71840]/60"
                style={{
                  left: `${b.x}%`,
                  top: "22%",
                  transform: "translateX(-50%)",
                  opacity: Math.max(0, (transitionAmount - 0.5) * 2),
                }}
              >
                {b.label}
              </span>
            ))}
          </div>
        )}

        {/* ── CONNECTION LINES (Phase 2: SVG) ── */}
        <svg
          className="absolute inset-0 z-[5] h-full w-full pointer-events-none"
          style={{ opacity: transitionAmount }}
        >
          {/* Strategy to branch tops */}
          {[12, 42, 72].map((bx) => (
            <line
              key={bx}
              x1="50%"
              y1="18%"
              x2={`${bx}%`}
              y2="28%"
              stroke="#E71840"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity={0.4 + 0.3 * Math.sin(Date.now() / 1000)}
            />
          ))}
          {/* Vertical lines within branches */}
          {[12, 42, 72].map((bx) => (
            <line
              key={`v-${bx}`}
              x1={`${bx}%`}
              y1="33%"
              x2={`${bx}%`}
              y2="72%"
              stroke="#E71840"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity={0.3}
            />
          ))}
          {/* Line from branches down to results */}
          {[12, 42, 72].map((bx) => (
            <line
              key={`r-${bx}`}
              x1={`${bx}%`}
              y1="72%"
              x2="50%"
              y2="86%"
              stroke="#E71840"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity={0.25}
            />
          ))}
        </svg>

        {/* ── CHANNEL CARDS ── */}
        {CHANNELS.map((ch, i) => {
          const style = getCardStyle(i, ch.id);
          const errorLabel = CHAOS_ERRORS[ch.id];
          const isOrdered = transitionAmount > 0.5;

          return (
            <div
              key={ch.id}
              className="absolute z-10"
              style={{
                ...style,
                width: 120,
                transition: "left 0.05s, top 0.05s, transform 0.05s",
              }}
            >
              <div
                className="flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-center backdrop-blur-sm"
                style={{
                  background: isOrdered
                    ? "rgba(231,24,64,0.06)"
                    : "rgba(255,255,255,0.03)",
                  borderColor: isOrdered
                    ? "rgba(231,24,64,0.25)"
                    : "rgba(255,255,255,0.08)",
                  boxShadow: isOrdered
                    ? "inset 0 0 15px rgba(231,24,64,0.05)"
                    : "none",
                  transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
                }}
              >
                <ch.Icon
                  size={22}
                  style={{
                    color: isOrdered ? "#E71840" : "#555",
                    transition: "color 0.4s",
                  }}
                />
                <span
                  className="text-[0.65rem] font-600 uppercase tracking-wider"
                  style={{
                    color: isOrdered ? "#fff" : "#666",
                    transition: "color 0.4s",
                  }}
                >
                  {ch.label}
                </span>
              </div>

              {/* Error labels in chaos mode */}
              {errorLabel && !isOrdered && (
                <div
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 whitespace-nowrap"
                  style={{ opacity: 1 - transitionAmount }}
                >
                  <AlertTriangle size={10} color="#E71840" />
                  <span className="text-[0.5rem] font-600 uppercase text-[#E71840]/70">
                    {errorLabel}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* ── FALLING DOLLAR SIGNS (Phase 1) / RISING (Phase 2) ── */}
        {Array.from({ length: 15 }).map((_, i) => {
          const baseX = 10 + ((i * 37 + 13) % 80);
          const size = 10 + (i % 4) * 4;
          const delay = (i * 0.7) % 4;
          const isRising = isPhase2;

          return (
            <span
              key={`dollar-${i}`}
              className="absolute z-[3] select-none pointer-events-none font-[family-name:var(--font-oswald)] font-700"
              style={{
                left: `${baseX}%`,
                fontSize: size,
                color: isRising ? "rgba(34,197,94,0.5)" : "rgba(231,24,64,0.12)",
                animation: reducedMotion
                  ? "none"
                  : isRising
                    ? `dollarRise ${3 + (i % 3)}s linear ${delay}s infinite`
                    : `dollarFall ${3 + (i % 3)}s linear ${delay}s infinite`,
                transition: "color 0.5s",
              }}
            >
              $
            </span>
          );
        })}

        {/* ── BROKEN LINES (Phase 1 only) ── */}
        {!isPhase2 && (
          <svg
            className="absolute inset-0 z-[4] h-full w-full pointer-events-none"
            style={{ opacity: 1 - transitionAmount }}
          >
            {[
              [15, 20, 60, 15],
              [70, 60, 20, 65],
              [85, 35, 45, 50],
              [35, 40, 80, 55],
            ].map(([x1, y1, x2, y2], i) => (
              <line
                key={`broken-${i}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="#333"
                strokeWidth="1"
                strokeDasharray="6 8"
                opacity={0.3}
              />
            ))}
          </svg>
        )}

        {/* ── RESULTS NODE (Phase 2) ── */}
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
              background: "rgba(34,197,94,0.06)",
              borderColor: "rgba(34,197,94,0.25)",
              boxShadow: isPhase2
                ? "0 0 40px rgba(34,197,94,0.15), inset 0 0 20px rgba(34,197,94,0.05)"
                : "none",
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

        {/* ── SCROLL PROGRESS INDICATOR ── */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
          <div className="h-24 w-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="w-full bg-[#E71840] rounded-full"
              style={{ height: `${progress * 100}%`, transition: "height 0.1s" }}
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
