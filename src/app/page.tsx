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
    "Marketing Agency Dallas | AI-Powered Digital Marketing | NIXAR Solutions",
  description:
    "NIXAR Solutions is a Dallas digital marketing agency specializing in AI SEO, web development, automation, and full-funnel digital transformation for Dallas-Fort Worth businesses. Get your free digital audit today.",
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
