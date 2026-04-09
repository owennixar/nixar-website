"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import AnimateIn from "@/components/ui/AnimateIn";

interface StatItem {
  target: number | null;
  suffix: string;
  label: string;
  display?: string; // for non-numeric like "24/7"
}

const stats: StatItem[] = [
  { target: 20, suffix: "+", label: "Years Combined Experience" },
  { target: 500, suffix: "+", label: "Projects Delivered" },
  { target: 97, suffix: "%+", label: "Client Satisfaction" },
  { target: 10, suffix: "+", label: "Services Offered" },
  { target: 20, suffix: "+", label: "Cities Served in DFW" },
  { target: null, suffix: "", label: "Support & Monitoring", display: "24/7" },
];

function useCountUp(target: number | null, shouldAnimate: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate || target === null) return;

    const duration = 2000; // ms
    const startTime = performance.now();

    let raf: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [shouldAnimate, target]);

  return count;
}

function StatCard({ stat, shouldAnimate, delay }: { stat: StatItem; shouldAnimate: boolean; delay: number }) {
  const count = useCountUp(stat.target, shouldAnimate);

  return (
    <AnimateIn delay={delay}>
      <div className="glass-card rounded-2xl p-6 lg:p-8 text-center">
        <span className="font-[family-name:var(--font-oswald)] text-[3rem] lg:text-[4rem] font-bold text-white leading-none block">
          {stat.display ? stat.display : `${count}${stat.suffix}`}
        </span>
        <p className="text-[14px] text-[#666] mt-2">{stat.label}</p>
      </div>
    </AnimateIn>
  );
}

export default function CounterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
      }
    },
    [hasAnimated]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.2,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <section ref={sectionRef} className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn>
          <h2 className="font-[family-name:var(--font-oswald)] text-[2.5rem] lg:text-[3rem] font-bold uppercase text-white text-center mb-16">
            By The Numbers
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              shouldAnimate={hasAnimated}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
