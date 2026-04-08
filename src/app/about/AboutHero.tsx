"use client";

import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-white pt-20">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-orb" style={{ width: 420, height: 420, background: "rgba(231,24,64,0.05)", top: "5%", left: "15%", animation: "orbFloat2 16s ease-in-out infinite" }} />
        <div className="hero-orb" style={{ width: 350, height: 350, background: "rgba(231,24,64,0.04)", bottom: "5%", right: "10%", animation: "orbFloat1 20s ease-in-out infinite" }} />
        <div className="hero-orb" style={{ width: 280, height: 280, background: "rgba(200,200,200,0.05)", top: "50%", right: "35%", animation: "orbFloat3 14s ease-in-out infinite" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <AnimateIn delay={0.1} direction="none">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            About Us
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2} distance={20}>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5.5vw,4.5rem)] font-900 leading-[1.05] tracking-tight text-[#1A1A1A]">
            About NIXAR Solutions
          </h1>
        </AnimateIn>

        <AnimateIn delay={0.35} direction="none">
          <p className="mt-5 max-w-2xl text-[1.15rem] leading-[1.7] text-[var(--color-text-secondary)]">
            Born in Frisco. Built for Growth. More than a marketing agency.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
