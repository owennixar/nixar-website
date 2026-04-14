import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnimateIn from "@/components/ui/AnimateIn";
import { glossarySchema, breadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Marketing Glossary | NIXAR Solutions",
  description:
    "Definitions for SEO, GEO, AI SEO, PPC, CRO, and 30+ digital marketing terms. Learn the language of modern marketing.",
};

const TERMS: { term: string; definition: string; link?: string }[] = [
  { term: "A/B Testing", definition: "The practice of comparing two versions of a webpage, email, or ad to determine which performs better based on measurable metrics like click-through rate, conversion rate, or engagement." },
  { term: "AI SEO", definition: "The use of artificial intelligence to optimize website content, technical structure, and authority signals for better search engine rankings. AI SEO goes beyond traditional SEO by using machine learning to predict ranking factors and automate optimization at scale.", link: "/services/ai-seo-geo" },
  { term: "AEO (Answer Engine Optimization)", definition: "Optimizing content to appear as direct answers in search features like featured snippets, People Also Ask boxes, and AI-generated summaries. AEO focuses on structured, concise content that directly answers user questions." },
  { term: "Backlink", definition: "A hyperlink from one website to another. Backlinks are a key ranking factor in SEO because search engines interpret them as votes of confidence in the linked content's quality and authority." },
  { term: "Bounce Rate", definition: "The percentage of visitors who leave a website after viewing only one page without taking any further action. A high bounce rate may indicate poor user experience, irrelevant content, or slow page loading." },
  { term: "Brand Identity", definition: "The collection of visual, verbal, and experiential elements that define how a brand presents itself. including logo, color palette, typography, voice, messaging, and overall aesthetic.", link: "/services/branding-brand-identity" },
  { term: "CMS (Content Management System)", definition: "Software that allows users to create, manage, and modify digital content without needing specialized technical knowledge. Common examples include WordPress, Shopify, and headless CMS platforms." },
  { term: "Content Marketing", definition: "A strategic marketing approach focused on creating and distributing valuable, relevant content to attract and retain a clearly defined audience. and ultimately drive profitable customer action.", link: "/services/content-marketing" },
  { term: "Conversion Rate", definition: "The percentage of website visitors who complete a desired action such as making a purchase, filling out a form, or subscribing to a newsletter. Calculated as conversions divided by total visitors." },
  { term: "CPA (Cost Per Acquisition)", definition: "The average cost to acquire one customer through a specific marketing channel or campaign. Calculated by dividing total campaign cost by the number of conversions." },
  { term: "CPC (Cost Per Click)", definition: "The amount paid each time a user clicks on a paid advertisement. CPC is a fundamental metric in PPC advertising used to measure campaign efficiency." },
  { term: "CPM (Cost Per Mille)", definition: "The cost per 1,000 impressions of an advertisement. CPM is commonly used in display advertising and brand awareness campaigns where visibility matters more than clicks." },
  { term: "CRM (Customer Relationship Management)", definition: "Software and strategies used to manage interactions with current and potential customers. CRMs track leads, automate follow-ups, and provide insights into the customer journey." },
  { term: "CRO (Conversion Rate Optimization)", definition: "The systematic process of increasing the percentage of website visitors who take a desired action. CRO uses data analysis, user testing, and iterative design changes to improve conversion performance." },
  { term: "CTR (Click-Through Rate)", definition: "The ratio of users who click on a specific link or ad compared to the total number who view it. Calculated as clicks divided by impressions, expressed as a percentage." },
  { term: "Domain Authority", definition: "A search engine ranking score developed by Moz that predicts how likely a website is to rank in search engine results. Scores range from 1 to 100, with higher scores indicating greater ranking potential." },
  { term: "E-E-A-T", definition: "Experience, Expertise, Authoritativeness, and Trustworthiness. Google's framework for evaluating content quality. E-E-A-T signals help search engines determine whether content is reliable and written by credible sources." },
  { term: "GEO (Generative Engine Optimization)", definition: "The practice of optimizing digital content so that AI-powered search engines like ChatGPT, Perplexity, and Google AI Overviews cite your brand in their generated answers. GEO is the next evolution beyond traditional SEO.", link: "/services/ai-seo-geo" },
  { term: "Google Business Profile", definition: "A free tool from Google that lets businesses manage their online presence across Google Search and Maps. Optimizing your profile is essential for local SEO and appearing in the local pack." },
  { term: "Impressions", definition: "The number of times a piece of content, ad, or search result is displayed to users, regardless of whether it was clicked. Impressions measure visibility and reach." },
  { term: "Keyword Research", definition: "The process of discovering and analyzing search terms that people enter into search engines. Keyword research informs content strategy, SEO, and PPC campaigns by revealing what your audience is searching for." },
  { term: "Landing Page", definition: "A standalone web page created specifically for a marketing or advertising campaign. Landing pages are designed with a single focused objective. capturing leads or driving conversions." },
  { term: "Lead Generation", definition: "The process of attracting and converting prospects into someone who has indicated interest in your company's product or service. Common tactics include content offers, forms, ads, and referral programs." },
  { term: "Link Building", definition: "The practice of acquiring hyperlinks from other websites to your own. Link building is a core SEO strategy because search engines use links as signals of content quality and authority." },
  { term: "Local SEO", definition: "The practice of optimizing a business's online presence to attract more customers from relevant local searches. Local SEO includes Google Business Profile optimization, local citations, and location-specific content.", link: "/services/search-everywhere-optimization" },
  { term: "Meta Description", definition: "An HTML attribute that provides a brief summary of a web page's content. Meta descriptions appear in search engine results below the page title and influence click-through rates." },
  { term: "NAP Consistency", definition: "The uniformity of a business's Name, Address, and Phone number across all online directories, citations, and platforms. NAP consistency is a critical local SEO ranking factor." },
  { term: "Organic Traffic", definition: "Visitors who arrive at a website through unpaid search engine results rather than paid advertisements. Organic traffic is driven by SEO and content marketing efforts." },
  { term: "PPC (Pay-Per-Click)", definition: "An online advertising model where advertisers pay a fee each time their ad is clicked. Google Ads and Meta Ads are the most common PPC platforms.", link: "/services/paid-advertising" },
  { term: "Retargeting", definition: "A digital advertising strategy that shows ads to users who have previously visited your website or interacted with your content. Retargeting keeps your brand top-of-mind and brings visitors back to convert." },
  { term: "ROAS (Return on Ad Spend)", definition: "A marketing metric that measures the revenue generated for every dollar spent on advertising. Calculated as revenue from ads divided by cost of ads." },
  { term: "Schema Markup", definition: "A standardized vocabulary of tags (structured data) added to HTML that helps search engines understand content on a page. Schema markup enables rich results like star ratings, FAQs, and breadcrumbs in search." },
  { term: "SEO (Search Engine Optimization)", definition: "The practice of optimizing websites and content to rank higher in search engine results pages. SEO encompasses technical optimization, content strategy, link building, and user experience improvements.", link: "/services/search-everywhere-optimization" },
  { term: "SERP (Search Engine Results Page)", definition: "The page displayed by a search engine in response to a user's query. SERPs include organic results, paid ads, featured snippets, knowledge panels, and other search features." },
  { term: "Social Proof", definition: "The psychological phenomenon where people assume the actions of others reflect correct behavior. In marketing, social proof includes testimonials, reviews, case studies, and client logos." },
  { term: "Title Tag", definition: "An HTML element that specifies the title of a web page. Title tags appear in search engine results as the clickable headline and are one of the most important on-page SEO factors." },
  { term: "Topic Cluster", definition: "A content strategy model where a central pillar page covers a broad topic comprehensively, and multiple cluster pages address related subtopics, all interlinked. Topic clusters establish topical authority and improve SEO." },
  { term: "UX (User Experience)", definition: "The overall experience a user has when interacting with a website, app, or product. Good UX design focuses on usability, accessibility, performance, and satisfaction to drive engagement and conversions." },
];

// Group by first letter
const grouped = TERMS.reduce<Record<string, typeof TERMS>>((acc, t) => {
  const letter = t.term[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(t);
  return acc;
}, {});

const letters = Object.keys(grouped).sort();

export default function GlossaryPage() {
  return (
    <>
      <main className="bg-[#0A0A0A]">
        {/* Hero */}
        <section className="pb-8 pt-32 lg:pt-40">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <AnimateIn>
              <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,5vw,4rem)] font-700 uppercase leading-[1.05] tracking-tight">
                <span className="text-white">Marketing </span>
                <span className="text-[#E71840]">Glossary.</span>
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.7] text-white/60">
                Definitions for SEO, GEO, AI SEO, PPC, and every marketing term you need to know.
              </p>
            </AnimateIn>
          </div>
        </section>

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources/glossary" }, { label: "Glossary", href: "/resources/glossary" }]} />

        {/* Alphabet Nav */}
        <section className="py-6">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((l) => (
                <a
                  key={l}
                  href={grouped[l] ? `#letter-${l}` : undefined}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-700 transition-colors ${
                    grouped[l]
                      ? "border border-white/15 text-white/60 hover:border-[#E71840] hover:text-[#E71840]"
                      : "border border-white/5 text-white/15 cursor-default"
                  }`}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Terms */}
        <section className="py-12 lg:py-20">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            {letters.map((letter) => (
              <div key={letter} id={`letter-${letter}`} className="mb-12">
                <h2 className="mb-6 font-[family-name:var(--font-oswald)] text-[2rem] font-700 text-[#E71840]">
                  {letter}
                </h2>
                <div className="space-y-6">
                  {grouped[letter].map((t) => (
                    <div key={t.term} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                      <h3 className="font-[family-name:var(--font-oswald)] text-[1.1rem] font-700 uppercase text-white">
                        {t.term}
                      </h3>
                      <p className="mt-2 text-[15px] leading-[1.8] text-white/60">
                        {t.definition}
                      </p>
                      {t.link && (
                        <Link
                          href={t.link}
                          className="mt-3 inline-block text-[13px] font-600 text-[#E71840] transition-colors hover:text-white"
                        >
                          Learn more &rarr;
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <div className="mx-auto max-w-2xl px-5">
            <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,4vw,3rem)] font-700 uppercase text-white">
              Need Help with <span className="text-[#E71840]">Your Marketing?</span>
            </h2>
            <p className="mt-4 text-white/60">
              Get a free audit and see how NIXAR can grow your business.
            </p>
            <Link href="/free-audit" className="mt-8 inline-flex h-12 items-center rounded-full bg-[#E71840] px-8 text-[14px] font-600 text-white transition-all hover:bg-[#C41535]">
              Get Free Audit
            </Link>
          </div>
        </section>
      </main>

      <JsonLd
        data={[
          glossarySchema(TERMS.map((t) => ({ name: t.term, definition: t.definition }))),
          breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Resources", url: "/resources/glossary" }, { name: "Glossary", url: "/resources/glossary" }]),
        ]}
      />
    </>
  );
}
