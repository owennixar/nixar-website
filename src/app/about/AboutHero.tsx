"use client";

import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '75vh' }}>
      <img
        src="/images/about-hero.png"
        alt="NIXAR Solutions command center"
        loading="eager"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, background: 'linear-gradient(to right, rgba(10,10,10,0.85), rgba(10,10,10,0.4))' }}
      />
      <div className="relative h-full flex items-center max-w-7xl mx-auto px-6" style={{ zIndex: 2 }}>
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
          <p className="mt-5 max-w-xl text-[1.15rem] leading-[1.7] text-white/70">
            Born in Frisco. Built for Growth. More than a marketing agency.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
