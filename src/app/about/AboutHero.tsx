"use client";

import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutHero() {
  return (
    <section style={{ position: 'relative', minHeight: '80vh', overflow: 'hidden' }} className="flex items-center pt-20">
      {/* Hero background image */}
      <img
        src="/images/about-hero.png"
        alt="Space command center with marketing dashboards overlooking Earth"
        loading="eager"
        decoding="sync"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />
      {/* Gradient overlay for text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 100%)',
          zIndex: 1
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }} className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <AnimateIn delay={0.1} direction="none">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
            About Us
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} distance={20}>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5.5vw,4.5rem)] font-900 leading-[1.05] tracking-tight text-white">
            About NIXAR Solutions
          </h1>
        </AnimateIn>

        <AnimateIn delay={0.35} direction="none">
          <p className="mt-5 max-w-2xl text-[1.15rem] leading-[1.7] text-white/70">
            Born in Frisco. Built for Growth. More than a marketing agency.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
