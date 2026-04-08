"use client";

import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { testimonials } from "@/lib/data/testimonials";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Auto-slide every 5s
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="testimonials" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn className="text-center">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            Testimonials
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
            What Our Clients Say
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="mt-14 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                >
                  <div className="relative h-full rounded-2xl border border-[var(--color-border)] bg-white p-8">
                    {/* Quote mark */}
                    <span
                      className="absolute left-6 top-4 font-[family-name:var(--font-heading)] text-[5rem] leading-none text-[var(--color-primary)]/10 select-none"
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>

                    {/* Stars */}
                    <div className="relative z-10 flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <svg
                          key={s}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="var(--color-primary)"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="relative z-10 mt-4 text-[15px] italic leading-[1.7] text-[#333]">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="relative z-10 mt-6 border-t border-[var(--color-border)] pt-4">
                      <p className="font-[family-name:var(--font-heading)] text-[15px] font-700 text-[#1A1A1A]">
                        {t.author}
                      </p>
                      <p className="text-[13px] text-[var(--color-text-muted)]">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === i
                    ? "w-6 bg-[var(--color-primary)]"
                    : "w-2 bg-[var(--color-border)]"
                }`}
              />
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
