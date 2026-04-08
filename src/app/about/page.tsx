import type { Metadata } from "next";
import AboutHero from "./AboutHero";
import AboutStats from "./AboutStats";
import OriginStory from "./OriginStory";
import TeamSection from "./TeamSection";
import Differentiators from "./Differentiators";
import CtaBanner from "@/components/sections/CtaBanner";
import {
  localBusinessSchema,
  organizationSchema,
  schemaToScript,
} from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "About NIXAR Solutions | Dallas Digital Transformation Agency",
  description:
    "Founded in 2023 by Anwar Mirza and Owen Nixon, NIXAR Solutions is a Frisco TX-based digital transformation agency helping DFW businesses compete online.",
};

export default function AboutPage() {
  return (
    <>
      <main>
        <AboutHero />
        <AboutStats />
        <OriginStory />
        <TeamSection />
        <Differentiators />
        <CtaBanner />
      </main>

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
    </>
  );
}
