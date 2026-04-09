"use client";

import AnimateIn from "@/components/ui/AnimateIn";

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      {/* Gradient overlay — dark left, transparent right */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.3) 70%, rgba(10,10,10,0.2) 100%)',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2 }} className="mx-auto flex w-full max-w-7xl items-center justify-between gap-12 px-5 lg:px-8">
        {/* Text block */}
        <div className="max-w-3xl">
          <AnimateIn delay={0.1} direction="none">
            <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-white/60">
              NIXAR Solutions — Frisco, TX
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2} distance={20}>
            <h1 className="mt-5 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,6vw,5rem)] font-900 leading-[1.05] tracking-tight">
              <span className="block text-white">We Don&apos;t Just Market.</span>
              <AnimateIn delay={0.35} distance={20} as="span" className="block text-[var(--color-primary)]">
                We Transform.
              </AnimateIn>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.5} direction="none">
            <p className="mt-6 max-w-xl text-[1.1rem] leading-[1.7] font-400 text-white/70">
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
                className="inline-flex h-[52px] items-center rounded-full border-2 border-white/80 px-8 text-[15px] font-600 text-white transition-all duration-200 hover:bg-white hover:text-[#0a0a0a]"
              >
                See Our Work
              </a>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.8} direction="none">
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.8rem] font-500 text-white/50">
              <span>20+ Years Experience</span>
              <span className="text-white/30">•</span>
              <span>500+ Projects</span>
              <span className="text-white/30">•</span>
              <span>97% Satisfaction</span>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
        <AnimateIn delay={1.0} direction="none">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-500 uppercase tracking-[0.15em] text-white/40">Scroll</span>
            <div className="h-[30px] w-[2px] overflow-hidden bg-white/20">
              <div className="hero-scroll-line h-[30px] w-full bg-white/40" />
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
