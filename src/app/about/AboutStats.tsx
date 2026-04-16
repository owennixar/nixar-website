"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const STATS = [
  {
    target: 20,
    suffix: "+",
    label: "Years of Combined Experience",
    disclaimer: "Driven by our in-house team and trusted strategic partners",
  },
  {
    target: 500,
    suffix: "+",
    label: "Projects Delivered",
    disclaimer:
      "Projects executed collaboratively by our team and partner network",
  },
  {
    target: 97,
    suffix: "%+",
    label: "Client Satisfaction",
    disclaimer:
      "Serving happy clients ranging from micro to small and medium-sized organizations",
  },
] as const;

function useCountUp(target: number, shouldStart: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  const animate = useCallback(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    if (shouldStart) animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, [shouldStart, animate]);

  return value;
}

function StatBlock({
  target,
  suffix,
  label,
  disclaimer,
  shouldStart,
}: {
  target: number;
  suffix: string;
  label: string;
  disclaimer: string;
  shouldStart: boolean;
}) {
  const count = useCountUp(target, shouldStart);
  return (
    <div
      className="flex flex-col items-center text-center py-10 px-6 rounded-2xl h-full"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <p className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-900 leading-none text-white">
        {count}
        <span className="text-[#E71840]">{suffix}</span>
      </p>
      <p className="mt-3 text-lg font-600 text-white">{label}</p>
      <p className="mt-2 text-base leading-snug text-white/75 max-w-xs">{disclaimer}</p>
    </div>
  );
}

export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-white/10 bg-transparent py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-[1rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
          By The Numbers
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {STATS.map((stat) => (
            <StatBlock key={stat.label} {...stat} shouldStart={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
