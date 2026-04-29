import type { Metadata } from "next";
import AnimateIn from "@/components/ui/AnimateIn";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Careers | Join the NIXAR Team",
  description:
    "Explore career opportunities at NIXAR Solutions. We're looking for talented people who want to transform how businesses grow online.",
  alternates: { canonical: "/careers" },
};

const values = [
  {
    title: "OBSESSION WITH QUALITY",
    description:
      "We believe every pixel, every word, every strategy should be exceptional. Good enough is never good enough.",
  },
  {
    title: "CURIOSITY ABOUT AI",
    description:
      "The marketing landscape is being reshaped by AI. We want people who are excited about it, not afraid of it.",
  },
  {
    title: "OWNERSHIP MENTALITY",
    description:
      "No finger-pointing. No 'that's not my job.' We own outcomes, not just tasks.",
  },
  {
    title: "CREATIVE PROBLEM SOLVING",
    description:
      "Cookie-cutter solutions are for cookie-cutter agencies. We find the approach that actually works.",
  },
];

const perks = [
  {
    title: "Remote-Friendly",
    description: "Work from anywhere in DFW",
  },
  {
    title: "DFW-Based",
    description: "Frisco TX headquarters",
  },
  {
    title: "Startup Culture",
    description: "Move fast, make impact",
  },
  {
    title: "Cutting-Edge Tools",
    description: "Latest AI and marketing tech",
  },
  {
    title: "Growth Opportunities",
    description: "Learn and advance quickly",
  },
  {
    title: "Collaborative Team",
    description: "Work with passionate people",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Image */}
      <section className="relative w-full overflow-hidden" style={{ height: '50vh' }}>
        <img src="/images/careers-hero.webp" alt="Creative team collaborating at NIXAR Solutions Dallas" loading="eager" decoding="sync" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.8) 100%)' }} />
      </section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }]} />
      {/* Hero */}
      <section className="pb-16 pt-12">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <AnimateIn>
            <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,6vw,4.5rem)] font-700 uppercase leading-[1.05] text-white">
              JOIN THE
              <br />
              <span className="text-[var(--color-primary)]">MISSION.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.7] text-white/60">
              We&apos;re always looking for talented people who want to
              transform how businesses grow online.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* What We Look For */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <AnimateIn>
            <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
              What we look for
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 uppercase text-white">
              Our Values
            </h2>
          </AnimateIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <AnimateIn key={value.title} delay={0.1 * i}>
                <div className="glass-card flex h-full flex-col p-8 lg:p-10">
                  <h3 className="font-[family-name:var(--font-oswald)] text-[1.1rem] font-700 uppercase tracking-wide text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-[#999]">
                    {value.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <AnimateIn>
            <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
              Open positions
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 uppercase text-white">
              Current Openings
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <div className="glass-card mt-10 p-8 lg:p-10">
              <p className="text-[15px] leading-[1.8] text-[#999]">
                We&apos;re growing fast. While we don&apos;t have specific
                openings listed right now, we&apos;re always interested in
                hearing from talented people.
              </p>
              <p className="mt-4 text-[15px] leading-[1.8] text-white/80">
                Send your resume and a note about what excites you to{" "}
                <a
                  href="mailto:hello@nixarsolutions.com"
                  className="font-600 text-[var(--color-primary)] underline-offset-4 hover:underline"
                >
                  hello@nixarsolutions.com
                </a>
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Perks */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <AnimateIn>
            <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
              Why NIXAR
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-700 uppercase text-white">
              Perks
            </h2>
          </AnimateIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk, i) => (
              <AnimateIn key={perk.title} delay={0.1 * i}>
                <div className="glass-card flex h-full flex-col p-8">
                  <h3 className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-wide text-white">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.7] text-[#999]">
                    {perk.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
      <JsonLd data={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Careers", url: "/careers" }])]} />
    </main>
  );
}
