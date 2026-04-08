"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const STATS = [
  { target: 20, suffix: "+", label: "Years of Combined Experience" },
  { target: 500, suffix: "+", label: "Successful Projects Delivered" },
  { target: 97, suffix: "%+", label: "Client Satisfaction Rate" },
] as const;

function useCountUp(target: number, shouldStart: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  const animate = useCallback(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
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

function StatBlock({ target, suffix, label, shouldStart }: {
  target: number;
  suffix: string;
  label: string;
  shouldStart: boolean;
}) {
  const count = useCountUp(target, shouldStart);
  return (
    <div className="text-center">
      <p className="font-[family-name:var(--font-heading)] text-[clamp(3rem,6vw,5rem)] font-900 leading-none text-white">
        {count}
        <span className="text-[var(--color-primary)]">{suffix}</span>
      </p>
      <div className="mx-auto mt-3 h-[2px] w-8 bg-[var(--color-primary)]" />
      <p className="mt-3 text-[14px] font-500 text-white/50">{label}</p>
    </div>
  );
}

export default function Results() {
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
    <section ref={ref} className="relative bg-[#0A0A0A] py-24 lg:py-32 overflow-hidden">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="font-[family-name:var(--font-heading)] text-[20vw] font-900 uppercase leading-none text-white/[0.03] select-none">
          NIXAR
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            Track Record
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-white">
            Proven Results, Real Impact
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat) => (
            <StatBlock key={stat.label} {...stat} shouldStart={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
