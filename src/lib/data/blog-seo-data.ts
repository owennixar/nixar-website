/**
 * Supplementary SEO data for blog posts: key takeaways, FAQs, and author assignments.
 * Merged with blog posts at export time.
 */

export const BLOG_SEO_DATA: Record<string, {
  authorKey: "owen" | "anwar";
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
}> = {
  "geo-generative-engine-optimization-2026": {
    authorKey: "owen",
    keyTakeaways: [
      "GEO (Generative Engine Optimization) is how you get cited in AI-generated answers from ChatGPT, Perplexity, and Google AI Overviews.",
      "AI Overviews now appear on 50-60% of Google searches, and organic CTR drops 61% when they do (Source: Search Engine Land, 2025).",
      "Structured data, entity clarity, and citation-worthy content are the top ranking factors for AI search engines.",
      "Dallas-Fort Worth businesses have a first-mover advantage — most local competitors haven't started GEO optimization yet.",
    ],
    faqs: [
      { question: "Is GEO replacing traditional SEO?", answer: "No. GEO is an additional visibility channel that works alongside traditional SEO. Businesses need both — SEO for blue-link rankings and GEO for AI-generated citations. They compound each other's effectiveness." },
      { question: "How long does GEO take to show results?", answer: "Initial AI visibility improvements can appear within 30-60 days of implementing structured data, FAQ schema, and citation-worthy content. Full optimization typically takes 3-6 months as AI models re-index your content." },
      { question: "Do small businesses need GEO?", answer: "Yes. AI search is especially impactful for local businesses because when someone asks 'best [service] in [city],' AI names specific companies. If you're not optimized, your competitor gets that citation." },
      { question: "What's the first step to start GEO?", answer: "Add comprehensive JSON-LD schema markup to your website — Organization, LocalBusiness, FAQ, and Article schemas. Then restructure your H2 headings as questions that match how people ask AI." },
      { question: "How much does GEO cost?", answer: "GEO can range from DIY (implementing schema markup yourself) to agency-managed ($1,500-5,000/month depending on scope). The ROI is significant because AI citations drive high-intent traffic." },
    ],
  },
  "seo-vs-ai-seo-understanding-the-difference": {
    authorKey: "anwar",
    keyTakeaways: [
      "Traditional SEO optimizes for Google's blue links; AI SEO optimizes for ChatGPT, Perplexity, and AI Overviews simultaneously.",
      "68% of online experiences still begin with a search engine, but AI search is growing 300%+ year-over-year (Source: BrightEdge, 2025).",
      "The best strategy is dual optimization — content that ranks in traditional search AND gets cited by AI.",
      "Businesses that ignore AI SEO risk losing visibility to the 800M+ weekly ChatGPT users (Source: OpenAI, 2025).",
    ],
    faqs: [
      { question: "Can I do AI SEO without traditional SEO?", answer: "Traditional SEO creates the domain authority and content foundation that AI SEO builds upon. Starting AI SEO without a solid SEO base is possible but less effective." },
      { question: "Which is more important — SEO or AI SEO?", answer: "Both are critical. Traditional SEO drives the majority of traffic today, but AI search is the fastest-growing channel. A dual strategy ensures you're visible everywhere." },
      { question: "How do I know if AI is citing my business?", answer: "Search for your brand and services on ChatGPT, Perplexity, and Google AI Overviews. Ask questions your customers would ask and see if your business appears in the responses." },
      { question: "Does AI SEO require different content?", answer: "AI SEO requires content that is structured, factual, and citable — direct answers to questions with sourced statistics. This actually improves your traditional SEO too." },
      { question: "How quickly can I see AI SEO results?", answer: "AI citation improvements can appear within 30-90 days as models re-crawl and re-index your optimized content. Traditional SEO results typically take 3-6 months." },
    ],
  },
  "manus-ai-changing-social-media-marketing": {
    authorKey: "owen",
    keyTakeaways: [
      "Autonomous AI agents represent the next evolution of social media marketing automation beyond simple scheduling tools.",
      "AI-powered campaign optimization can reduce cost-per-acquisition by 30-50% through real-time audience and creative testing.",
      "Small businesses benefit most from AI agents because they level the playing field against larger competitors with bigger teams.",
      "The key risk is over-automation — brands that lose their human voice will lose audience trust.",
    ],
    faqs: [
      { question: "Will AI replace social media managers?", answer: "AI will augment, not replace, social media managers. The strategic thinking, brand voice, and creative direction still require human expertise. AI handles the repetitive optimization and scaling." },
      { question: "Is AI-generated social content effective?", answer: "AI-assisted content creation is effective when combined with human editing and brand voice oversight. Fully autonomous AI content without human review tends to feel generic and lose engagement over time." },
      { question: "How much do AI social media tools cost?", answer: "AI social media tools range from free (basic scheduling with AI captions) to $500-2,000/month for enterprise-grade autonomous optimization platforms." },
      { question: "Should I wait for AI tools to mature before investing?", answer: "No. Early adopters of AI-powered social media management are building competitive advantages that will be hard to catch up to. Start with small experiments now." },
      { question: "What's the biggest mistake with AI social media?", answer: "Over-automating without maintaining brand authenticity. AI should enhance your brand voice, not replace it. Always have human oversight on content that represents your brand." },
    ],
  },
  "seo-101": {
    authorKey: "anwar",
    keyTakeaways: [
      "SEO is the practice of optimizing websites to rank higher in search results — and it drives 53% of all website traffic (Source: BrightEdge, 2025).",
      "The three pillars of SEO are on-page optimization, technical SEO, and off-page authority building.",
      "Local SEO is critical for businesses serving specific geographic areas — 46% of Google searches have local intent.",
      "SEO is a long-term investment that compounds over time, unlike paid ads which stop when you stop paying.",
    ],
    faqs: [
      { question: "How long does SEO take to work?", answer: "Most businesses see meaningful SEO results in 3-6 months. Competitive industries may take 6-12 months. The results compound over time, making SEO increasingly valuable." },
      { question: "Can I do SEO myself?", answer: "Basic SEO (title tags, meta descriptions, content optimization) can be done yourself. Technical SEO and link building typically require professional expertise or tools." },
      { question: "How much does SEO cost?", answer: "Professional SEO services typically range from $1,000-5,000/month for small businesses. The ROI is significant — organic traffic has no per-click cost once rankings are achieved." },
      { question: "Is SEO still relevant with AI search?", answer: "Absolutely. Google processes 8.5 billion searches per day. SEO remains the foundation of digital visibility, and strong SEO also improves your AI search visibility." },
      { question: "What's the most important SEO factor?", answer: "Content quality and relevance are the most important factors. Google's algorithms increasingly prioritize helpful, authoritative content that satisfies user intent." },
    ],
  },
  "geo-101": {
    authorKey: "owen",
    keyTakeaways: [
      "GEO is optimizing your content so AI search engines cite your brand in their generated answers.",
      "The top 5 GEO actions: add schema markup, write FAQ content, use question-format headings, cite statistics, and build entity signals.",
      "Common GEO mistakes include ignoring structured data, writing for keywords instead of questions, and lacking authoritative sources.",
      "GEO and SEO work together — strong SEO creates the foundation GEO builds upon.",
    ],
    faqs: [
      { question: "What's the difference between GEO and SEO?", answer: "SEO targets blue-link rankings on search engines. GEO targets inclusion in AI-generated answers. Both are important for complete search visibility." },
      { question: "Do I need technical skills for GEO?", answer: "Basic GEO (content restructuring, FAQ creation) requires no technical skills. Advanced GEO (schema markup, structured data) benefits from technical knowledge or professional help." },
      { question: "Which AI platforms should I optimize for?", answer: "Focus on Google AI Overviews (largest audience), ChatGPT (800M+ weekly users), and Perplexity (fastest growing). These three cover the majority of AI search traffic." },
      { question: "How do I check my GEO performance?", answer: "Ask your target questions on ChatGPT, Perplexity, and Google. See if your brand appears. Tools like Semrush and Ahrefs are also adding AI visibility tracking." },
      { question: "Is GEO a one-time effort or ongoing?", answer: "GEO is ongoing. AI models continuously re-index content, and competitors are optimizing too. Regular content updates and schema maintenance are necessary." },
    ],
  },
  "ai-seo-101": {
    authorKey: "anwar",
    keyTakeaways: [
      "AI SEO is the practice of optimizing for both traditional search engines and AI-powered search simultaneously.",
      "The dual-search reality means your content must rank in Google AND get cited by ChatGPT — different requirements, one strategy.",
      "A 30-day AI SEO action plan starts with schema markup, moves to content restructuring, then entity optimization.",
      "Tools like Semrush, Ahrefs, and manual AI platform queries can monitor your AI visibility.",
    ],
    faqs: [
      { question: "What tools do I need for AI SEO?", answer: "Start with Google Search Console (free), a schema markup generator, and manual queries on ChatGPT and Perplexity. Premium tools like Semrush add AI visibility tracking." },
      { question: "How is AI SEO different from regular SEO?", answer: "AI SEO adds structured data optimization, citation-worthy content formatting, and entity signal building on top of traditional SEO foundations." },
      { question: "What content format works best for AI SEO?", answer: "Question-and-answer format with sourced statistics, comparison tables, and clear definitions. AI prefers content it can easily extract and cite." },
      { question: "Can AI SEO help my local business?", answer: "Yes. When someone asks AI 'best [service] near me,' optimized local businesses get cited. Local AI SEO is especially powerful for service businesses." },
      { question: "What's the ROI of AI SEO?", answer: "AI-cited businesses see 35% more organic clicks than non-cited competitors (Source: Search Engine Land, 2025). The ROI increases as AI search adoption grows." },
    ],
  },
  "social-ads-101": {
    authorKey: "owen",
    keyTakeaways: [
      "Social media ad spend reached $230 billion globally in 2025 — businesses that don't advertise are invisible (Source: Statista, 2025).",
      "The best platforms for beginners: Meta (Facebook/Instagram) for broad reach, Google for intent-based, LinkedIn for B2B.",
      "Start with a $500-1,000/month test budget, focused on one platform and one objective before scaling.",
      "Success metrics: ROAS (return on ad spend), CPA (cost per acquisition), and CTR (click-through rate).",
    ],
    faqs: [
      { question: "How much should I spend on social ads?", answer: "Start with $500-1,000/month on one platform. Scale when you find a positive ROAS. Most successful small businesses spend $2,000-5,000/month across 2-3 platforms." },
      { question: "Which social platform is best for ads?", answer: "Meta (Facebook/Instagram) for consumer businesses, LinkedIn for B2B, Google Ads for high-intent searches, and TikTok for younger demographics." },
      { question: "How long before social ads show results?", answer: "Paid social can generate leads within days. However, expect 2-4 weeks of testing and optimization before campaigns reach optimal performance." },
      { question: "Should I hire an agency for social ads?", answer: "If your monthly ad spend exceeds $2,000, an agency typically pays for itself through better optimization and lower CPA. Below that, learning the basics yourself is viable." },
      { question: "What's a good ROAS for social ads?", answer: "A ROAS of 3:1 (earning $3 for every $1 spent) is considered good for most industries. E-commerce often achieves 4-8:1 while lead-gen businesses target 2-4:1." },
    ],
  },
  "social-content-101": {
    authorKey: "anwar",
    keyTakeaways: [
      "Most social content fails because it's created without a strategy — random posting is worse than not posting at all.",
      "The Content Pillars Framework: Educational (40%), Entertaining (30%), Promotional (20%), Community (10%).",
      "Short-form video has the highest ROI of any social format in 2026 (Source: HubSpot, 2025).",
      "Consistency beats perfection — 3 quality posts per week outperforms 7 mediocre posts.",
    ],
    faqs: [
      { question: "How often should I post on social media?", answer: "Quality over quantity. 3-5 posts per week on your primary platform is ideal. Consistency matters more than volume — a reliable schedule builds algorithmic momentum." },
      { question: "What type of content gets the most engagement?", answer: "Short-form video (Reels, TikToks, Shorts) consistently gets the highest engagement. Educational content and behind-the-scenes content follow closely." },
      { question: "Do I need to be on every social platform?", answer: "No. Master 1-2 platforms where your audience is most active before expanding. Spreading thin across 5 platforms produces mediocre results on all of them." },
      { question: "How do I come up with content ideas?", answer: "Use the Content Pillars Framework: 40% educational, 30% entertaining, 20% promotional, 10% community. Monitor competitors and industry trends for inspiration." },
      { question: "Should I use AI to create social content?", answer: "AI is excellent for ideation, caption drafts, and scheduling optimization. But human editing for brand voice and authenticity is essential for quality content." },
    ],
  },
  "agentic-ai-marketing-2026": {
    authorKey: "owen",
    keyTakeaways: [
      "Agentic AI differs from AI tools: agents autonomously execute multi-step tasks while tools assist with single tasks.",
      "Marketing teams using AI agents report 40-60% reduction in time spent on repetitive tasks.",
      "The biggest risk is over-delegation — AI agents need human oversight for brand voice and strategic decisions.",
      "Start small: deploy AI agents for lead follow-up and content scheduling before scaling to full campaign management.",
    ],
    faqs: [
      { question: "What is agentic AI in simple terms?", answer: "Agentic AI refers to AI systems that can autonomously plan, execute, and adjust multi-step tasks without constant human input. Think of it as an AI employee vs. an AI tool." },
      { question: "Is agentic AI ready for business use?", answer: "Yes, for specific use cases like lead follow-up, appointment scheduling, content distribution, and basic customer service. Complex strategic decisions still need human oversight." },
      { question: "How much does agentic AI cost?", answer: "Custom AI agents range from $500-5,000/month depending on complexity. Off-the-shelf solutions like AI chatbots start at $50-200/month." },
      { question: "Will agentic AI replace marketing jobs?", answer: "It will transform roles, not eliminate them. Marketers will shift from executing tasks to managing AI agents and focusing on strategy and creativity." },
      { question: "What's the biggest risk of agentic AI?", answer: "Loss of brand authenticity and human connection. AI agents that operate without proper brand guidelines and human oversight can damage customer relationships." },
    ],
  },
  "chatgpt-ads-what-marketers-need-to-know-2026": {
    authorKey: "anwar",
    keyTakeaways: [
      "OpenAI launched ads in ChatGPT, creating a new advertising channel alongside Google and Meta.",
      "ChatGPT ads appear within conversational responses — fundamentally different from search or social ads.",
      "This makes GEO even more important: organic AI citations are now competing with paid AI placements.",
      "Early advertisers are seeing CPCs 40-60% lower than Google Ads due to less competition.",
    ],
    faqs: [
      { question: "How do ChatGPT ads work?", answer: "ChatGPT ads appear as sponsored recommendations within AI-generated responses. They're contextually relevant to the user's conversation, similar to Google's sponsored results." },
      { question: "Can small businesses advertise on ChatGPT?", answer: "The ad platform is still in early stages. Currently available through select partnerships, with broader self-serve access expected by late 2026." },
      { question: "Will ChatGPT ads kill organic AI visibility?", answer: "No, but they change the landscape. Like Google, there will be both paid and organic placements. Strong GEO optimization ensures you appear in organic AI results." },
      { question: "How much do ChatGPT ads cost?", answer: "Early CPCs are $0.50-2.00, significantly lower than Google Ads averages. Pricing will likely increase as more advertisers enter the platform." },
      { question: "Should I invest in ChatGPT ads now?", answer: "If you have budget for experimentation, yes — early movers benefit from lower costs and less competition. But prioritize GEO optimization first for sustainable visibility." },
    ],
  },
  "zero-click-search-death-of-the-click-2026": {
    authorKey: "owen",
    keyTakeaways: [
      "Over 60% of Google searches now end without a click to any website — up from 50% in 2023.",
      "AI Overviews, featured snippets, and knowledge panels answer queries directly on the SERP.",
      "Winning in zero-click requires optimizing for visibility and brand impressions, not just clicks.",
      "Content strategy must shift from 'drive clicks' to 'be the cited source' across all search features.",
    ],
    faqs: [
      { question: "What is a zero-click search?", answer: "A search where the user finds their answer directly on the search results page (via featured snippets, AI Overviews, or knowledge panels) without clicking through to any website." },
      { question: "Is zero-click search killing SEO?", answer: "No, but it's changing SEO. The goal shifts from driving clicks to being the cited source. Brands that appear in AI Overviews and featured snippets gain massive visibility even without clicks." },
      { question: "How do I get featured in zero-click results?", answer: "Structure content as direct answers to questions, use FAQ schema, create comparison tables, and write concise definitions that Google can extract for featured snippets." },
      { question: "What metrics matter in a zero-click world?", answer: "Brand impressions, SERP visibility share, AI citation frequency, branded search volume, and direct traffic. These indicate brand awareness even without click-through." },
      { question: "Should I stop creating long-form content?", answer: "No. Long-form content builds topical authority and provides the depth AI needs to cite you. But structure it so key answers are extractable from individual sections." },
    ],
  },
  "micro-communities-new-marketing-channel-2026": {
    authorKey: "anwar",
    keyTakeaways: [
      "Facebook organic reach has dropped to approximately 5.2% of page followers (Source: Hootsuite, 2025).",
      "Micro-communities (Discord servers, Slack groups, private forums) deliver 5-10x higher engagement than broadcast social.",
      "Building a community is harder than running ads but creates a defensible competitive moat.",
      "Start by joining existing communities where your audience already gathers before building your own.",
    ],
    faqs: [
      { question: "What is a micro-community?", answer: "A micro-community is a small, focused group of people organized around a shared interest or identity. They exist on platforms like Discord, Slack, private Facebook Groups, and niche forums." },
      { question: "How do I find micro-communities for my business?", answer: "Search Reddit, Discord directory sites, Facebook Groups, and industry forums for groups related to your niche. Ask your best customers where they discuss topics related to your industry." },
      { question: "Should I build my own community or join existing ones?", answer: "Start by joining and contributing to existing communities. Once you understand what your audience values, consider building your own. Building too early often leads to ghost towns." },
      { question: "How do I market in a community without being salesy?", answer: "Lead with value — answer questions, share insights, and help people. Establish yourself as a trusted expert before ever mentioning your services. Community marketing is a long game." },
      { question: "How do I measure community marketing ROI?", answer: "Track referral traffic, branded search increases, lead quality from community sources, and customer lifetime value of community-sourced leads. Community ROI is often higher but harder to attribute." },
    ],
  },
  "ai-is-your-next-customer-marketing-to-machines-2026": {
    authorKey: "owen",
    keyTakeaways: [
      "AI shopping agents are making purchasing decisions on behalf of consumers — your next customer may not be human.",
      "AI agents evaluate businesses based on structured data, reviews, pricing transparency, and API accessibility — not emotional marketing.",
      "The 'dual marketing challenge' means businesses must market to both humans AND AI systems simultaneously.",
      "Businesses that optimize for AI customers now will have a massive advantage as AI commerce grows.",
    ],
    faqs: [
      { question: "What are AI shopping agents?", answer: "AI systems that autonomously research, compare, and make purchasing recommendations or decisions on behalf of consumers. Examples include ChatGPT plugins, Google Shopping AI, and specialized procurement agents." },
      { question: "How do AI agents choose which businesses to recommend?", answer: "AI agents prioritize structured data (schema markup), verified reviews, pricing transparency, and authoritative content. They make decisions based on data, not brand emotions." },
      { question: "Should I optimize for AI customers or human customers?", answer: "Both. This is the dual marketing challenge. Your website needs emotional storytelling for humans AND structured, data-rich content for AI agents." },
      { question: "When will AI commerce become mainstream?", answer: "AI-assisted commerce is already here. ChatGPT plugins, AI shopping assistants, and automated procurement tools are growing rapidly. By 2028, a significant share of B2B transactions will involve AI agents." },
      { question: "What's the first step to prepare for AI customers?", answer: "Implement comprehensive schema markup, ensure pricing transparency, maintain strong review profiles, and structure your content so AI can easily parse your value proposition." },
    ],
  },
  "dallas-marketing-landscape-2026": {
    authorKey: "anwar",
    keyTakeaways: [
      "DFW metro population of 7.6 million makes it one of the most competitive local marketing landscapes in the U.S.",
      "Local SEO, GEO, and AI SEO are the three pillars of DFW digital marketing in 2026.",
      "The GEO opportunity in Dallas is wide open — most local competitors haven't started AI search optimization.",
      "Dallas businesses that combine local SEO + GEO + paid social will dominate their markets.",
    ],
    faqs: [
      { question: "What's the best marketing strategy for Dallas businesses?", answer: "A multi-channel approach: strong local SEO as the foundation, GEO optimization for AI search, targeted paid social, and authentic content marketing. The specific mix depends on your industry and goals." },
      { question: "How competitive is SEO in Dallas?", answer: "Very competitive. With 60,000+ registered businesses in Dallas alone, ranking for broad terms requires significant investment. Long-tail and local keywords offer the best ROI for most businesses." },
      { question: "Do I need a local marketing agency?", answer: "A local agency understands DFW market dynamics, local competition, and community nuances that national agencies miss. This local expertise translates to more effective strategies and better ROI." },
      { question: "What marketing budget should a Dallas business expect?", answer: "Small businesses: $1,500-3,000/month for basic SEO and social. Mid-size: $3,000-7,000/month for multi-channel. Enterprise: $7,000+ for full digital transformation." },
      { question: "Is GEO important for Dallas businesses specifically?", answer: "Extremely. When someone asks ChatGPT 'best marketing agency in Dallas,' GEO determines if your business is cited. Most Dallas competitors haven't optimized for this yet — it's a massive first-mover advantage." },
    ],
  },
};
