import type { Metadata } from "next";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
  faqSchema,
  schemaToScript,
} from "@/lib/seo/schemas";
import { generalFaqs } from "@/lib/data/faq";

import Hero from "@/components/sections/Hero";
import TrustMarquee from "@/components/sections/TrustMarquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Results from "@/components/sections/Results";
import Testimonials from "@/components/sections/Testimonials";
import Problems from "@/components/sections/Problems";
import ContactForm from "@/components/sections/ContactForm";
import CtaBanner from "@/components/sections/CtaBanner";
import ScrollProgress from "@/components/sections/ScrollProgress";

export const metadata: Metadata = {
  title:
    "Marketing Agency Dallas | AI-Powered Digital Marketing | NIXAR Solutions",
  description:
    "NIXAR Solutions is a Dallas digital marketing agency specializing in AI SEO, web development, automation, and full-funnel digital transformation for Dallas-Fort Worth businesses. Get your free digital audit today.",
};

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <main>
        <Hero />
        <TrustMarquee />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <Results />
        <Testimonials />
        <Problems />
        <ContactForm />
        <CtaBanner />
      </main>

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToScript(localBusinessSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToScript(organizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToScript(websiteSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToScript(faqSchema(generalFaqs)),
        }}
      />
    </>
  );
}
