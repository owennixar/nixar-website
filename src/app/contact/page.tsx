import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cities } from "@/lib/data/cities";
import { localBusinessSchema, schemaToScript } from "@/lib/seo/schemas";
import AnimateIn from "@/components/ui/AnimateIn";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Digital Audit | NIXAR Solutions",
  description:
    "Contact NIXAR Solutions for a free digital audit. Based in Frisco, TX, serving the entire Dallas-Fort Worth metroplex. Call 469-759-3638 or email hello@nixarsolutions.com.",
};

export default function ContactPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="bg-white pb-4 pt-32 lg:pt-40">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
                Contact
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] font-900 leading-[1.05] tracking-tight text-[#1A1A1A]">
                Let&apos;s Talk
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-[var(--color-text-secondary)]">
                Ready to transform your digital presence? Get in touch for a free audit
                and discover how NIXAR can grow your business.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Reuse the homepage contact form section */}
        <ContactForm />

        {/* Serving DFW */}
        <section className="bg-[var(--color-bg-alt)] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2rem)] font-800 tracking-tight text-[#1A1A1A]">
                Serving Dallas-Fort Worth
              </h2>
              <p className="mt-2 text-[15px] text-[var(--color-text-secondary)]">
                Based in Frisco, TX — serving 20+ cities across the DFW metroplex.
              </p>
            </AnimateIn>

            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
              {cities.map((city, i) => (
                <AnimateIn key={city.slug} delay={0.02 * i}>
                  <Link
                    href={city.slug === "dallas" ? "/dallas" : `/${city.slug}`}
                    className="flex items-center gap-2 rounded-lg bg-white px-3.5 py-2.5 text-[13px] font-500 text-[var(--color-text-secondary)] shadow-sm transition-all hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
                  >
                    <MapPin size={13} className="shrink-0 text-[var(--color-text-muted)]" />
                    {city.name}
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToScript(localBusinessSchema()) }}
      />
    </>
  );
}
