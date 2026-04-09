export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  badge: string;
  badgeColor?: string;
  date: string;
  readTime: string;
  author: string;
  featured: boolean;
  series: { name: string; part: number; total: number } | null;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "geo-generative-engine-optimization-2026",
    title: "GEO: How Generative Engine Optimization Is Changing the Marketing Landscape in 2026",
    excerpt: "AI-generated search results are rewriting the rules of visibility. Here's what GEO means for your brand — and how to adapt before your competitors do.",
    category: "AI & SEO",
    badge: "HOT NOW 🔥",
    badgeColor: "#E71840",
    date: "March 17, 2026",
    readTime: "14 min read",
    author: "NIXAR Solutions Team",
    featured: true,
    series: null,
  },
  {
    slug: "seo-vs-ai-seo-understanding-the-difference",
    title: "SEO vs. AI SEO: Understanding the Difference and Why It Matters",
    excerpt: "Traditional SEO isn't dead — but it's evolving fast. We break down the key differences between classic search optimization and the AI-driven future.",
    category: "Search Strategy",
    badge: "IN-DEPTH DIVE",
    badgeColor: "#3B82F6",
    date: "March 17, 2026",
    readTime: "12 min read",
    author: "NIXAR Solutions Team",
    featured: true,
    series: null,
  },
  {
    slug: "manus-ai-changing-social-media-marketing",
    title: "How Manus AI Is Changing Social Media Marketing Forever",
    excerpt: "Meta's $2 billion acquisition of Manus AI is reshaping social media advertising from the inside. Here's what autonomous AI agents mean for marketers, agencies, and Dallas businesses.",
    category: "Social Media & AI",
    badge: "TRENDING",
    badgeColor: "#F59E0B",
    date: "March 17, 2026",
    readTime: "13 min read",
    author: "NIXAR Solutions Team",
    featured: true,
    series: null,
  },
  {
    slug: "seo-101",
    title: "SEO 101: The Complete Beginner's Guide to Search Engine Optimization in 2026",
    excerpt: "Everything you need to know about SEO — from how Google works to on-page optimization, keyword research, and link building. No experience needed.",
    category: "Beginner's Guide",
    badge: "START HERE",
    badgeColor: "#10B981",
    date: "March 17, 2026",
    readTime: "14 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: { name: "Beginner's Guide", part: 1, total: 5 },
  },
  {
    slug: "geo-101",
    title: "GEO 101: A Beginner's Guide to Generative Engine Optimization in 2026",
    excerpt: "AI is changing how people find information. Learn how to get your business cited in AI-generated answers from ChatGPT, Perplexity, and Google AI Overviews.",
    category: "Beginner's Guide",
    badge: "START HERE",
    badgeColor: "#10B981",
    date: "March 17, 2026",
    readTime: "12 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: { name: "Beginner's Guide", part: 2, total: 5 },
  },
  {
    slug: "ai-seo-101",
    title: "AI SEO 101: How to Optimize Your Website for Both Google and AI Search in 2026",
    excerpt: "The complete beginner's guide to optimizing for traditional search engines AND AI platforms simultaneously. Learn the dual-optimization strategy every business needs.",
    category: "Beginner's Guide",
    badge: "START HERE",
    badgeColor: "#10B981",
    date: "March 17, 2026",
    readTime: "13 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: { name: "Beginner's Guide", part: 3, total: 5 },
  },
  {
    slug: "social-ads-101",
    title: "Social Media Ads 101: A Beginner's Guide to Running Paid Ads on Meta, TikTok, and LinkedIn in 2026",
    excerpt: "Learn how to create, target, and optimize paid social media campaigns across Meta, TikTok, and LinkedIn. Step-by-step guide for complete beginners.",
    category: "Beginner's Guide",
    badge: "START HERE",
    badgeColor: "#10B981",
    date: "March 17, 2026",
    readTime: "13 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: { name: "Beginner's Guide", part: 4, total: 5 },
  },
  {
    slug: "social-content-101",
    title: "Social Media Content 101: How to Create Posts That Actually Get Engagement in 2026",
    excerpt: "Learn what to post, when to post, and how to create content people actually engage with — no fancy equipment needed.",
    category: "Beginner's Guide",
    badge: "START HERE",
    badgeColor: "#10B981",
    date: "March 17, 2026",
    readTime: "14 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: { name: "Beginner's Guide", part: 5, total: 5 },
  },
  {
    slug: "agentic-ai-marketing-2026",
    title: "Agentic AI in Marketing: What It Is, Why It Matters, and How to Prepare in 2026",
    excerpt: "Agentic AI refers to autonomous AI systems that plan, reason, and take action toward complex marketing goals with minimal human intervention. Here's what every marketer needs to know.",
    category: "AI & Marketing",
    badge: "HOT NOW 🔥",
    badgeColor: "#E71840",
    date: "March 18, 2026",
    readTime: "13 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: null,
  },
  {
    slug: "chatgpt-ads-what-marketers-need-to-know-2026",
    title: "ChatGPT Now Has Ads: What This Means for Marketers and Your Brand in 2026",
    excerpt: "OpenAI launched advertising inside ChatGPT for Free and Go tier users. With 800M+ weekly users, ChatGPT is now a major ad platform. Here's what every marketer needs to know.",
    category: "AI & Advertising",
    badge: "BREAKING",
    badgeColor: "#EF4444",
    date: "March 18, 2026",
    readTime: "11 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: null,
  },
  {
    slug: "zero-click-search-death-of-the-click-2026",
    title: "The Death of the Click: How Zero-Click Search Is Reshaping Marketing Strategy in 2026",
    excerpt: "Zero-click search now affects nearly half of all Google searches. AI Overviews reduce organic clicks by up to 58%. Here's how to win when nobody clicks.",
    category: "Search Strategy",
    badge: "TRENDING",
    badgeColor: "#F59E0B",
    date: "March 18, 2026",
    readTime: "12 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: null,
  },
  {
    slug: "micro-communities-new-marketing-channel-2026",
    title: "Micro-Communities Are the New Marketing Channel: How Small Audiences Drive Big Results in 2026",
    excerpt: "Mass social media reach is declining while micro-communities on Reddit, Discord, and Substack deliver 25% higher ROI. The shift is from broadcasting to belonging.",
    category: "Social Media & Strategy",
    badge: "IN-DEPTH DIVE",
    badgeColor: "#3B82F6",
    date: "March 18, 2026",
    readTime: "11 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: null,
  },
  {
    slug: "ai-is-your-next-customer-marketing-to-machines-2026",
    title: "AI Is Your Next Customer: How to Market to Machines, Not Just People, in 2026",
    excerpt: "AI agents are shopping on behalf of consumers — comparing products, negotiating prices, and purchasing autonomously. If AI can't parse your data, your brand won't make the shortlist.",
    category: "AI & Strategy",
    badge: "MUST READ",
    badgeColor: "#8B5CF6",
    date: "March 18, 2026",
    readTime: "12 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: null,
  },
  {
    slug: "dallas-marketing-landscape-2026",
    title: "The Dallas Marketing Landscape in 2026: Trends, Opportunities, and What Local Businesses Need to Know",
    excerpt: "DFW is one of the most competitive marketing markets in the U.S. Here's how Dallas businesses can stay visible with AI search, GEO, local SEO, and community engagement in 2026.",
    category: "Dallas Marketing",
    badge: "LOCAL 📍",
    badgeColor: "#06B6D4",
    date: "March 18, 2026",
    readTime: "12 min read",
    author: "NIXAR Solutions Team",
    featured: false,
    series: null,
  },
];

export function getFeaturedPosts() {
  return blogPosts.filter((p) => p.featured);
}

export function getSeriesPosts() {
  return blogPosts.filter((p) => p.series !== null).sort((a, b) => a.series!.part - b.series!.part);
}

export function getMorePosts() {
  return blogPosts.filter((p) => !p.featured && p.series === null);
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = blogPosts.find((p) => p.slug === slug);
  if (!current) return blogPosts.slice(0, limit);
  return blogPosts
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}
