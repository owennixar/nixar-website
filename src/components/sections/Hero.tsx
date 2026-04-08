"use client";

import AnimateIn from "@/components/ui/AnimateIn";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-white pt-20"
    >
      {/* Gradient orbs — atmospheric depth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-12 px-5 lg:px-8">
        {/* Text block */}
        <div className="max-w-3xl">
          <AnimateIn delay={0.1} direction="none">
            <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
              NIXAR Solutions — Frisco, TX
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2} distance={20}>
            <h1 className="mt-5 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,6vw,5rem)] font-900 leading-[1.05] tracking-tight">
              <span className="block text-[#1A1A1A]">We Don&apos;t Just Market.</span>
              <AnimateIn delay={0.35} distance={20} as="span" className="block text-[var(--color-primary)]">
                We Transform.
              </AnimateIn>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.5} direction="none">
            <p className="mt-6 max-w-xl text-[1.1rem] leading-[1.7] font-400 text-[#444]">
              At NIXAR Solutions, we are more than a traditional digital marketing agency — we are
              a digital transformation agency. We transform our clients&apos; online presence through
              strategic marketing, engaging content, high-converting websites, SEO, social media
              management, and ROI-driven paid ads.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.65} direction="none">
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex h-[52px] items-center rounded-full bg-[var(--color-primary)] px-8 text-[15px] font-600 text-white shadow-lg shadow-[var(--color-primary-glow)] transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:scale-[1.02] hover:shadow-xl hover:shadow-[var(--color-primary-glow)]"
              >
                Get Free Digital Audit
              </a>
              <a
                href="#portfolio"
                className="inline-flex h-[52px] items-center rounded-full border-2 border-[#1A1A1A] px-8 text-[15px] font-600 text-[#1A1A1A] transition-all duration-200 hover:bg-[#1A1A1A] hover:text-white"
              >
                See Our Work
              </a>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.8} direction="none">
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.8rem] font-500 text-[var(--color-text-muted)]">
              <span>20+ Years Experience</span>
              <span className="text-[var(--color-border)]">•</span>
              <span>500+ Projects</span>
              <span className="text-[var(--color-border)]">•</span>
              <span>97% Satisfaction</span>
            </div>
          </AnimateIn>
        </div>

        {/* Hero image — desktop only */}
        {/* TODO: Replace with nano-banana-2 generated hero-dashboard.png */}
        <AnimateIn
          delay={0.3}
          direction="none"
          duration={0.8}
          className="hidden w-[45%] shrink-0 lg:block"
        >
          <div className="hero-float relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--color-bg-alt)] via-white to-[var(--color-primary-light)] shadow-2xl shadow-black/[0.06]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <p className="mt-3 text-sm font-500 text-[var(--color-text-muted)]">Hero Image</p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Scroll indicator */}
      <AnimateIn delay={1.0} direction="none" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[11px] font-500 uppercase tracking-[0.15em] text-[#CCC]">Scroll</span>
          <div className="h-[30px] w-[2px] overflow-hidden bg-[#E5E5E5]">
            <div className="hero-scroll-line h-[30px] w-full bg-[#CCC]" />
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
