"use client";

import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '75vh' }}>
      <img
        src="/images/dallas-skyline.jpg"
        alt="Dallas Texas skyline at sunset. NIXAR Solutions digital marketing agency"
        loading="eager"
        decoding="sync"
        className="absolute top-0 left-0 w-full h-full"
        style={{ objectFit: 'cover', objectPosition: 'center center', zIndex: 0 }}
      />
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.85) 50%, rgba(10,10,10,0.95) 100%)' }}
      />
      <div className="relative h-full flex items-center" style={{ zIndex: 2 }}>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimateIn delay={0.1} direction="none">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#E71840', textShadow: '0 0 20px rgba(231,24,64,0.5)' }}>
              About Us
            </p>
          </AnimateIn>
          <AnimateIn delay={0.2} distance={20}>
            <h1
              className="font-[family-name:var(--font-oswald)] font-bold text-white uppercase"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.5)' }}
            >
              ABOUT NIXAR SOLUTIONS
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.35} direction="none">
            <p className="mt-4 text-lg max-w-xl" style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
              Born in Frisco. Built for Growth. More than a marketing agency.
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
