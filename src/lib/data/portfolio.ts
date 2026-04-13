export interface PortfolioProject {
  slug: string;
  name: string;
  services: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string;
  serviceLinks: { title: string; slug: string }[];
  testimonialIndex: number | null;
  gradient: string;
  image?: string;
}

export const PORTFOLIO_IMAGES: Record<string, { src: string; alt: string }> = {
  "tire-geeks": { src: "/images/portfolio-tiregeeks.jpg", alt: "Tire Geeks digital marketing case study — social media and local SEO for automotive" },
  "lonestar-kart-park": { src: "/images/portfolio-lonestar.jpg", alt: "Lonestar Kart Park digital marketing and brand awareness campaign" },
  "nixon-jach-hubbard": { src: "/images/portfolio-njh.webp", alt: "Nixon Jach Hubbard e-commerce website development" },
  "syb-builders": { src: "/images/portfolio-syb.jpg", alt: "SYB Builders construction website and digital marketing" },
};

export const portfolio: PortfolioProject[] = [
  {
    slug: "tire-geeks",
    name: "Tire Geeks",
    services: ["Digital Marketing", "Social Media", "Content Marketing", "Local SEO"],
    description:
      "Comprehensive digital marketing and social media strategy to increase brand awareness and drive customer acquisition in the competitive automotive aftermarket industry.",
    challenge:
      "A local tire shop in the DFW area was struggling to attract new customers during slow season. Their online presence was minimal — no social media strategy, outdated web listings, and zero visibility in local search results.",
    solution:
      "NIXAR implemented a complete digital marketing overhaul. We built a strategic social media presence across Instagram and Facebook, created engaging content showcasing their services and expertise, optimized their Google Business Profile for local search, and launched targeted local SEO campaigns to capture 'near me' searches.",
    results:
      "Within the first quarter, the business saw a significant increase in foot traffic and phone inquiries. Their social media following grew organically, and they began appearing in local search results for key terms. The owner reported that slow season became their busiest period.",
    serviceLinks: [
      { title: "Social Media Management", slug: "social-media-management" },
      { title: "Content Marketing", slug: "content-marketing" },
      { title: "Search Everywhere Optimization", slug: "search-everywhere-optimization" },
    ],
    testimonialIndex: 1,
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    slug: "lonestar-kart-park",
    name: "Lonestar Kart Park",
    services: ["Digital Marketing", "Social Media", "Paid Advertising"],
    description:
      "Full-service digital marketing campaign to boost visibility and bookings for a premier go-kart entertainment venue in the DFW area.",
    challenge:
      "An entertainment venue in the DFW area needed to increase visibility and bookings. Despite offering a premium go-kart experience, they were losing potential customers to competitors with stronger online presences and better digital marketing.",
    solution:
      "We developed a comprehensive digital marketing strategy focused on driving awareness and foot traffic. This included social media content highlighting the experience, targeted paid advertising campaigns during peak booking periods, and local SEO optimization to capture families searching for entertainment options in the area.",
    results:
      "The venue experienced a measurable uptick in online bookings and walk-in traffic. Social media engagement rates exceeded industry benchmarks, and paid campaigns consistently delivered positive return on ad spend. The brand became more recognizable across the DFW entertainment landscape.",
    serviceLinks: [
      { title: "Social Media Management", slug: "social-media-management" },
      { title: "Paid Advertising", slug: "paid-advertising" },
    ],
    testimonialIndex: null,
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    slug: "nixon-jach-hubbard",
    name: "Nixon Jach Hubbard",
    services: ["Web Development", "Branding"],
    description:
      "Professional web development project delivering a modern, performant website that establishes credibility and streamlines client interactions.",
    challenge:
      "A brand needed a professional web presence to showcase their products and establish credibility in their market. Their existing online presence didn't reflect the quality of their offerings and was costing them potential customers.",
    solution:
      "NIXAR designed and developed a custom website from scratch using modern web technologies. The site was built to be fast, mobile-responsive, and conversion-optimized. We focused on clean design, intuitive navigation, and clear calls-to-action that guide visitors toward purchase decisions.",
    results:
      "The new website transformed the brand's online perception. Visitors spent more time on the site, bounce rates decreased significantly, and the professional design helped establish trust with new customers. The site served as a foundation for all subsequent marketing efforts.",
    serviceLinks: [
      { title: "Website Development", slug: "web-development" },
      { title: "Branding & Brand Identity", slug: "branding-brand-identity" },
    ],
    testimonialIndex: null,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    slug: "syb-builders",
    name: "SYB Builders",
    services: ["Digital Marketing", "Web Development", "Content Marketing"],
    description:
      "Digital marketing transformation for a construction company, including website redesign and online presence optimization that dramatically improved their professional image.",
    challenge:
      "A construction company needed to look more professional online and generate qualified leads. Their website was outdated, they had no social media presence, and potential clients were choosing competitors who appeared more established online.",
    solution:
      "We executed a full digital transformation — redesigning their website to showcase completed projects with a modern, professional aesthetic. We built out their content marketing with project case studies, optimized for local construction-related search terms, and established their social media presence to build credibility.",
    results:
      "The transformation was dramatic. The company's professional image improved substantially, leading to inquiries from larger, higher-value projects. Their digital presence now accurately reflects the quality of their construction work, and they consistently generate leads through their website.",
    serviceLinks: [
      { title: "Website Development", slug: "web-development" },
      { title: "Content Marketing", slug: "content-marketing" },
    ],
    testimonialIndex: 2,
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolio.find((p) => p.slug === slug);
}
