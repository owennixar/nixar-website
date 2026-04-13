import AnimateIn from "@/components/ui/AnimateIn";

export default function OriginStory() {
  return (
    <section className="bg-transparent py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Text */}
        <div>
          <AnimateIn direction="left" distance={30}>
            <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
              Our Story
            </p>
          </AnimateIn>

          <AnimateIn direction="left" distance={30} delay={0.1}>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-white">
              How Did We Start?
            </h2>
          </AnimateIn>

          <AnimateIn direction="left" distance={30} delay={0.2}>
            <p className="mt-6 text-base leading-[1.8] text-white/60">
              NIXAR Solutions was founded by Anwar Mirza and Owen Nixon in 2023.
              Originally founded as an attempt to help grow Anwar&apos;s uncle&apos;s
              local tire shop bring in new clients during the slow season, it
              rapidly has taken off into something much bigger. Anwar and Owen saw
              the hole in the market for small business owners who were struggling
              to compete in today&apos;s ever-changing online space. From their
              experience, they decided to form NIXAR Solutions. But they wanted to
              be more than every other marketing agency, they wanted to transform
              companies online and help them compete for their spot at the table.
              Which is why till this day NIXAR Solutions is more than just a
              marketing agency, its a transformation agency.
            </p>
          </AnimateIn>

          <AnimateIn direction="left" distance={30} delay={0.3}>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="font-[family-name:var(--font-heading)] text-[15px] font-700 text-white">
                  Anwar Mirza
                </p>
                <p className="text-[13px] text-white/40">
                  Co-Founder
                </p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-[family-name:var(--font-heading)] text-[15px] font-700 text-white">
                  Owen Nixon
                </p>
                <p className="text-[13px] text-white/40">
                  Co-Founder
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Image placeholder */}
        {/* TODO: Replace with nano-banana-2 generated founding story image */}
        <AnimateIn direction="right" distance={30} delay={0.15}>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.02] via-[#E71840]/10 to-white/[0.02] shadow-lg">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-sm">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E71840" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <p className="mt-3 text-sm font-500 text-white/40">
                  Founding Story Image
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
