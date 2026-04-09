"use client";

import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden pt-20">
      {/* Hero background image */}
      <img
        src="/images/hf_20260409_221040_c04f47c4-63b1-4ea1-9dc0-1a22ade7adaa.png"
        alt="Space command center with marketing dashboards overlooking Earth"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 100%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
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
