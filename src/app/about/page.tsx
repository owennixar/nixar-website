import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import AboutHero from "./AboutHero";
import AboutStats from "./AboutStats";
import OriginStory from "./OriginStory";
import Timeline from "./Timeline";
import Values from "./Values";
import TeamSection from "./TeamSection";
import CounterSection from "./CounterSection";
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
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
        <AboutStats />
        <OriginStory />
        <Timeline />
        <Values />
        <TeamSection />
        <CounterSection />
        <Differentiators />
        <CtaBanner />
      </main>

      <JsonLd data={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])]} />
    </>
  );
}
