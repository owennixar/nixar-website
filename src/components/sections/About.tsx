import AnimateIn from "@/components/ui/AnimateIn";

export default function About() {
  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-5 lg:gap-16 lg:px-8">
        {/* Text. 60% */}
        <div className="lg:col-span-3">
          <AnimateIn direction="left" distance={30}>
            <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
              About NIXAR
            </p>
          </AnimateIn>

          <AnimateIn direction="left" distance={30} delay={0.1}>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
              Full-Spectrum Digital Solutions
            </h2>
          </AnimateIn>

          <AnimateIn direction="left" distance={30} delay={0.2}>
            <p className="mt-6 text-base leading-[1.75] text-[var(--color-text-secondary)]">
              We provide full-spectrum digital solutions, handling everything from branding and web
              design to automation and paid ads. so you don&apos;t have to juggle multiple vendors.
              Every strategy is data-driven, backed by research and analytics to deliver measurable
              results, and we continuously monitor, test, and optimize your growth with 24/7 support.
            </p>
          </AnimateIn>

          <AnimateIn direction="left" distance={30} delay={0.3}>
            <p className="mt-4 text-base leading-[1.75] text-[var(--color-text-secondary)]">
              Our proven track record speaks for itself: we&apos;ve helped clients expand their
              locations, generate millions of views, dominate search rankings, and transform their
              market presence. With one dedicated team managing strategy, execution, and results, we
              take full accountability for your digital success.
            </p>
          </AnimateIn>

          <AnimateIn direction="left" distance={30} delay={0.4}>
            <a
              href="#about"
              className="mt-6 inline-flex items-center gap-1 text-[15px] font-600 text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)]"
            >
              About Us
              <span aria-hidden="true">&rarr;</span>
            </a>
          </AnimateIn>
        </div>

        {/* Image. 40% */}
        {/* TODO: Replace with nano-banana-2 generated team photo */}
        <AnimateIn direction="right" distance={30} delay={0.2} className="lg:col-span-2">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--color-bg-alt)] via-[var(--color-primary-light)] to-[var(--color-bg-alt)] shadow-lg">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white/80">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <p className="mt-2 text-sm font-500 text-[var(--color-text-muted)]">Team Photo</p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
