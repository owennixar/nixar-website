import type { Metadata } from "next";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
  faqSchema,
  schemaToScript,
} from "@/lib/seo/schemas";
import { generalFaqs } from "@/lib/data/faq";

import HomeDark from "@/components/sections/HomeDark";

export const metadata: Metadata = {
  title:
    "Digital Marketing Agency Dallas TX | SEO, Web Design & AI Marketing | NIXAR Solutions",
  description:
    "NIXAR Solutions is a full-service digital marketing agency in Dallas, TX. We offer SEO, web design, social media marketing, paid ads, AI automation, and branding for DFW businesses. Get your free audit today.",
};

export default function Home() {
  return (
    <>
      <main>
        <HomeDark />
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
