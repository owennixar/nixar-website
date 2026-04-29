import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnimateIn from "@/components/ui/AnimateIn";
import { personSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { authors } from "@/lib/data/authors";

export const metadata: Metadata = {
  title: "Our Team | Owen Nixon & Anwar Mirza",
  description:
    "Meet the co-founders of NIXAR Solutions. Owen Nixon and Anwar Mirza lead Dallas-Fort Worth's AI-powered digital transformation agency.",
  alternates: { canonical: "/about/team" },
};

const TEAM = Object.values(authors);

const VALUES = [
  { title: "Obsession with Quality", desc: "Every pixel, every word, every strategy — exceptional or nothing." },
  { title: "Curiosity About AI", desc: "We embrace AI as a force multiplier, not a threat." },
  { title: "Ownership Mentality", desc: "We own outcomes, not just tasks. No finger-pointing." },
  { title: "Creative Problem Solving", desc: "Cookie-cutter solutions are for cookie-cutter agencies." },
];

export default function TeamPage() {
  return (
    <>
      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="pb-8 pt-32 lg:pt-40">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,5vw,4rem)] font-700 uppercase leading-[1.05] tracking-tight">
                <span className="text-white">Our </span>
                <span className="text-[#E71840]">Team.</span>
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-white/60">
                The people behind Dallas-Fort Worth&apos;s AI-powered marketing agency.
              </p>
            </AnimateIn>
          </div>
        </section>

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Team", href: "/about/team" }]} />

        {/* Team Members */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-[900px] mx-auto">
              {TEAM.map((person, i) => (
                <AnimateIn key={person.slug} delay={i * 0.1}>
                  <Link
                    href={`/about/team/${person.slug}`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all hover:border-[#E71840]/40 hover:bg-white/[0.05]"
                  >
                    <div className="w-full overflow-hidden" style={{ height: '400px' }}>
                      <img
                        src={person.avatar}
                        alt={`${person.name}, ${person.role} at NIXAR Solutions`}
                        className="h-full w-full"
                        style={{ objectFit: 'cover', objectPosition: 'top center' }}
                      />
                    </div>
                    <div style={{ padding: '24px' }}>
                      <h2 className="font-[family-name:var(--font-oswald)] text-[1.5rem] font-700 uppercase text-white">
                        {person.name}
                      </h2>
                      <p className="mt-1 text-[0.85rem] font-600 text-[#E71840]">{person.role}, NIXAR Solutions</p>
                      <p className="mt-4 text-[15px] leading-[1.8] text-white/60">{person.bio}</p>
                      <span className="mt-4 inline-block text-[0.75rem] font-600 uppercase tracking-[0.1em] text-[#E71840]">
                        Read full bio &rarr;
                      </span>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#111] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,3vw,2.25rem)] font-700 uppercase text-white">
                Our Values
              </h2>
            </AnimateIn>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v, i) => (
                <AnimateIn key={v.title} delay={i * 0.08}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase text-white">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/50">{v.desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="mx-auto max-w-2xl px-5">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,4vw,3rem)] font-700 uppercase text-white">
                Ready to <span className="text-[#E71840]">Work Together?</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="inline-flex h-12 items-center rounded-full bg-[#E71840] px-8 text-[14px] font-600 text-white transition-all hover:bg-[#C41535]">
                  Work With Us
                </Link>
                <Link href="/portfolio" className="inline-flex h-12 items-center rounded-full border-2 border-white/20 px-8 text-[14px] font-600 text-white transition-all hover:border-white/40">
                  See Our Work
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <JsonLd
        data={[
          ...TEAM.map((person) =>
            personSchema({
              name: person.name,
              jobTitle: `${person.role}, NIXAR Solutions`,
              description: person.bio,
              slug: person.slug,
              image: person.avatar,
              email: person.email,
              sameAs: person.linkedIn ? [person.linkedIn] : [],
            })
          ),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }, { name: "Team", url: "/about/team" }]),
        ]}
      />
    </>
  );
}
