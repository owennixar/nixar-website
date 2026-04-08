"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data/services";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  return (
    <section id="services" className="bg-[var(--color-bg-alt)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn>
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            What We Offer
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
            What Does NIXAR Solutions Offer?
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <p className="mt-3 max-w-xl text-base text-[var(--color-text-secondary)]">
            End-to-end digital solutions that transform your online presence and drive measurable growth.
          </p>
        </AnimateIn>

        {/* Service rows */}
        <div className="mt-14">
          {services.map((service, i) => {
            const isExpanded = expandedIndex === i;
            const num = String(i + 1).padStart(2, "0");

            return (
              <AnimateIn key={service.slug} delay={0.05 * i} distance={16}>
                <div className="border-b border-[#E5E5E5]">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="group flex w-full items-center gap-4 py-5 text-left transition-colors sm:gap-6 md:py-6"
                    aria-expanded={isExpanded}
                  >
                    {/* Number */}
                    <span
                      className={`shrink-0 font-[family-name:var(--font-heading)] text-[2.5rem] font-900 leading-none transition-colors duration-300 sm:text-[3rem] md:text-[4rem] ${
                        isExpanded ? "text-[var(--color-primary)]" : "text-[#F0F0F0]"
                      }`}
                    >
                      {num}
                    </span>

                    {/* Name + badge */}
                    <span className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="font-[family-name:var(--font-heading)] text-[1.1rem] font-700 text-[#1A1A1A] transition-colors group-hover:text-[var(--color-primary)] sm:text-[1.25rem] md:text-[1.4rem]">
                        {service.title}
                      </span>
                      {service.isNew && (
                        <span className="shrink-0 rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-700 uppercase tracking-wider text-white">
                          New
                        </span>
                      )}
                    </span>

                    {/* Arrow */}
                    <ArrowRight
                      size={20}
                      className={`shrink-0 text-[var(--color-text-muted)] transition-transform duration-300 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-[calc(2.5rem+1rem)] sm:pl-[calc(3rem+1.5rem)] md:pl-[calc(4rem+1.5rem)]">
                          <p className="max-w-2xl text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                            {service.description}
                          </p>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {service.tags.map((tag) => (
                              <li
                                key={tag}
                                className="rounded-full bg-white px-3 py-1 text-[12px] font-500 text-[var(--color-text-secondary)]"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={`/services/${service.slug}`}
                            className="mt-4 inline-flex items-center gap-1 text-[14px] font-600 text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)]"
                          >
                            Learn More <span aria-hidden="true">&rarr;</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimateIn>
            );
          })}
        </div>

        <AnimateIn delay={0.3} className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex h-12 items-center rounded-full border-2 border-[#1A1A1A] px-8 text-[14px] font-600 text-[#1A1A1A] transition-all hover:bg-[#1A1A1A] hover:text-white"
          >
            View All Services &rarr;
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
