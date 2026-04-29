import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnimateIn from "@/components/ui/AnimateIn";
import { personSchema, breadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Our Team | Owen Nixon & Anwar Mirza",
  description:
    "Meet the co-founders of NIXAR Solutions. Owen Nixon and Anwar Mirza lead Dallas-Fort Worth's AI-powered digital transformation agency.",
};

const TEAM = [
  {
    name: "Owen Nixon",
    title: "Co-Founder & Principal",
    image: "/images/team-owen.webp",
    bio: "Owen Nixon is the co-founder of NIXAR Solutions, bringing deep expertise in web development, AI integration, and digital strategy to every client engagement. With a background spanning software engineering and digital marketing, Owen bridges the gap between technical implementation and business growth. He leads NIXAR's technology stack decisions, oversees website development projects, and architects the AI-powered tools that give NIXAR clients a competitive edge. Owen's approach is hands-on. he believes the best marketing strategies are built on a foundation of cutting-edge technology and data-driven decision-making. Before co-founding NIXAR, Owen built and scaled digital products across multiple industries, giving him a unique perspective on what makes businesses succeed online. His obsession with performance, clean code, and measurable outcomes ensures every NIXAR project is built to convert. Based in Frisco, Texas, Owen is committed to helping DFW businesses compete and win in the AI era.",
  },
  {
    name: "Anwar Mirza",
    title: "Co-Founder & Principal",
    image: "/images/team-anwar.webp",
    bio: "Anwar Mirza is the co-founder of NIXAR Solutions, bringing extensive experience in marketing strategy, brand development, and client relations. With a passion for understanding what makes businesses grow, Anwar leads NIXAR's strategic direction and ensures every client receives a customized approach tailored to their unique market position. He oversees brand identity projects, marketing strategy development, and client relationship management across the agency. Anwar's strength lies in translating complex business challenges into clear, actionable marketing roadmaps. He believes that great marketing starts with deep understanding. of the client's business, their customers, their competitors, and the opportunities that others miss. Before co-founding NIXAR, Anwar developed his marketing expertise across diverse industries, learning firsthand how different businesses require different approaches to growth. His commitment to transparency, measurable results, and long-term client partnerships defines the NIXAR culture. Based in the Dallas-Fort Worth area, Anwar is dedicated to making enterprise-level marketing strategies accessible to businesses of all sizes.",
  },
];

const VALUES = [
  { title: "Obsession with Quality", desc: "Every pixel, every word, every strategy. exceptional or nothing." },
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
                <AnimateIn key={person.name} delay={i * 0.1}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
                    <div className="w-full overflow-hidden" style={{ height: '400px' }}>
                      <img
                        src={person.image}
                        alt={`${person.name}, ${person.title} at NIXAR Solutions`}
                        className="h-full w-full"
                        style={{ objectFit: 'cover', objectPosition: 'top center' }}
                      />
                    </div>
                    <div style={{ padding: '24px' }}>
                      <h2 className="font-[family-name:var(--font-oswald)] text-[1.5rem] font-700 uppercase text-white">
                        {person.name}
                      </h2>
                      <p className="mt-1 text-[0.85rem] font-600 text-[#E71840]">{person.title}</p>
                      <p className="mt-4 text-[15px] leading-[1.8] text-white/60">{person.bio}</p>
                    </div>
                  </div>
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
          personSchema({ name: "Owen Nixon", jobTitle: "Co-Founder & Principal", description: "Co-founder of NIXAR Solutions with expertise in web development, AI integration, and digital strategy." }),
          personSchema({ name: "Anwar Mirza", jobTitle: "Co-Founder & Principal", description: "Co-founder of NIXAR Solutions with expertise in marketing strategy, brand development, and client relations." }),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }, { name: "Team", url: "/about/team" }]),
        ]}
      />
    </>
  );
}
