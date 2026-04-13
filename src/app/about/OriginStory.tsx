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

        <AnimateIn direction="right" distance={30} delay={0.15}>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lg" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <img
              src="/images/founding-story.jpg"
              alt="NIXAR Solutions team collaboration — founded in Frisco, TX"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
