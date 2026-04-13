import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, FileSearch, Phone, FileText, Clock } from "lucide-react";
import { cities } from "@/lib/data/cities";
import { localBusinessSchema, faqSchema, schemaToScript } from "@/lib/seo/schemas";
import type { FAQ } from "@/lib/data/faq";
import AnimateIn from "@/components/ui/AnimateIn";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { professionalServiceSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import ContactForm from "@/components/sections/ContactForm";

const contactFaqs: FAQ[] = [
  {
    question: "How much does NIXAR charge?",
    answer:
      "Our pricing is customized based on your goals and scope. We start with a free consultation and provide transparent proposals. No hidden fees, no long-term contracts required.",
  },
  {
    question: "How long before I see results?",
    answer:
      "It depends on the service. Paid ads can generate leads within days. SEO typically shows meaningful results in 3-6 months. Social media builds momentum over 2-3 months. We set realistic timelines and track progress weekly.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "Absolutely. We especially enjoy helping small and medium-sized DFW businesses compete with larger companies through smart, AI-powered strategies.",
  },
  {
    question: "What\u2019s included in the free digital audit?",
    answer:
      "A comprehensive analysis of your website performance, SEO health, social media presence, competitor comparison, and AI visibility assessment \u2014 plus a custom recommendations report.",
  },
  {
    question: "Do you offer monthly contracts or long-term?",
    answer:
      "We offer flexible monthly agreements. No long-term lock-ins. We earn your business every month with results, not contracts.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work across industries including restaurants, construction, healthcare, real estate, e-commerce, professional services, automotive, and technology. Our strategies are customized to each industry\u2019s unique challenges.",
  },
];

export const metadata: Metadata = {
  title: "Contact NIXAR Solutions | Digital Marketing Agency Dallas TX | Free Consultation",
  description:
    "Get in touch with NIXAR Solutions, a digital marketing agency in Dallas, TX. Request your free digital audit, schedule a consultation, or call us at 469-759-3638.",
};

export default function ContactPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative w-full overflow-hidden" style={{ height: '75vh' }}>
          <img
            src="/images/contact-hero.png"
            alt="Two astronauts handshaking in space representing partnership"
            loading="eager"
            decoding="sync"
            className="absolute top-0 left-0 w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center center', zIndex: 0 }}
          />
          <div
            className="absolute inset-0"
            style={{ zIndex: 1, background: 'linear-gradient(to right, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.3) 60%, rgba(10,10,10,0.1) 100%)' }}
          />
          <div className="relative h-full flex items-center" style={{ zIndex: 2 }}>
            <div className="max-w-7xl mx-auto px-6 w-full">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                Contact
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,4rem)] font-900 leading-[1.05] tracking-tight text-white">
                Let&apos;s Talk
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-white/70">
                Ready to transform your digital presence? Get in touch for a free audit
                and discover how NIXAR can grow your business.
              </p>
            </AnimateIn>
            </div>
          </div>
        </section>

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]} />

        {/* Reuse the homepage contact form section */}
        <ContactForm />

        {/* What Happens Next */}
        <section className="bg-[#0A0A0A] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="text-center font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.25rem)] font-700 uppercase tracking-tight text-white">
                What Happens Next?
              </h2>
            </AnimateIn>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  Icon: FileSearch,
                  title: "WE REVIEW",
                  desc: "Within 24 hours, our team reviews your submission and prepares for your call.",
                },
                {
                  step: "02",
                  Icon: Phone,
                  title: "WE CALL",
                  desc: "We schedule a 30-minute discovery call to understand your business goals.",
                },
                {
                  step: "03",
                  Icon: FileText,
                  title: "WE DELIVER",
                  desc: "You receive a custom strategy proposal tailored to your specific needs.",
                },
              ].map((item, i) => (
                <AnimateIn key={item.step} delay={0.1 * i}>
                  <div className="glass-card relative p-8 text-center">
                    <span className="absolute right-4 top-4 font-[family-name:var(--font-heading)] text-[2rem] font-700 leading-none text-[#E71840]/20">
                      {item.step}
                    </span>
                    <item.Icon size={32} className="mx-auto text-[#E71840]" />
                    <h3 className="mt-4 font-[family-name:var(--font-heading)] text-[1.1rem] font-700 text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#999]">
                      {item.desc}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#111] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="text-center font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.25rem)] font-700 uppercase tracking-tight text-white">
                Frequently Asked Questions
              </h2>
            </AnimateIn>

            <div className="mt-12 flex flex-col gap-5">
              {contactFaqs.map((faq, i) => (
                <AnimateIn key={i} delay={0.05 * i}>
                  <div className="glass-card p-6">
                    <h3 className="font-[family-name:var(--font-heading)] text-[1rem] font-700 text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.7] text-[#999]">
                      {faq.answer}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Office Hours */}
        <section className="bg-[#0A0A0A] py-16">
          <div className="mx-auto max-w-lg px-5 lg:px-8">
            <AnimateIn>
              <div className="glass-card p-8 text-center">
                <Clock size={28} className="mx-auto text-[#E71840]" />
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-[1.1rem] font-700 uppercase tracking-[0.1em] text-[#E71840]">
                  Office Hours
                </h3>
                <div className="mt-5 space-y-2">
                  <p className="text-[15px] text-white">
                    Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM CST
                  </p>
                  <p className="text-[15px] text-white/60">
                    Saturday &ndash; Sunday: By appointment
                  </p>
                  <p className="mt-3 text-[14px] font-600 text-[#E71840]">
                    Emergency support: 24/7 for active clients
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Serving DFW */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2rem)] font-800 tracking-tight text-white">
                Serving Dallas-Fort Worth
              </h2>
              <p className="mt-2 text-[15px] text-white/60">
                Based in Frisco, TX — serving 20+ cities across the DFW metroplex.
              </p>
            </AnimateIn>

            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
              {cities.map((city, i) => (
                <AnimateIn key={city.slug} delay={0.02 * i}>
                  <Link
                    href={city.slug === "dallas" ? "/dallas" : `/${city.slug}`}
                    className="flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-[13px] font-500 text-white/60 transition-all hover:bg-[#E71840]/10 hover:text-[#E71840]"
                  >
                    <MapPin size={13} className="shrink-0 text-white/40" />
                    {city.name}
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      <JsonLd data={[
        professionalServiceSchema(),
        faqSchema(contactFaqs),
        breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]),
      ]} />
    </>
  );
}
