import AnimateIn from "@/components/ui/AnimateIn";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E71840] to-[#C41535] py-20 lg:py-24">
      {/* Floating geometric shapes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="cta-shape cta-shape-1 absolute left-[10%] top-[20%] h-20 w-20 rounded-full border border-white/10" />
        <div className="cta-shape cta-shape-2 absolute right-[15%] top-[30%] h-16 w-16 rotate-45 border border-white/10" />
        <div className="cta-shape cta-shape-3 absolute bottom-[20%] left-[30%] h-12 w-12 rounded-full border border-white/10" />
        <div className="cta-shape cta-shape-4 absolute bottom-[25%] right-[25%] h-24 w-24 rotate-12 border border-white/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
        <AnimateIn>
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.75rem,4vw,2.75rem)] font-800 leading-tight tracking-tight text-white">
            Ready to Transform Your Digital Presence?
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-white/80">
            Get your free digital audit and discover how NIXAR can grow your business
          </p>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <a
            href="#contact"
            className="mt-8 inline-flex h-12 items-center rounded-full border-2 border-white px-8 text-[15px] font-600 text-white transition-all hover:bg-white hover:text-[var(--color-primary)]"
          >
            Get Free Audit &rarr;
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}
