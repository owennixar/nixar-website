import type { FAQ } from "@/lib/data/faq";
import type { Service } from "@/lib/data/services";

const SITE_URL = "https://nixarsolutions.com";
const BUSINESS_NAME = "NIXAR Solutions";
const PHONE = "+1-469-759-3638";
const EMAIL = "hello@nixarsolutions.com";

// ─── LocalBusiness Schema ─────────────────────────────────────────────────────
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS_NAME,
    description:
      "Full-service digital marketing agency in Dallas-Fort Worth specializing in AI-powered SEO, web development, custom AI agents, branding, and growth strategies.",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Frisco",
      addressRegion: "TX",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.1507,
      longitude: -96.8236,
    },
    areaServed: [
      { "@type": "City", name: "Dallas" },
      { "@type": "City", name: "Fort Worth" },
      { "@type": "City", name: "Plano" },
      { "@type": "City", name: "Frisco" },
      { "@type": "City", name: "McKinney" },
      { "@type": "City", name: "Arlington" },
      { "@type": "City", name: "Richardson" },
      { "@type": "City", name: "Denton" },
      { "@type": "City", name: "Irving" },
      { "@type": "City", name: "Garland" },
      { "@type": "City", name: "Grand Prairie" },
      { "@type": "City", name: "Mesquite" },
      { "@type": "City", name: "Carrollton" },
      { "@type": "City", name: "Lewisville" },
      { "@type": "City", name: "Allen" },
      { "@type": "City", name: "Flower Mound" },
      { "@type": "City", name: "Southlake" },
      { "@type": "City", name: "Grapevine" },
      { "@type": "City", name: "Prosper" },
      { "@type": "City", name: "Celina" },
    ],
    founder: [
      { "@type": "Person", name: "Anwar Mirza" },
      { "@type": "Person", name: "Owen Nixon" },
    ],
    foundingDate: "2023",
    priceRange: "$$",
    image: `${SITE_URL}/og-image.jpg`,
    sameAs: [],
  };
}

// ─── Organization Schema ──────────────────────────────────────────────────────
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description:
      "NIXAR Solutions is a full-service digital marketing agency in Dallas-Fort Worth. AI-powered SEO, web development, custom AI agents, branding, and growth strategies. 500+ projects delivered.",
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Frisco",
      addressRegion: "TX",
      addressCountry: "US",
    },
    founder: [
      { "@type": "Person", name: "Anwar Mirza" },
      { "@type": "Person", name: "Owen Nixon" },
    ],
    foundingDate: "2023",
    knowsAbout: [
      "Digital Marketing",
      "Search Engine Optimization",
      "AI-Powered SEO",
      "Generative Engine Optimization",
      "Web Development",
      "Custom AI Agents",
      "Brand Identity Design",
      "Social Media Marketing",
      "Content Marketing",
      "Paid Advertising",
      "Business Automation",
    ],
  };
}

// ─── Service Schema ───────────────────────────────────────────────────────────
export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "State",
      name: "Texas",
    },
    serviceType: service.title,
  };
}

// ─── FAQ Schema ───────────────────────────────────────────────────────────────
export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── BreadcrumbList Schema ────────────────────────────────────────────────────
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── WebSite Schema with SearchAction ─────────────────────────────────────────
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_NAME,
    url: SITE_URL,
    description:
      "NIXAR Solutions — Full-service digital marketing agency in Dallas-Fort Worth. AI-powered SEO, web development, custom AI agents, and growth strategies.",
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Helper: render schema as script tag ──────────────────────────────────────
export function schemaToScript(schema: Record<string, unknown>) {
  return JSON.stringify(schema);
}
