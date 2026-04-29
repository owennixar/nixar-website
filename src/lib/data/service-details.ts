/**
 * Extended service page content. unique educational copy for each service.
 * Each service gets: deep explanation, deliverables list, and layout variant.
 */

export interface ServiceDetail {
  /** 2-3 paragraph educational "What Is" section */
  whatIsExtended: string[];
  /** 2-3 paragraph "Why You Need This" section */
  whyExtended: string[];
  /** 2-3 paragraph "NIXAR's Approach" section */
  approachExtended: string[];
  /** Bulleted deliverables */
  deliverables: string[];
  /** Layout variant to make pages feel different */
  layout: "standard" | "reversed" | "centered" | "wide";
  /** Index into testimonials array (0-2), or null */
  testimonialIndex: number | null;
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "social-media-management": {
    whatIsExtended: [
      "Social media management is the strategic practice of creating, scheduling, publishing, and analyzing content across platforms like Instagram, TikTok, LinkedIn, Facebook, and YouTube to build brand awareness, engage audiences, and drive measurable business results. It encompasses content strategy, community management, paid social advertising, analytics reporting, and reputation management.",
      "Think of it this way: your social media profiles are storefronts. Just as you would never leave a physical store unstaffed with dusty shelves, your online presence demands the same level of care and strategic thought. Every post, reply, and story is an interaction with a potential customer.",
      "At its core, social media management aligns your online voice with your business objectives. Whether the goal is brand awareness, lead generation, customer retention, or community building, every piece of content is crafted with intent and measured against outcomes — not vanity metrics.",
    ],
    whyExtended: [
      "4.9 billion people actively use social media worldwide, and the average person spends over two hours per day scrolling through feeds. If your business is not present — or worse, posting inconsistently — you are invisible in the space where your customers spend a significant portion of their waking hours.",
      "Random, sporadic posting is actually more damaging than silence. It signals to potential customers that your business is disorganized, unserious, or possibly even closed. In the Dallas-Fort Worth market, where local competition is fierce across every industry, your social media presence is often the first impression a customer has of your brand.",
      "Businesses that invest in strategic social media management see 3x higher lead generation rates compared to those relying on ad hoc posting. The compounding effect is critical — consistent, quality content builds algorithmic momentum that makes every subsequent post more visible.",
    ],
    approachExtended: [
      "Every piece of content we produce follows our ARISE standard: Authentic, Researched, Informative, Shareable, Engaging. This is not a buzzword — it is a production framework that every asset is evaluated against before publication. Content that does not meet the standard does not go live.",
      "We build content systems, not one-off posts. Monthly content calendars are developed in collaboration with your team, aligned to seasonal trends, business priorities, and audience behavior data. We handle creative production, copywriting, scheduling, community management, and monthly performance reporting.",
      "What sets NIXAR apart is accountability. We do not hide behind impressions and reach metrics. Every monthly report shows how social activity connects to leads, website visits, and revenue. If something is not working, we change it — fast.",
    ],
    deliverables: [
      "Custom content calendar with 15-30 posts per month",
      "Platform-specific creative production (graphics, reels, stories)",
      "Community management and real-time engagement",
      "Monthly analytics reporting with ROI tracking",
      "Competitor monitoring and trend analysis",
      "Paid social campaign management (optional add-on)",
    ],
    layout: "standard",
    testimonialIndex: 1,
  },

  "web-development": {
    whatIsExtended: [
      "Website development is the full-cycle process of designing, building, and launching custom websites that serve as high-performance business tools — not just digital brochures. Modern website development uses frameworks like Next.js and React to deliver sub-second page loads, seamless interactions, built-in SEO architecture, and conversion-optimized user experiences.",
      "At NIXAR, we build websites that are conversion machines. Every pixel, every interaction, every page load time is engineered to move visitors toward a business outcome — whether that is filling out a contact form, making a purchase, or booking a consultation. Design is not decoration; it is strategy made visible.",
      "Our development process covers the full lifecycle: discovery and stakeholder interviews, information architecture, wireframing, visual design, front-end and back-end development, content integration, SEO optimization, QA testing, launch, and ongoing support.",
    ],
    whyExtended: [
      "Your website is your 24/7 sales representative. It works when you sleep, handles multiple conversations simultaneously, and never has a bad day. Yet 75% of users judge a company's credibility based entirely on its web design. A slow, outdated, or confusing site does not just lose visitors — it actively damages your brand.",
      "In the Dallas-Fort Worth market, where businesses compete against both local companies and national brands, your website needs to do more than exist. It needs to load faster than your competitor's, rank higher on Google, convert more visitors into leads, and communicate your value proposition in under three seconds.",
      "The cost of a poor website is not just lost traffic — it is compounded across every marketing dollar you spend. Every ad, every social post, every email that drives traffic to a bad website is wasted money. Fixing the website is the single highest-ROI marketing investment most businesses can make.",
    ],
    approachExtended: [
      "We build exclusively with modern frameworks. Next.js, React, TypeScript, and Tailwind CSS. These are not trendy choices; they are engineering decisions that deliver measurable performance advantages: server-side rendering for SEO, static generation for speed, and component architecture for maintainability.",
      "Every project begins with a conversion audit. Before we design a single page, we analyze your current site's performance, heatmaps, user flows, and conversion bottlenecks. The design phase is informed by data, not just aesthetics. We wireframe, prototype, and test before writing a line of code.",
      "Post-launch, we do not disappear. Every site includes 30 days of support, performance monitoring, and iterative optimization based on real user data. We treat your website as a living product that improves continuously, not a project that ends at launch.",
    ],
    deliverables: [
      "Custom responsive design (mobile-first approach)",
      "Next.js / React development with TypeScript",
      "On-page SEO optimization and schema markup",
      "Performance optimization (Core Web Vitals targets)",
      "Content management system integration",
      "Analytics and conversion tracking setup",
      "30-day post-launch support and optimization",
      "Accessibility compliance (WCAG 2.1 AA)",
    ],
    layout: "reversed",
    testimonialIndex: 2,
  },

  "automation-ai-integration": {
    whatIsExtended: [
      "Business automation is the practice of using technology to handle repetitive, time-consuming tasks that currently require manual effort. AI integration takes this further — instead of following rigid rules, AI-powered automation can understand context, make decisions, and improve over time based on outcomes.",
      "Imagine never losing a lead because someone forgot to follow up. Imagine every phone call answered on the first ring, every inquiry receiving an instant, personalized response, and every customer interaction logged and analyzed automatically. That is what modern automation delivers.",
      "At NIXAR, we build automation systems that range from simple (missed call text-back, appointment reminders) to complex (AI voice agents that handle full phone conversations, lead scoring algorithms that prioritize your sales team's time, and multi-step nurture sequences that adapt based on prospect behavior).",
    ],
    whyExtended: [
      "Small businesses lose over 30% of leads to slow follow-up. The data is clear: if you do not respond to a lead within five minutes, you are 10x less likely to ever reach them. Most businesses take 42 hours. By then, your competitor has already closed the deal.",
      "Beyond lead response, think about the hours your team spends on repetitive tasks — data entry, appointment scheduling, follow-up emails, status updates. Every minute spent on tasks a machine could handle is a minute your team is not closing deals, building relationships, or doing creative work.",
      "Automation is not about replacing people. It is about removing the tasks that waste their talent. When your sales team only talks to qualified, engaged prospects instead of cold-calling lists, conversion rates skyrocket and morale improves. When your operations run themselves overnight, you wake up to progress instead of a backlog.",
    ],
    approachExtended: [
      "We start every automation engagement with a workflow audit. We map your current processes — every step, every handoff, every bottleneck — before recommending solutions. This prevents the common mistake of automating a broken process, which just creates faster failures.",
      "Implementation is phased. We start with quick wins that generate immediate ROI: missed call text-back (so no lead goes unanswered), automated appointment confirmations (reducing no-shows by 30-50%), and basic lead routing. Once these are running and generating results, we scale to more complex systems.",
      "Every automation we build integrates with your existing tools. We are not replacing your CRM, your phone system, or your email platform — we are connecting them into an intelligent ecosystem where data flows automatically and nothing falls through the cracks.",
    ],
    deliverables: [
      "Workflow audit and automation roadmap",
      "CRM automation setup and configuration",
      "Missed call text-back system",
      "Automated appointment scheduling and reminders",
      "Lead scoring and routing automation",
      "Email and SMS nurture sequences",
      "AI voice agent deployment (advanced tier)",
      "Monthly optimization and reporting",
    ],
    layout: "centered",
    testimonialIndex: null,
  },

  "personalized-sales-support": {
    whatIsExtended: [
      "Personalized sales support is the practice of providing real-time, human-quality engagement with your leads and prospects throughout their entire buying journey — from initial inquiry to closed deal. Unlike a traditional call center, this is strategic sales engagement backed by technology and data.",
      "Think of NIXAR as an extension of your sales team that never sleeps. We monitor your inbound leads across every channel — website forms, phone calls, social media DMs, email inquiries — and engage each one within minutes, not hours or days. Speed is everything in sales.",
      "Our approach combines AI-powered lead qualification with human expertise. AI handles the initial response and data gathering. Qualified leads are routed to the right person on your team with full context. The result: your closers only spend time with prospects who are ready to buy.",
    ],
    whyExtended: [
      "Harvard Business Review found that firms contacting leads within one hour are 7x more likely to qualify them than firms that wait even one hour longer — and 60x more likely than firms that wait 24 hours. Yet the average business response time is 42 hours. That gap is where deals die.",
      "The math is brutal: if you generate 100 leads per month and respond to them an average of 24 hours later, you are losing approximately 40-60% of those leads to competitors who responded faster. At a customer lifetime value of even $5,000, that is $200,000-$300,000 in lost revenue annually.",
      "Most business owners know they need to respond faster. The problem is bandwidth. You cannot answer every call immediately, respond to every form fill within minutes, and follow up consistently with every prospect while also running the business. That is exactly the gap we fill.",
    ],
    approachExtended: [
      "We embed into your sales process seamlessly. During onboarding, we learn your products, services, pricing, qualification criteria, and brand voice so thoroughly that leads cannot tell the difference between our team and yours. Every interaction is on-brand and on-script.",
      "The technology layer is critical. We set up real-time notifications, CRM integration, lead scoring, and automated nurture sequences so nothing falls through the cracks. Every touchpoint is logged, every conversation is summarized, and every qualified lead is handed off with full context.",
      "We measure everything: response time, qualification rate, appointment set rate, close rate. Monthly reports show exactly how sales support is impacting your pipeline and revenue. If a tactic is not converting, we iterate quickly.",
    ],
    deliverables: [
      "Lead monitoring across all inbound channels",
      "Sub-5-minute initial response time",
      "AI-powered lead qualification and scoring",
      "Appointment setting and calendar management",
      "CRM pipeline management and updates",
      "Follow-up sequences for unqualified leads",
      "Weekly pipeline reports and performance metrics",
      "Dedicated account manager",
    ],
    layout: "wide",
    testimonialIndex: null,
  },

  "search-everywhere-optimization": {
    whatIsExtended: [
      "Search Engine Optimization in 2024 is fundamentally different from what it was even two years ago. The concept of Search Everywhere Optimization reflects this reality: your customers do not just search on Google anymore. They search on TikTok for restaurants, YouTube for tutorials, Amazon for products, Apple Maps for directions, and ChatGPT for recommendations.",
      "A modern SEO strategy must account for all of these platforms simultaneously. Technical SEO ensures your website loads fast and is properly indexed. Content optimization ensures your pages answer the questions your audience is asking. Local SEO ensures you appear in map packs and 'near me' searches. And increasingly, AI search optimization ensures you get cited in AI-generated responses.",
      "At NIXAR, we practice Search Everywhere Optimization — a unified strategy that ensures your brand is visible wherever your customers look, not just on one platform.",
    ],
    whyExtended: [
      "46% of all Google searches have local intent. 88% of smartphone searches for local businesses result in a call or visit within one week. For Dallas-Fort Worth businesses, local SEO is not optional — it is the single most cost-effective customer acquisition channel available.",
      "But Google is only part of the picture. Gen Z searches TikTok more than Google for discovery. ChatGPT and Perplexity are replacing Google for research queries. YouTube is the second-largest search engine in the world. If your SEO strategy only targets Google, you are invisible on every other platform where your customers are actively searching.",
      "The businesses that invest in comprehensive search optimization today will dominate their markets for years. SEO is a compounding asset — unlike paid ads that stop the moment you stop paying, organic search visibility builds over time and generates leads month after month at near-zero marginal cost.",
    ],
    approachExtended: [
      "Every engagement starts with a comprehensive audit: technical health, content gaps, keyword opportunities, backlink profile, local presence, competitor analysis, and AI search visibility. This audit produces a prioritized roadmap — we start with the highest-impact items first.",
      "Our technical SEO team handles site speed optimization, schema markup implementation, crawl budget management, Core Web Vitals improvements, and mobile optimization. These are the foundational elements that determine whether Google even considers your pages for ranking.",
      "Content strategy is driven by data. We identify the exact queries your ideal customers are searching for, map them to your services, and build content that answers those queries better than anything currently ranking. Every piece of content is optimized for both human readers and search algorithms — including AI search engines that are increasingly driving referral traffic.",
    ],
    deliverables: [
      "Comprehensive SEO audit and strategy roadmap",
      "Technical SEO optimization (Core Web Vitals, schema, speed)",
      "On-page optimization for target keywords",
      "Local SEO and Google Business Profile optimization",
      "Content strategy and creation (blog, landing pages)",
      "Backlink building and digital PR",
      "Monthly ranking reports and traffic analysis",
      "Competitive monitoring and opportunity alerts",
    ],
    layout: "standard",
    testimonialIndex: 1,
  },

  "content-marketing": {
    whatIsExtended: [
      "Content marketing is the strategic practice of creating and distributing valuable, relevant content to attract and retain a clearly defined audience — and ultimately drive profitable customer action. It is not blogging. It is not posting on social media. It is the engine that powers every other marketing channel.",
      "When done correctly, content marketing builds topical authority. Google and AI search engines begin to recognize your brand as the definitive source on your topics. This authority compounds over time: each piece of quality content makes the next one more visible. It is the most powerful long-term growth strategy in digital marketing.",
      "NIXAR's content operation covers the full spectrum: blog articles, email newsletters, social media content, long-form and short-form video, photography, and interactive content. Every asset follows our ARISE standard and is designed to serve a specific purpose in your marketing funnel — awareness, consideration, or conversion.",
    ],
    whyExtended: [
      "Content marketing generates 3x more leads than paid advertising at 62% lower cost per lead. These are not theoretical numbers — they are borne out across thousands of businesses and multiple studies. The reason is simple: content builds trust before you ever ask for a sale.",
      "Google's Helpful Content system now actively penalizes websites with thin, unhelpful, or mass-produced AI content. Businesses that invested in quality content are being rewarded with higher rankings, while those that took shortcuts are losing visibility. The quality bar has never been higher — and that benefits businesses willing to invest in real content.",
      "In the Dallas-Fort Worth market, most businesses are still treating content as an afterthought — occasional blog posts, inconsistent social media, no email strategy. This creates a massive opportunity for businesses willing to commit to a strategic content operation. The gap between businesses with a content strategy and those without grows wider every month.",
    ],
    approachExtended: [
      "The ARISE standard is not a marketing slogan — it is a production framework. Every piece of content is evaluated against five criteria before publication: Is it Authentic to your brand voice? Is it Researched with data and sources? Is it Informative and valuable to the reader? Is it Shareable — would someone send this to a colleague? Is it Engaging — does it hold attention and drive action?",
      "We build content clusters, not disconnected posts. A content cluster groups related pieces around a pillar topic, creating a web of internally linked content that signals topical authority to search engines. Over time, this approach makes your entire site more visible for your core topics.",
      "Distribution is as important as creation. Every piece of content is optimized for its primary channel and repurposed across secondary channels. A long-form blog post becomes a LinkedIn article, a Twitter thread, an email segment, and a series of social graphics. One production effort generates impact across every platform.",
    ],
    deliverables: [
      "Content strategy and editorial calendar",
      "4-8 SEO-optimized blog posts per month",
      "Email newsletter design and copywriting",
      "Social media content creation and scheduling",
      "Video production (short-form and long-form)",
      "Content performance analytics and reporting",
      "Topic cluster development for SEO authority",
      "Content repurposing across channels",
    ],
    layout: "reversed",
    testimonialIndex: null,
  },

  "ai-seo-geo": {
    whatIsExtended: [
      "Generative Engine Optimization — GEO — is an entirely new discipline that has emerged alongside the rapid adoption of AI-powered search. When a user asks ChatGPT, Perplexity, Google AI Overviews, or any other AI assistant a question like 'best marketing agency in Dallas,' the AI model draws from its training data and real-time web access to formulate an answer. GEO is the practice of ensuring your business is one of the answers.",
      "This is fundamentally different from traditional SEO. In traditional search, you optimize to rank on a results page. In AI search, there is no results page — there is an answer. And that answer typically cites only 3-5 sources. If your business is not one of those sources, you are completely invisible in that interaction.",
      "GEO involves a combination of entity optimization (making sure AI models understand what your business is), structured data implementation (providing machine-readable context about your services), authoritative content creation (becoming a source AI models trust), and citation building (ensuring your brand appears in the web content AI models reference).",
    ],
    whyExtended: [
      "AI search usage is growing 300%+ year-over-year. Gartner predicts that by 2027, 25% of all search queries will happen through AI assistants rather than traditional search engines. ChatGPT alone has over 200 million weekly active users. This is the biggest shift in search behavior since Google launched in 1998.",
      "The window for early adopters is closing. Right now, most businesses are doing nothing to optimize for AI search — which means businesses that start now will have a significant head start. Within 2-3 years, GEO will be as standard as SEO is today, and the early movers will have already established their presence in AI model responses.",
      "Here is the critical insight: AI models form opinions about brands based on the content they encounter during training and real-time retrieval. If your business has no structured data, no authoritative content, and no consistent brand signals across the web, AI models will simply skip you. You will not rank poorly — you will not exist in their responses at all.",
    ],
    approachExtended: [
      "Our GEO process starts with an AI visibility audit. We query major AI models about your industry, your competitors, and your specific services to establish a baseline of how (and whether) you currently appear in AI-generated responses. This reveals exact gaps and opportunities.",
      "Entity optimization is the foundation. We ensure your business has clear, consistent, machine-readable definitions across the web — structured data on your website, comprehensive knowledge panels, consistent NAP (Name, Address, Phone) citations, and authoritative mentions on trusted platforms. AI models need to understand what your business is before they can recommend it.",
      "Content architecture for GEO is distinct from traditional SEO content. AI models favor content that directly answers specific questions, cites data and sources, demonstrates expertise, and is structured with clear headings and schema markup. We build content specifically designed to be cited by AI models — authoritative, well-structured, and information-rich.",
    ],
    deliverables: [
      "AI visibility audit across ChatGPT, Perplexity, Gemini, and Google AI Overviews",
      "Entity optimization and knowledge graph enhancement",
      "Comprehensive structured data / schema markup implementation",
      "AI-optimized content strategy and creation",
      "Citation building across authoritative platforms",
      "Monthly AI search monitoring and position tracking",
      "Competitive AI visibility analysis",
      "Quarterly strategy reviews and optimization",
    ],
    layout: "centered",
    testimonialIndex: null,
  },

  "ai-tailored-agents": {
    whatIsExtended: [
      "An AI agent is not a chatbot. Traditional chatbots follow decision trees — if the user says X, respond with Y. They break the moment a conversation goes off-script. AI agents, by contrast, understand natural language, reason about context, and generate intelligent responses based on your business data, processes, and brand voice.",
      "Think of an AI agent as a new team member who knows your product catalog inside and out, never forgets a detail, works 24/7, handles unlimited simultaneous conversations, and gets better every day. They can answer complex customer questions, qualify leads against your criteria, schedule appointments into your calendar, escalate to human team members when appropriate, and even make outbound phone calls.",
      "At NIXAR, we build custom AI agents from scratch for each client. We do not resell white-label bot platforms. Every agent is trained on your specific business data — your products, your pricing, your processes, your FAQs, your brand voice — and integrated into your existing technology stack.",
    ],
    whyExtended: [
      "The adoption of AI agents in business is accelerating faster than any previous technology shift. Companies implementing custom AI agents are seeing 40-60% reductions in response times, 25-35% increases in lead qualification rates, and significant operational cost savings. The businesses deploying AI agents today will have an insurmountable competitive advantage within 2-3 years.",
      "Consider the economics: a human sales development representative costs $50,000-$70,000 per year, handles one conversation at a time, works 8 hours a day, and has good days and bad days. An AI agent costs a fraction of that, handles unlimited simultaneous conversations, works 24/7/365, and delivers consistent quality every interaction.",
      "This is not about replacing your team — it is about augmenting them. Your best salespeople should be closing deals, not answering the same FAQ for the hundredth time. Your customer service team should be solving complex problems, not handling routine inquiries. AI agents handle the volume so your humans can do the work that requires human judgment and empathy.",
    ],
    approachExtended: [
      "Every engagement starts with a business operations audit. We identify the highest-ROI opportunities for AI agent deployment — where are leads being lost, where are team members spending time on repetitive tasks, where are response times creating friction? This audit produces a prioritized deployment plan.",
      "Agent development follows an iterative process. We build a minimum viable agent, deploy it in a controlled environment, monitor its performance, and refine continuously. This approach means you start seeing value within weeks, not months, and the agent improves every day based on real interaction data.",
      "Integration is where most AI agent projects fail — and where NIXAR excels. Our agents plug into your CRM, phone system, website chat, social media DMs, appointment calendar, and internal tools. Data flows bidirectionally: the agent learns from your systems and updates them in real-time. No manual data entry, no disconnected silos.",
    ],
    deliverables: [
      "Business operations audit and AI opportunity assessment",
      "Custom AI agent design and development",
      "Training on your business data, products, and processes",
      "Integration with CRM, phone, chat, and calendar systems",
      "Natural language understanding tuned to your industry",
      "Human escalation workflows and handoff protocols",
      "Performance dashboard and conversation analytics",
      "Ongoing optimization and retraining based on interaction data",
    ],
    layout: "wide",
    testimonialIndex: null,
  },

  "branding-brand-identity": {
    whatIsExtended: [
      "Brand identity is the strategic foundation upon which all marketing is built. It is not just a logo — it is the complete system of visuals, voice, values, messaging, and positioning that makes your business instantly recognizable and consistently trustworthy across every touchpoint.",
      "A strong brand identity includes your logo and logo system (variations for different contexts), color palette, typography, photography style, illustration style, brand voice and tone guidelines, messaging framework, and a comprehensive brand book that ensures consistency as your team and marketing efforts grow.",
      "Think of your brand as a promise. Every time a customer encounters your business — on social media, on your website, in an email, on a billboard, in a conversation — they should receive the same clear, consistent signal about who you are, what you stand for, and why they should trust you. Brand identity is the system that makes this consistency possible at scale.",
    ],
    whyExtended: [
      "77% of consumers make purchasing decisions based on brand name alone. In a split-second, before they read your copy or compare your prices, customers are making judgments based on how your brand looks and feels. An inconsistent or amateur brand signals an inconsistent or amateur business.",
      "In the crowded Dallas-Fort Worth market, brand differentiation is survival. Your competitors offer similar services at similar prices. When products are comparable, the brand wins. Companies with consistent branding across all platforms experience an average revenue increase of 23% compared to those with inconsistent presentation.",
      "The hidden cost of poor branding goes beyond first impressions. Without clear brand guidelines, every marketing asset requires individual creative decisions, slowing production and increasing costs. Teams waste time debating fonts, colors, and messaging. External vendors produce off-brand work. The result is a fragmented presence that confuses customers and dilutes your marketing impact.",
    ],
    approachExtended: [
      "NIXAR's branding process starts where most agencies skip: cross-functional brand alignment. Before we design a single asset, we bring together stakeholders from across your organization — sales, marketing, operations, customer success — to align on brand values, positioning, and messaging. This prevents the common problem of a beautiful brand identity that nobody in the organization actually uses.",
      "Our design process is research-driven. We analyze your competitors' brand positioning, identify white space in the market, study your target audience's preferences and expectations, and design a brand identity that is both distinctive and appropriate for your industry. We do not follow trends — we build timeless brand systems.",
      "Deliverables include a comprehensive brand book that covers every scenario your team will encounter — from social media templates to email signatures to presentation decks. We do not hand you a logo file and wish you luck. We build a complete system with rules, templates, and assets that any team member can use to produce on-brand work consistently.",
    ],
    deliverables: [
      "Brand strategy and positioning workshop",
      "Logo design with full system (primary, secondary, favicon, variations)",
      "Color palette (primary, secondary, accent, neutral)",
      "Typography system (headings, body, accent fonts)",
      "Brand voice and messaging guidelines",
      "Comprehensive brand book (50+ pages)",
      "Social media templates and guidelines",
      "Business collateral templates (cards, letterhead, presentations)",
    ],
    layout: "standard",
    testimonialIndex: 2,
  },

  "paid-advertising": {
    whatIsExtended: [
      "Paid advertising — PPC, paid social, display — is the fastest path to putting your business in front of qualified buyers. Unlike organic strategies that build over months, paid campaigns can generate leads today. But speed without strategy is just burning money faster.",
      "Modern paid advertising is a technical discipline that combines audience science, creative strategy, bidding algorithms, conversion tracking, and continuous optimization. It is not about boosting posts or setting up a Google Ads campaign with default settings. It is about engineering a system where every dollar spent generates measurable, attributable return.",
      "NIXAR manages campaigns across every major platform: Google Search and Display, Meta (Facebook and Instagram), LinkedIn, TikTok, YouTube, and programmatic networks. Each platform has unique strengths and audience behaviors — our multi-platform approach ensures your budget is allocated where it will produce the highest returns.",
    ],
    whyExtended: [
      "Organic growth is essential but takes time. When you need leads now — for a new product launch, a seasonal push, or to fill a sales pipeline gap — paid advertising delivers. The businesses that combine organic and paid strategies grow 2-3x faster than those relying on either alone.",
      "The problem is waste. The average business wastes 26% of its ad budget on poor targeting, wrong keywords, ineffective creative, and unoptimized landing pages. At scale, this waste is staggering — a business spending $10,000/month on ads is throwing away $2,600 every month on campaigns that will never convert.",
      "Worse, most businesses have no idea which 26% is wasted. Without proper conversion tracking, attribution modeling, and analytics, you are making decisions in the dark. You know you are spending money. You think it is probably working. But you cannot say with certainty which campaigns, audiences, or creatives are actually driving revenue.",
    ],
    approachExtended: [
      "Every NIXAR paid campaign starts with unit economics. Before we spend a dollar, we calculate your customer acquisition cost target based on your average deal size, lifetime value, and profit margins. This number governs every campaign decision — if we cannot acquire customers profitably on a platform, we do not advertise there.",
      "Creative is not an afterthought. Our process produces multiple ad variations per campaign, systematically testing headlines, images, CTAs, and offers. A/B testing is continuous — not something we do once and forget. The winning creative from week one is challenged by new variations in week two.",
      "Transparency is non-negotiable. Every client has real-time access to campaign dashboards showing spend, impressions, clicks, conversions, cost per acquisition, and return on ad spend. Monthly strategy calls review performance, discuss opportunities, and plan ahead. No long-term contracts — we earn your business every month with results.",
    ],
    deliverables: [
      "Paid advertising strategy and budget allocation",
      "Campaign setup across Google, Meta, LinkedIn, and more",
      "Audience research and targeting configuration",
      "Ad creative production and copywriting",
      "Landing page optimization recommendations",
      "Conversion tracking and analytics setup",
      "A/B testing and ongoing creative optimization",
      "Monthly performance reporting with ROI analysis",
      "Budget optimization and bid management",
    ],
    layout: "reversed",
    testimonialIndex: null,
  },
};

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}
