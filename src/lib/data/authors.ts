export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
  linkedIn: string;
}

export const authors: Record<string, Author> = {
  "owen-nixon": {
    slug: "owen-nixon",
    name: "Owen Nixon",
    role: "Co-Founder",
    bio: "Owen Nixon is co-founder of NIXAR Solutions, a Frisco-based digital transformation agency. He works with SMBs and enterprise clients across DFW and nationwide on SEO, AI search optimization, and brand-aligned web development.",
    avatar: "/images/team-owen.webp",
    email: "owen@nixarsolutions.com",
    linkedIn: "",
  },
  "anwar-mirza": {
    slug: "anwar-mirza",
    name: "Anwar Mirza",
    role: "Co-Founder",
    bio: "Anwar Mirza is co-founder of NIXAR Solutions. He leads strategy and delivery on digital transformation engagements, helping clients align brand, marketing, and operations around a single source of truth.",
    avatar: "/images/team-anwar.webp",
    email: "anwar@nixarsolutions.com",
    linkedIn: "",
  },
};

export function getAuthor(slug: string): Author | undefined {
  return authors[slug];
}

export const AUTHOR_SLUGS = Object.keys(authors);
