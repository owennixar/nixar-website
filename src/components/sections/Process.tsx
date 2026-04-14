"use client";

import { useRef, useEffect, useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    description:
      "We dive deep into your business, market, and competitors to understand what makes you unique and where the opportunities live",
  },
  {
    num: "02",
    title: "Strategy",
    description:
      "We build a custom roadmap aligned to your goals. not a recycled template, but a strategy engineered for your specific growth trajectory",
  },
  {
    num: "03",
    title: "Execution",
    description:
      "Our team handles the build-out across every channel. design, development, content, ads, SEO. with weekly reporting and full transparency",
  },
  {
    num: "04",
    title: "Support",
    description:
      "We don't disappear after launch. Continuous monitoring, optimization, and 24/7 support to ensure your digital presence keeps performing",
  },
] as const;

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const ratio = Math.min(entry.intersectionRatio * 2.5, 1);
          setLineProgress(ratio);
        }
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn className="text-center">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            Our Process
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
            Business Transformation in 4 Steps
          </h2>
        </AnimateIn>

        {/* Steps grid */}
        <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
          {/* Connecting line. desktop */}
          <div className="pointer-events-none absolute left-0 right-0 top-[60px] hidden h-[2px] bg-[var(--color-border)] md:block" aria-hidden="true">
            <div
              className="h-full bg-[var(--color-primary)] transition-all duration-700 ease-out"
              style={{ width: `${lineProgress * 100}%` }}
            />
          </div>

          {/* Connecting line. mobile (vertical) */}
          <div className="pointer-events-none absolute bottom-0 left-[30px] top-0 w-[2px] bg-[var(--color-border)] md:hidden" aria-hidden="true">
            <div
              className="w-full bg-[var(--color-primary)] transition-all duration-700 ease-out"
              style={{ height: `${lineProgress * 100}%` }}
            />
          </div>

          {STEPS.map((step, i) => (
            <AnimateIn key={step.num} delay={0.1 + i * 0.1}>
              <div className="relative flex gap-5 md:flex-col md:gap-0">
                {/* Number circle */}
                <div className="relative z-10 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/[0.06] md:mx-auto">
                  <span className="font-[family-name:var(--font-heading)] text-lg font-900 text-[var(--color-primary)]">
                    {step.num}
                  </span>
                </div>
                {/* Card content */}
                <div className="md:mt-6 md:text-center">
                  <h3 className="font-[family-name:var(--font-heading)] text-[1.15rem] font-700 text-[#1A1A1A]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-[var(--color-text-secondary)]">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
