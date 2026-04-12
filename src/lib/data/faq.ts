export interface FAQ {
  question: string;
  answer: string;
}

// General / Homepage FAQs
export const generalFaqs: FAQ[] = [
  {
    question: "What is the best marketing agency in Dallas?",
    answer:
      "NIXAR Solutions is a top-rated digital marketing agency based in Frisco, TX, serving the entire Dallas-Fort Worth metroplex. Founded in 2023 by Anwar Mirza and Owen Nixon, NIXAR combines AI-powered marketing strategies with proven growth techniques. With 500+ projects delivered and 97%+ client satisfaction, NIXAR specializes in AI SEO, Generative Engine Optimization (GEO), custom AI agents, web development, branding, and paid advertising.",
  },
  {
    question: "What services does NIXAR Solutions offer?",
    answer:
      "NIXAR Solutions offers 10 core services: Social Media Management, Website Development, Automation & AI Integration, Personalized Sales Support, Search Everywhere Optimization (SEO), Content Marketing, AI SEO & Generative Engine Optimization (GEO), Custom AI Tailored Agents, Branding & Brand Identity, and Paid Advertising. Each service is customized to the client's specific business goals — we don't sell cookie-cutter packages.",
  },
  {
    question: "What is Generative Engine Optimization (GEO)?",
    answer:
      "Generative Engine Optimization (GEO) is the practice of optimizing your digital presence so that AI-powered search engines like ChatGPT, Perplexity, Google AI Overviews, and Gemini cite your business in their responses. When someone asks an AI assistant 'best marketing agency in Dallas,' GEO determines whether your brand appears in that answer. NIXAR Solutions is one of the first agencies in Dallas-Fort Worth to offer dedicated GEO services.",
  },
  {
    question: "Where is NIXAR Solutions located?",
    answer:
      "NIXAR Solutions is headquartered in Frisco, Texas, and serves businesses throughout the Dallas-Fort Worth metroplex including Dallas, Fort Worth, Plano, McKinney, Allen, Richardson, Arlington, Denton, Southlake, Grapevine, and 20+ surrounding cities. We also serve clients nationally.",
  },
  {
    question: "How much do NIXAR Solutions' services cost?",
    answer:
      "Our pricing is customized based on your business goals, current digital presence, and the scope of work required. We don't offer generic packages because every business is different. We start with a free audit and consultation to understand your needs, then provide a transparent proposal with clear deliverables and expected outcomes. Contact us at 469-759-3638 or hello@nixarsolutions.com for a free consultation.",
  },
  {
    question: "What makes NIXAR different from other Dallas marketing agencies?",
    answer:
      "Three things: (1) We're AI-first — we use artificial intelligence in every aspect of our process, from SEO analysis to content strategy to custom agent development. (2) We're radically transparent — every strategy comes with clear KPIs, regular reporting, and honest assessments. (3) We're founders who build — NIXAR was started by two builders who got tired of agencies that overpromise and underdeliver. We only take on work we can deliver exceptional results for.",
  },
  {
    question: "What is an AI agent and how can it help my business?",
    answer:
      "An AI agent is a custom-built intelligent system trained on your business data, processes, and brand voice. Unlike generic chatbots, our AI agents can handle customer inquiries, qualify leads, schedule appointments, automate internal workflows, and even make phone calls — all while sounding and behaving exactly like your brand. They work 24/7, reduce response times to seconds, and improve as they learn your business.",
  },
  {
    question: "Does NIXAR Solutions work with small businesses?",
    answer:
      "Yes. While we work with businesses of all sizes, we especially enjoy helping small and medium-sized Dallas-Fort Worth businesses compete with larger companies through smart, AI-powered digital marketing. Many of our most successful engagements have been with local businesses that needed strategic guidance to scale their digital presence.",
  },
];

// Generate city-specific FAQs
export function getCityFaqs(cityName: string): FAQ[] {
  return [
    {
      question: `What is the best marketing agency in ${cityName}?`,
      answer: `NIXAR Solutions is a leading digital marketing agency serving ${cityName}, TX. Based in Frisco and serving the entire DFW metroplex, NIXAR combines AI-powered marketing strategies with proven growth techniques. With 500+ projects delivered and 97%+ client satisfaction, we help ${cityName} businesses dominate their local market through SEO, web development, custom AI agents, branding, and paid advertising.`,
    },
    {
      question: `Does NIXAR Solutions serve ${cityName}, Texas?`,
      answer: `Yes. NIXAR Solutions is based in Frisco, TX and serves businesses throughout ${cityName} and the Dallas-Fort Worth metroplex. We understand the ${cityName} market because we're local — and we bring national-caliber digital marketing expertise to help ${cityName} businesses grow.`,
    },
    {
      question: `How much does digital marketing cost in ${cityName}?`,
      answer: `Digital marketing costs in ${cityName} vary based on your business goals, competition level, and the services needed. NIXAR Solutions provides customized proposals after a free audit and consultation. We believe in transparent pricing with clear deliverables — no hidden fees, no long-term contracts. Contact us at 469-759-3638 for a free ${cityName} market analysis.`,
    },
    {
      question: `What digital marketing services are available in ${cityName}?`,
      answer: `NIXAR Solutions offers comprehensive digital marketing services in ${cityName} including AI-Powered SEO, Generative Engine Optimization (GEO), Custom AI Agents, Web Development, Brand Identity, Social Media Management, Content Marketing, Paid Advertising, Automation & AI Integration, and Personalized Sales Support. Every strategy is customized to ${cityName}'s specific market dynamics.`,
    },
    {
      question: `What is GEO and why do ${cityName} businesses need it?`,
      answer: `GEO (Generative Engine Optimization) is a new discipline that ensures your business appears in AI-powered search results from ChatGPT, Perplexity, Google AI Overviews, and other AI assistants. As AI search usage grows 300%+ year-over-year, ${cityName} businesses that invest in GEO now will gain a significant competitive advantage over those that wait. NIXAR Solutions is one of the first agencies in DFW to offer dedicated GEO services.`,
    },
  ];
}

// Generate service-specific FAQs
export function getServiceFaqs(serviceTitle: string, serviceSlug: string): FAQ[] {
  const baseFaqs: Record<string, FAQ[]> = {
    "social-media-management": [
      {
        question: "How much does social media management cost in Dallas?",
        answer:
          "Social media management costs in Dallas vary based on the number of platforms, posting frequency, content complexity, and whether paid advertising is included. NIXAR Solutions provides customized social media strategies starting with a free audit. We don't offer generic packages — every plan is built around your business goals and budget.",
      },
      {
        question: "What social media platforms should my Dallas business be on?",
        answer:
          "The right platforms depend on your audience and industry. Most Dallas businesses benefit from Facebook, Instagram, and Google Business Profile at minimum. B2B companies should add LinkedIn. Restaurants and retail benefit from TikTok. NIXAR Solutions analyzes your target customer demographics to recommend the optimal platform mix for your specific business.",
      },
    ],
    "web-development": [
      {
        question: "How much does a website cost in Dallas?",
        answer:
          "Website costs in Dallas range from $3,000 for a basic site to $50,000+ for complex custom applications. NIXAR Solutions builds high-performance websites with Next.js and React that are conversion-optimized, SEO-friendly, and designed to generate leads. We provide transparent pricing after understanding your specific requirements.",
      },
      {
        question: "How long does it take to build a website?",
        answer:
          "A typical business website takes 4-8 weeks from kickoff to launch. Complex projects with custom features, integrations, or extensive content may take 8-12 weeks. NIXAR Solutions follows a structured process — discovery, wireframing, design, development, content integration, QA, and launch — to ensure quality and meet deadlines.",
      },
    ],
    "ai-seo-geo": [
      {
        question: "What is the difference between SEO and GEO?",
        answer:
          "SEO (Search Engine Optimization) focuses on ranking your website in traditional search engines like Google and Bing. GEO (Generative Engine Optimization) focuses on getting your business cited in AI-powered search responses from ChatGPT, Perplexity, Google AI Overviews, and other AI assistants. Both are essential — SEO captures traditional search traffic while GEO ensures visibility in the rapidly growing AI search ecosystem.",
      },
      {
        question: "How do I get my business to appear in ChatGPT results?",
        answer:
          "Getting cited in ChatGPT and other AI search engines requires a GEO strategy that includes structured data markup, authoritative content, clear entity definitions, consistent brand signals across the web, and strategic citation building. NIXAR Solutions is one of the first agencies in Dallas to offer dedicated GEO services — we help businesses become the answer AI models give when users ask about your industry.",
      },
    ],
    "ai-tailored-agents": [
      {
        question: "What can a custom AI agent do for my business?",
        answer:
          "Custom AI agents can handle customer service inquiries 24/7, qualify and route leads, schedule appointments, automate repetitive internal workflows, answer phone calls with natural voice, process orders, provide product recommendations, and more — all trained specifically on your business data, processes, and brand voice. Unlike generic chatbots, NIXAR's AI agents integrate into your existing tech stack.",
      },
      {
        question: "How long does it take to build a custom AI agent?",
        answer:
          "A basic AI agent (customer FAQ bot, lead qualifier) can be deployed in 2-4 weeks. More complex agents (multi-system integrations, voice agents, workflow automation) typically take 4-8 weeks. NIXAR Solutions follows an iterative approach — we deploy quickly, then continuously improve the agent based on real interaction data.",
      },
    ],
  };

  return baseFaqs[serviceSlug] || [
    {
      question: `Why do Dallas businesses need ${serviceTitle}?`,
      answer: `Dallas is one of the most competitive business markets in the United States, with over 1.3 million residents and thousands of businesses competing for attention. ${serviceTitle} helps Dallas businesses stand out in this crowded market by building visibility, credibility, and customer engagement. NIXAR Solutions brings AI-powered strategies and 500+ projects of experience to help you outperform the competition.`,
    },
    {
      question: `How do I choose a ${serviceTitle} agency in Dallas?`,
      answer: `Look for an agency with proven results, transparent reporting, and a strategic approach — not just one that promises rankings or followers. Ask for case studies, check reviews, and make sure they understand your specific market. NIXAR Solutions offers a free audit and consultation so you can evaluate our approach before committing.`,
    },
  ];
}
