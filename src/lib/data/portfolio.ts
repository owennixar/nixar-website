export interface PortfolioProject {
  slug: string;
  name: string;
  services: string[];
  description: string;
}

export const portfolio: PortfolioProject[] = [
  {
    slug: "tire-geeks",
    name: "Tire Geeks",
    services: ["Digital Marketing", "Social Media"],
    description:
      "Comprehensive digital marketing and social media strategy to increase brand awareness and drive customer acquisition in the competitive automotive aftermarket industry.",
  },
  {
    slug: "lonestar-kart-park",
    name: "Lonestar Kart Park",
    services: ["Digital Marketing"],
    description:
      "Full-service digital marketing campaign to boost visibility and bookings for a premier go-kart entertainment venue in the DFW area.",
  },
  {
    slug: "nixon-jach-hubbard",
    name: "Nixon Jach Hubbard",
    services: ["Development"],
    description:
      "Professional web development project delivering a modern, performant website that establishes credibility and streamlines client interactions.",
  },
  {
    slug: "syb-builders",
    name: "SYB Builders",
    services: ["Digital Marketing"],
    description:
      "Digital marketing transformation for a construction company, including website redesign and online presence optimization that dramatically improved their professional image.",
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolio.find((p) => p.slug === slug);
}
