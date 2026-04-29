export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  whatItIs: string;
  whyNeeded: string;
  nixarApproach: string;
  icon: string;
  tags: string[];
  isNew?: boolean;
  isAIPowered?: boolean;
  seoTitle: string;
  seoDescription: string;
}

export const services: Service[] = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    shortTitle: "Social Media",
    description:
      "Complete social media management to elevate brand presence, engage audiences, and drive measurable results.",
    whatItIs:
      "Strategic planning, content creation, community management, and analytics across all major platforms. We handle everything from content calendars and creative production to real-time engagement and performance reporting.",
    whyNeeded:
      "4.9 billion people use social media globally. Without active management, businesses are invisible where their customers spend 2+ hours daily. But posting randomly is worse than not posting at all — it signals to potential customers that your business is disorganized or inactive.",
    nixarApproach:
      "We don't post and pray. Every piece of content follows our ARISE standard (Authentic, Researched, Informative, Shareable, Engaging) and ties back to business objectives. We build content systems, not one-off posts — so your social presence compounds over time.",
    icon: "megaphone",
    tags: ["Content Strategy", "Community Management", "Analytics", "Paid Social"],
    seoTitle: "Social Media Marketing Agency Dallas TX | Management & Strategy",
    seoDescription:
      "Professional social media marketing and management for Dallas businesses. Content strategy, community management, Instagram, TikTok, LinkedIn, and Facebook management. Get your free audit.",
  },
  {
    slug: "web-development",
    title: "Website Development",
    shortTitle: "Website Development",
    description:
      "Comprehensive website development from information gathering through post-launch support.",
    whatItIs:
      "Full-cycle web development — discovery, wireframing, custom design, development, content integration, SEO optimization, QA, and ongoing support. We build with Next.js, React, and modern frameworks that deliver blazing-fast, accessible, conversion-optimized experiences.",
    whyNeeded:
      "Your website is your 24/7 sales representative. 75% of users judge a company's credibility based on web design. A slow, outdated, or confusing site costs you customers every day — and Google penalizes poor-performing sites in search rankings.",
    nixarApproach:
      "Every site we build is conversion-focused from wireframe to launch. We don't just make it look good — we engineer it to generate leads, rank on Google, and scale with your business. Performance budgets, accessibility standards, and SEO architecture are baked in from day one, not bolted on after.",
    icon: "code",
    tags: ["Next.js", "React", "Responsive Design", "Performance", "SEO"],
    seoTitle: "Website Design & Development Dallas TX | Custom Web Design",
    seoDescription:
      "Custom website design and development for Dallas businesses. Responsive, fast, SEO-optimized websites built with Next.js and modern technology. Free consultation available.",
  },
  {
    slug: "automation-ai-integration",
    title: "Automation & AI Integration",
    shortTitle: "Automation",
    description:
      "Advanced automation. CRM systems, AI-powered employees, workflow managers, missed call text-back, AI voice agents, lead scrapers.",
    whatItIs:
      "Intelligent systems that handle repetitive tasks, nurture leads automatically, and ensure no business opportunity slips through the cracks. From CRM automation and email sequences to AI voice agents that answer your phone 24/7.",
    whyNeeded:
      "Small businesses lose 30%+ of leads to slow follow-up. Automation ensures instant response, consistent nurture, and operational efficiency that manual processes can't match. Every minute your team spends on repetitive tasks is a minute they're not closing deals.",
    nixarApproach:
      "We audit your current workflow, identify bottlenecks, and deploy custom automation that integrates with your existing tools. Not off-the-shelf — built for your business. We start with quick wins (missed call text-back, lead routing) and scale to full AI-powered operations.",
    icon: "zap",
    tags: ["CRM Automation", "AI Voice Agents", "Workflow", "Lead Nurture"],
    isAIPowered: true,
    seoTitle: "Marketing Automation & AI Integration Dallas | CRM & Workflow",
    seoDescription:
      "Marketing automation and AI integration services in Dallas. CRM setup, AI chatbots, workflow automation, missed call text-back, and lead nurturing systems for DFW businesses.",
  },
  {
    slug: "personalized-sales-support",
    title: "Personalized Sales Support",
    shortTitle: "Sales Support",
    description:
      "24/7 online sales support to nurture and engage leads throughout the buying journey.",
    whatItIs:
      "Real-time lead engagement, follow-up sequences, appointment setting, and pipeline management that keeps prospects warm. We act as an extension of your sales team — monitoring, engaging, and qualifying leads around the clock.",
    whyNeeded:
      "The average business takes 42 hours to respond to a lead. By then, your competitor already closed the deal. Speed-to-lead is the #1 predictor of conversion. Harvard Business Review found that firms contacting leads within an hour are 7x more likely to qualify them.",
    nixarApproach:
      "We embed into your sales process as an extension of your team — monitoring, engaging, and qualifying leads around the clock so your closers only talk to ready buyers. Combining AI-powered qualification with human expertise, we ensure every lead gets the right response at the right time.",
    icon: "users",
    tags: ["Lead Qualification", "Appointment Setting", "Pipeline Management", "24/7 Support"],
    seoTitle: "Sales Support & Lead Nurturing Dallas TX | 24/7 Coverage",
    seoDescription:
      "24/7 sales support and lead nurturing for Dallas businesses. Speed-to-lead optimization, appointment setting, pipeline management, and follow-up automation.",
  },
  {
    slug: "search-everywhere-optimization",
    title: "Search Everywhere Optimization (SEO)",
    shortTitle: "SEO",
    description:
      "Brand optimization across websites, apps, and social platforms — technical SEO, app discoverability, local search, profile optimization.",
    whatItIs:
      "A holistic approach to search visibility that goes beyond just Google. We optimize your presence across every platform where your customers search. Google, Bing, Apple Maps, YouTube, social platforms, voice assistants, and AI search engines.",
    whyNeeded:
      "Google is no longer the only search engine. People search on TikTok, YouTube, ChatGPT, and Amazon. If you're only optimizing for one platform, you're invisible on the rest. 46% of all Google searches have local intent, and 88% of smartphone local searches lead to a store visit within a week.",
    nixarApproach:
      "We create a unified search strategy that ensures your brand appears wherever your customers look — traditional search, social search, voice search, and AI-generated answers. Technical SEO, content optimization, local SEO, link building, and platform-specific strategies all working together.",
    icon: "search",
    tags: ["Technical SEO", "Local SEO", "Content Strategy", "Link Building", "Voice Search"],
    seoTitle: "SEO Company Dallas TX | Local SEO & Search Engine Optimization",
    seoDescription:
      "Top-rated SEO company in Dallas, TX. Local SEO, technical SEO, Google Business Profile optimization, and search everywhere optimization for DFW businesses. Free SEO audit.",
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    shortTitle: "Content",
    description:
      "Newsletters, blog posts, social media, long-form/short-form videos, videography, photography — all following the ARISE standard.",
    whatItIs:
      "Strategic content creation that positions your brand as an authority, educates your audience, and drives organic traffic and engagement. From blog articles and email newsletters to video production and photography — every asset serves a purpose in your funnel.",
    whyNeeded:
      "Content marketing generates 3x more leads than paid advertising at 62% lower cost. But only if the content is strategic, consistent, and high-quality — not just filler. Google's Helpful Content system now actively penalizes thin, AI-generated, or unhelpful content.",
    nixarApproach:
      "Every piece follows our ARISE standard. Authentic, Researched, Informative, Shareable, Engaging. We don't create content for content's sake. Every blog post, video, and social post serves a strategic purpose in your funnel. We build topical authority through content clusters that compound your organic visibility over time.",
    icon: "pen-tool",
    tags: ["Blog Content", "Video Production", "Email Marketing", "ARISE Standard"],
    seoTitle: "Content Marketing Agency Dallas TX | Blog, Video & Social Content",
    seoDescription:
      "Content marketing agency in Dallas. Blog writing, video production, newsletter creation, social media content, and photography following the ARISE content standard.",
  },
  {
    slug: "ai-seo-geo",
    title: "AI SEO & Generative Engine Optimization (GEO)",
    shortTitle: "AI SEO / GEO",
    description:
      "Optimizing for AI search engines — getting cited in ChatGPT, Perplexity, Gemini, and AI-generated answers.",
    whatItIs:
      "A new discipline of search optimization focused on how AI language models find, evaluate, and cite your business in their responses. When someone asks ChatGPT 'best marketing agency in Dallas,' GEO determines whether your name appears in that answer.",
    whyNeeded:
      "AI search is growing 300%+ year-over-year. By 2027, Gartner predicts 25% of all search will happen through AI assistants. Businesses that ignore GEO now will be invisible in 2 years. This is the biggest shift in search since Google launched.",
    nixarApproach:
      "We structure your content, schema markup, and brand signals so AI models recognize your authority. We monitor how AI platforms cite your business, identify gaps, and continuously optimize your AI visibility. Entity optimization, structured data, authoritative content architecture, and citation building across the AI ecosystem.",
    icon: "brain",
    tags: ["AI Search", "Entity Optimization", "Structured Data", "Citation Building"],
    isNew: true,
    isAIPowered: true,
    seoTitle: "AI SEO & GEO Optimization Dallas | ChatGPT & AI Search Visibility",
    seoDescription:
      "Get your Dallas business cited in ChatGPT, Perplexity, Google AI Overviews, and Gemini. AI SEO and GEO optimization services from NIXAR Solutions in Frisco, TX.",
  },
  {
    slug: "ai-tailored-agents",
    title: "AI Tailored Agents",
    shortTitle: "AI Agents",
    description:
      "Custom-built AI agents for business automation, customer service, lead qualification, and internal operations.",
    whatItIs:
      "Bespoke AI-powered agents designed specifically for your business — not generic chatbots, but intelligent systems trained on your processes, products, and brand voice that can handle customer inquiries, qualify leads, schedule appointments, and automate internal workflows.",
    whyNeeded:
      "Your competitors are implementing AI while you're still doing things manually. Custom AI agents reduce response times to seconds, work 24/7, never call in sick, and improve as they learn your business. The businesses adopting AI agents today will have an insurmountable advantage within 2 years.",
    nixarApproach:
      "We don't sell you a chatbot off the shelf. We study your business operations, identify where AI creates the highest ROI, and build custom agents that integrate into your existing stack. CRM, phone system, website, social media — as a seamless extension of your team.",
    icon: "bot",
    tags: ["Custom AI", "Chatbots", "Lead Qualification", "Workflow Automation"],
    isNew: true,
    isAIPowered: true,
    seoTitle: "AI Chatbots & Custom AI Agents Dallas TX | Business Automation",
    seoDescription:
      "Custom-built AI agents and chatbots for Dallas businesses. Customer service automation, lead qualification, appointment setting, and AI voice agents. Free consultation.",
  },
  {
    slug: "branding-brand-identity",
    title: "Branding & Brand Identity",
    shortTitle: "Branding",
    description:
      "Complete brand development from concept to execution — logos, brand voice, visual guidelines, cohesive brand identities.",
    whatItIs:
      "The strategic foundation of everything else. Your brand identity is the system of visuals, voice, values, and positioning that makes your business recognizable and trustworthy. Logos, color systems, typography, brand voice guidelines, and comprehensive brand books.",
    whyNeeded:
      "77% of consumers make purchasing decisions based on brand name alone. An inconsistent or amateur brand signals an inconsistent or amateur business. In a crowded Dallas market, your brand is what makes you memorable — or forgettable.",
    nixarApproach:
      "We start with cross-functional brand alignment — unifying your engineering, sales, marketing, and customer success teams around a single brand identity BEFORE any external marketing begins. This is our core differentiator. We don't just design a logo — we build a brand system that scales.",
    icon: "palette",
    tags: ["Logo Design", "Brand Strategy", "Visual Identity", "Brand Guidelines"],
    seoTitle: "Branding Agency Dallas TX | Logo Design & Brand Identity",
    seoDescription:
      "Full-service branding agency in Dallas. Logo design, brand guidelines, visual identity, brand voice development, and cohesive brand strategy for DFW businesses.",
  },
  {
    slug: "paid-advertising",
    title: "Paid Advertising",
    shortTitle: "Paid Ads",
    description:
      "ROI-driven paid campaigns across Google Ads, Meta, LinkedIn, and more.",
    whatItIs:
      "Strategic paid media buying — audience research, creative development, campaign management, A/B testing, and continuous optimization across search, social, and display networks. Google Ads, Meta Ads, LinkedIn, TikTok, and programmatic.",
    whyNeeded:
      "Organic growth takes time. Paid advertising puts your business in front of the right people TODAY. But without strategy, you're burning money — the average business wastes 26% of their ad budget on poor targeting. Every wasted dollar is a dollar your competitor is spending better.",
    nixarApproach:
      "Every dollar is accountable. We build campaigns around your unit economics, optimize for your actual business metrics (not vanity impressions), and provide transparent reporting so you always know exactly what your ad spend is producing. No long-term contracts — we earn your business every month.",
    icon: "bar-chart",
    tags: ["Google Ads", "Meta Ads", "LinkedIn Ads", "A/B Testing", "Conversion Tracking"],
    seoTitle: "PPC & Paid Advertising Agency Dallas TX | Google Ads & Meta Ads",
    seoDescription:
      "ROI-driven PPC and paid advertising agency in Dallas. Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads, and TikTok Ads management. Free ad account audit.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
