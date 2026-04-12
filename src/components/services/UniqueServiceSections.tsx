"use client";

import AnimateIn from "@/components/ui/AnimateIn";
import Link from "next/link";

export default function UniqueServiceSections({ slug }: { slug: string }) {
  switch (slug) {
    // ─── 1. SOCIAL MEDIA MANAGEMENT ─────────────────────────────────
    case "social-media-management":
      return (
        <>
          {/* PLATFORM BREAKDOWN */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Platform Breakdown
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  Every platform has its own language. We tailor strategy,
                  content, and engagement for each one.
                </p>
              </AnimateIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Instagram",
                    points: [
                      "Visual storytelling & brand aesthetics",
                      "Reels strategy & production",
                      "Hashtag research & optimization",
                      "Story engagement & highlights",
                    ],
                  },
                  {
                    name: "TikTok",
                    points: [
                      "Short-form video creation",
                      "Trend-jacking & viral content strategy",
                      "Algorithm-optimized posting schedule",
                    ],
                  },
                  {
                    name: "LinkedIn",
                    points: [
                      "Thought leadership content",
                      "B2B content strategy",
                      "Company page optimization",
                    ],
                  },
                  {
                    name: "Facebook",
                    points: [
                      "Community management",
                      "Meta ads integration",
                      "Local engagement & events",
                    ],
                  },
                  {
                    name: "X (Twitter)",
                    points: [
                      "Real-time engagement",
                      "Industry conversations & threads",
                      "Brand voice development",
                    ],
                  },
                  {
                    name: "YouTube",
                    points: [
                      "Long-form video strategy",
                      "YouTube Shorts optimization",
                      "Channel SEO & thumbnails",
                      "Community engagement",
                    ],
                  },
                ].map((platform, i) => (
                  <AnimateIn key={platform.name} direction="up" delay={i * 0.1}>
                    <div className="glass-card rounded-2xl p-6 h-full">
                      <h3 className="font-[family-name:var(--font-oswald)] text-xl font-bold text-white uppercase mb-4">
                        {platform.name}
                      </h3>
                      <ul className="space-y-2">
                        {platform.points.map((point) => (
                          <li key={point} className="text-[#999] text-sm flex items-start gap-2">
                            <span className="text-[#E71840] mt-1">&#9656;</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* CONTENT CALENDAR */}
          <section className="bg-[#111] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Content Calendar
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  Every post is planned, scheduled, and optimized. Here&apos;s
                  what a typical week looks like.
                </p>
              </AnimateIn>

              <AnimateIn direction="up" delay={0.2}>
                <div className="glass-card rounded-2xl p-6 overflow-x-auto">
                  <div className="grid grid-cols-7 gap-2 min-w-[600px]">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center text-white/60 text-xs font-bold uppercase pb-3 border-b border-white/10"
                        >
                          {day}
                        </div>
                      )
                    )}

                    {/* Row 1 */}
                    <div className="bg-[#E71840] rounded-lg h-10" />
                    <div className="bg-white rounded-lg h-10" />
                    <div className="rounded-lg h-10" style={{ backgroundColor: '#666666' }} />
                    <div className="bg-[#E71840] rounded-lg h-10" />
                    <div className="bg-white rounded-lg h-10" />
                    <div className="rounded-lg h-10" style={{ backgroundColor: '#666666' }} />
                    <div className="bg-white rounded-lg h-10" />

                    {/* Row 2 */}
                    <div className="rounded-lg h-10" style={{ backgroundColor: '#666666' }} />
                    <div className="bg-[#E71840] rounded-lg h-10" />
                    <div className="bg-white rounded-lg h-10" />
                    <div className="rounded-lg h-10" style={{ backgroundColor: '#666666' }} />
                    <div className="bg-[#E71840] rounded-lg h-10" />
                    <div className="bg-white rounded-lg h-10" />
                    <div className="rounded-lg h-10" style={{ backgroundColor: '#666666' }} />

                    {/* Row 3 */}
                    <div className="bg-white rounded-lg h-10" />
                    <div className="rounded-lg h-10" style={{ backgroundColor: '#666666' }} />
                    <div className="bg-[#E71840] rounded-lg h-10" />
                    <div className="bg-white rounded-lg h-10" />
                    <div className="rounded-lg h-10" style={{ backgroundColor: '#666666' }} />
                    <div className="bg-[#E71840] rounded-lg h-10" />
                    <div className="bg-white rounded-lg h-10" />
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-6 mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#E71840]" />
                      <span className="text-[#999] text-sm">Video Content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-white" />
                      <span className="text-[#999] text-sm">Post / Carousel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: '#666666' }} />
                      <span className="text-[#999] text-sm">Story / Engagement</span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </section>
        </>
      );

    // ─── 2. WEB DEVELOPMENT ─────────────────────────────────────────
    case "web-development":
      return (
        <>
          {/* DEVELOPMENT PROCESS */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Our Development Process
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  From first conversation to ongoing support&mdash;every step is
                  deliberate.
                </p>
              </AnimateIn>

              {/* Desktop: horizontal timeline */}
              <div className="hidden lg:flex items-start gap-0 relative">
                {[
                  "Discovery",
                  "Wireframing",
                  "Design",
                  "Development",
                  "Content",
                  "SEO",
                  "QA",
                  "Launch",
                  "Support",
                ].map((step, i) => (
                  <AnimateIn key={step} direction="up" delay={i * 0.08} className="flex-1 flex flex-col items-center relative">
                    <div className="glass-card rounded-2xl p-4 text-center w-full">
                      <span className="text-[#E71840] font-bold text-lg block mb-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-[family-name:var(--font-oswald)] text-white text-sm font-bold uppercase">
                        {step}
                      </span>
                    </div>
                    {i < 8 && (
                      <div className="absolute top-1/2 -right-[2px] w-[4px] border-t-2 border-dashed border-[#E71840] z-10" style={{ width: "100%" , left: "50%" }} />
                    )}
                  </AnimateIn>
                ))}
              </div>

              {/* Mobile: vertical */}
              <div className="lg:hidden space-y-4">
                {[
                  "Discovery",
                  "Wireframing",
                  "Design",
                  "Development",
                  "Content",
                  "SEO",
                  "QA",
                  "Launch",
                  "Support",
                ].map((step, i) => (
                  <AnimateIn key={step} direction="left" delay={i * 0.06}>
                    <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
                      <span className="text-[#E71840] font-bold text-xl w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase">
                        {step}
                      </span>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

        </>
      );

    // ─── 3. AUTOMATION & AI INTEGRATION ─────────────────────────────
    case "automation-ai-integration":
      return (
        <>
          {/* WHAT CAN BE AUTOMATED */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  What Can Be Automated?
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  Most businesses waste hours on tasks that should run
                  themselves. Here are the top opportunities.
                </p>
              </AnimateIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Lead Follow-Up",
                    desc: "Automatically respond to new leads within seconds via SMS, email, or chat so you never lose a prospect.",
                  },
                  {
                    title: "Appointment Scheduling",
                    desc: "Let prospects self-book meetings that sync to your calendar with automated reminders.",
                  },
                  {
                    title: "Review Requests",
                    desc: "Trigger review requests to happy customers after every completed job or transaction.",
                  },
                  {
                    title: "Invoice Reminders",
                    desc: "Send automatic payment reminders on a schedule so you get paid faster without chasing clients.",
                  },
                  {
                    title: "Social Media Posting",
                    desc: "Queue and publish content across platforms on autopilot with AI-assisted captions.",
                  },
                ].map((item, i) => (
                  <AnimateIn key={item.title} direction="up" delay={i * 0.1}>
                    <div className="glass-card rounded-2xl p-6 h-full">
                      <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold text-white uppercase mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[#999] text-sm">{item.desc}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* ROI CALCULATOR */}
          <section className="bg-[#111] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  The ROI of Automation
                </h2>
              </AnimateIn>

              <AnimateIn direction="up" delay={0.2}>
                <div className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
                  <p className="text-white/60 text-lg mb-2">
                    If you save <span className="text-white font-bold">10 hours/week</span> at{" "}
                    <span className="text-white font-bold">$50/hr</span>&hellip;
                  </p>
                  <p className="font-[family-name:var(--font-oswald)] text-5xl md:text-7xl font-bold text-[#E71840] my-6">
                    = $26,000/year saved
                  </p>
                  <p className="text-[#999] max-w-xl mx-auto">
                    Most businesses we work with reclaim 10&ndash;20 hours per
                    week through automation. That&apos;s not just money
                    saved&mdash;it&apos;s time you can reinvest into growth,
                    strategy, and the work that actually moves the needle.
                  </p>
                </div>
              </AnimateIn>
            </div>
          </section>
        </>
      );

    // ─── 4. PERSONALIZED SALES SUPPORT ──────────────────────────────
    case "personalized-sales-support":
      return (
        <>
          {/* SPEED TO LEAD */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Speed to Lead
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  The first business to respond wins the deal. How fast are you?
                </p>
              </AnimateIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <AnimateIn direction="left" delay={0.1}>
                  <div className="glass-card rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
                    <span className="text-red-500 text-4xl mb-3">&#10007;</span>
                    <p className="font-[family-name:var(--font-oswald)] text-5xl md:text-6xl font-bold text-white mb-2">
                      42 HOURS
                    </p>
                    <p className="text-[#999]">
                      Average business response time
                    </p>
                  </div>
                </AnimateIn>

                <AnimateIn direction="right" delay={0.1}>
                  <div className="glass-card rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
                    <span className="text-green-500 text-4xl mb-3">&#10003;</span>
                    <p className="font-[family-name:var(--font-oswald)] text-5xl md:text-6xl font-bold text-[#E71840] mb-2">
                      UNDER 5 MIN
                    </p>
                    <p className="text-[#999]">NIXAR response time</p>
                  </div>
                </AnimateIn>
              </div>

              <AnimateIn direction="up" delay={0.3}>
                <p className="text-[#999] max-w-3xl mx-auto text-center">
                  Studies show that responding to a lead within 5 minutes makes
                  you <span className="text-white font-semibold">21x more likely</span> to
                  qualify them. After 30 minutes, your odds plummet. NIXAR&apos;s
                  personalized sales support ensures every lead gets a fast,
                  human-quality response&mdash;automatically.
                </p>
              </AnimateIn>
            </div>
          </section>

          {/* SALES FUNNEL */}
          <section className="bg-[#111] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Sales Funnel
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  We build and manage every stage of the pipeline for you.
                </p>
              </AnimateIn>

              <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
                {[
                  {
                    stage: "Lead",
                    desc: "Capture every inquiry from web, social, and ads into one system.",
                    width: "w-full",
                  },
                  {
                    stage: "Qualified",
                    desc: "AI-powered scoring filters out tire-kickers and surfaces hot leads.",
                    width: "w-[90%]",
                  },
                  {
                    stage: "Meeting",
                    desc: "Automated scheduling puts qualified leads on your calendar.",
                    width: "w-[75%]",
                  },
                  {
                    stage: "Proposal",
                    desc: "Personalized proposals and follow-up sequences close the gap.",
                    width: "w-[60%]",
                  },
                  {
                    stage: "Close",
                    desc: "Contracts, onboarding, and post-sale nurture handled seamlessly.",
                    width: "w-[45%]",
                  },
                ].map((item, i) => (
                  <AnimateIn key={item.stage} direction="up" delay={i * 0.1} className={item.width}>
                    <div className="glass-card rounded-2xl p-5 text-center">
                      <h3 className="font-[family-name:var(--font-oswald)] text-lg font-bold text-[#E71840] uppercase mb-1">
                        {item.stage}
                      </h3>
                      <p className="text-[#999] text-sm">{item.desc}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>
        </>
      );

    // ─── 5. SEO (SEARCH EVERYWHERE OPTIMIZATION) ────────────────────
    case "seo":
      return (
        <>
          {/* WHERE DO PEOPLE SEARCH */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Where Do People Search?
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  Google is just the beginning. We optimize your presence
                  everywhere your customers are looking.
                </p>
              </AnimateIn>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Google", note: "Technical SEO, content, and backlinks for top-3 rankings." },
                  { name: "YouTube", note: "Video SEO, metadata, and channel optimization for discoverability." },
                  { name: "TikTok", note: "Keyword-rich captions and hashtags for TikTok search." },
                  { name: "ChatGPT", note: "Structured data and authority signals that AI models cite." },
                  { name: "Perplexity", note: "Source optimization so your brand appears in AI answers." },
                  { name: "Apple Maps", note: "Listing accuracy, photos, and reviews for local discovery." },
                  { name: "Bing", note: "Microsoft ecosystem optimization for Copilot and Bing results." },
                  { name: "Voice Assistants", note: "Schema markup and FAQ content for Siri, Alexa, and Google Assistant." },
                ].map((platform, i) => (
                  <AnimateIn key={platform.name} direction="up" delay={i * 0.06}>
                    <div className="glass-card rounded-2xl p-5 h-full">
                      <h3 className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase mb-2">
                        {platform.name}
                      </h3>
                      <p className="text-[#999] text-xs">{platform.note}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* LOCAL SEO FOR DALLAS */}
          <section className="bg-[#111] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Local SEO for Dallas&ndash;Fort Worth
                </h2>
              </AnimateIn>

              <AnimateIn direction="up" delay={0.2}>
                <div className="glass-card rounded-2xl p-8 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      {
                        title: "Google Business Profile",
                        desc: "Complete optimization of your GBP listing including categories, services, products, posts, and Q&A to dominate the local map pack.",
                      },
                      {
                        title: "Local Citations",
                        desc: "We build and clean up your business listings across 60+ directories to boost local authority.",
                      },
                      {
                        title: "Review Management",
                        desc: "Automated review request workflows plus reputation monitoring to build social proof.",
                      },
                      {
                        title: "Geo-Targeted Content",
                        desc: "City-specific landing pages and blog content targeting 20+ DFW communities you serve.",
                      },
                      {
                        title: "NAP Consistency",
                        desc: "Your Name, Address, and Phone number are verified and consistent across every platform.",
                      },
                    ].map((item) => (
                      <div key={item.title}>
                        <h3 className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase mb-2">
                          {item.title}
                        </h3>
                        <p className="text-[#999] text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            </div>
          </section>
        </>
      );

    // ─── 6. CONTENT MARKETING ───────────────────────────────────────
    case "content-marketing":
      return (
        <>
          {/* THE ARISE FRAMEWORK */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  The ARISE Framework
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  Every piece of content we create follows five principles.
                </p>
              </AnimateIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  {
                    letter: "A",
                    word: "Authentic",
                    desc: "Content that sounds like your brand, not a template. We capture your real voice and values so audiences feel a genuine connection.",
                  },
                  {
                    letter: "R",
                    word: "Researched",
                    desc: "Every topic is backed by keyword data, competitor analysis, and audience insights. No guesswork, only strategy.",
                  },
                  {
                    letter: "I",
                    word: "Informative",
                    desc: "Content that teaches, solves problems, and positions your brand as the expert customers trust.",
                  },
                  {
                    letter: "S",
                    word: "Shareable",
                    desc: "Designed to spread. From scroll-stopping hooks to quotable insights, we optimize for engagement and reach.",
                  },
                  {
                    letter: "E",
                    word: "Engaging",
                    desc: "Strong visuals, clear CTAs, and storytelling that keeps audiences reading, watching, and clicking.",
                  },
                ].map((item, i) => (
                  <AnimateIn key={item.letter} direction="up" delay={i * 0.08}>
                    <div className="glass-card rounded-2xl p-6 h-full text-center">
                      <span className="font-[family-name:var(--font-oswald)] text-5xl font-bold text-[#E71840] block mb-2">
                        {item.letter}
                      </span>
                      <h3 className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-lg mb-3">
                        {item.word}
                      </h3>
                      <p className="text-[#999] text-sm">{item.desc}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* CONTENT TYPES */}
          <section className="bg-[#111] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Content Types
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  A full content ecosystem tailored to your audience and goals.
                </p>
              </AnimateIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Blog Posts", desc: "SEO-optimized long-form articles that drive organic traffic and establish authority." },
                  { name: "Videos", desc: "Short-form and long-form video content for social, YouTube, and website." },
                  { name: "Newsletters", desc: "Email content that nurtures leads and keeps your audience engaged on a consistent schedule." },
                  { name: "Social Posts", desc: "Platform-native content designed for engagement, shares, and brand awareness." },
                  { name: "Photography", desc: "Professional brand photography for web, social, and print materials." },
                  { name: "Infographics", desc: "Data-driven visual content that simplifies complex topics and earns backlinks." },
                ].map((item, i) => (
                  <AnimateIn key={item.name} direction="up" delay={i * 0.08}>
                    <div className="glass-card rounded-2xl p-6 h-full">
                      <h3 className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-lg mb-2">
                        {item.name}
                      </h3>
                      <p className="text-[#999] text-sm">{item.desc}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>
        </>
      );

    // ─── 7. AI SEO / GEO ───────────────────────────────────────────
    case "ai-seo-geo":
      return (
        <>
          {/* HOW AI SEARCH WORKS */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  How AI Search Works
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  AI doesn&apos;t show 10 blue links. It gives one answer. You
                  need to be that answer.
                </p>
              </AnimateIn>

              {/* Desktop horizontal flow */}
              <div className="hidden md:grid grid-cols-4 gap-0 items-center">
                {[
                  "User Asks Question",
                  "AI Scans Sources",
                  "AI Generates Answer",
                  "YOUR Brand Appears",
                ].map((step, i) => (
                  <AnimateIn key={step} direction="up" delay={i * 0.12} className="flex items-center">
                    <div className="glass-card rounded-2xl p-5 text-center flex-1 relative border border-white/5">
                      <span className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-sm">
                        {step}
                      </span>
                      {i === 3 && (
                        <span className="block text-[#E71840] text-xs mt-1 font-bold">
                          &#9733; GOAL
                        </span>
                      )}
                    </div>
                    {i < 3 && (
                      <span className="text-[#E71840] text-2xl font-bold mx-1 shrink-0">
                        &#8594;
                      </span>
                    )}
                  </AnimateIn>
                ))}
              </div>

              {/* Mobile vertical */}
              <div className="md:hidden space-y-3">
                {[
                  "User Asks Question",
                  "AI Scans Sources",
                  "AI Generates Answer",
                  "YOUR Brand Appears",
                ].map((step, i) => (
                  <AnimateIn key={step} direction="left" delay={i * 0.1}>
                    <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
                      <span className="text-[#E71840] font-bold text-lg">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-sm">
                        {step}
                      </span>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* AI PLATFORMS */}
          <section className="bg-[#111] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  AI Platforms We Optimize For
                </h2>
              </AnimateIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "ChatGPT", desc: "We structure your content and authority signals so ChatGPT cites your brand when users ask relevant questions." },
                  { name: "Perplexity", desc: "Source-first optimization ensures your site is among the references Perplexity surfaces in its AI answers." },
                  { name: "Gemini", desc: "Google's AI model pulls from Search and Knowledge Graph\u2014we optimize for both." },
                  { name: "Google AI Overviews", desc: "The AI snapshot at the top of Google results. We optimize content structure and E-E-A-T signals to appear here." },
                  { name: "Copilot", desc: "Microsoft's AI assistant uses Bing data. We ensure your Bing presence and schema are fully optimized." },
                ].map((platform, i) => (
                  <AnimateIn key={platform.name} direction="up" delay={i * 0.08}>
                    <div className="glass-card rounded-2xl p-6 h-full">
                      <h3 className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-lg mb-2">
                        {platform.name}
                      </h3>
                      <p className="text-[#999] text-sm">{platform.desc}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* ARE YOU VISIBLE? */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <div className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto border border-white/5">
                  <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                    Are You Visible in AI Search?
                  </h2>
                  <p className="text-[#999] max-w-xl mx-auto mb-6">
                    Open ChatGPT or Perplexity right now and search for your
                    brand name, your top service, or your industry in your city.
                    If you don&apos;t appear, your competitors might. We can fix
                    that.
                  </p>
                  <Link
                    href="/free-audit"
                    className="inline-block bg-[#E71840] text-white font-[family-name:var(--font-oswald)] font-bold uppercase px-8 py-3 rounded-lg hover:bg-[#c91536] transition-colors"
                  >
                    Get a Free AI Visibility Audit
                  </Link>
                </div>
              </AnimateIn>
            </div>
          </section>
        </>
      );

    // ─── 8. AI TAILORED AGENTS ──────────────────────────────────────
    case "ai-tailored-agents":
      return (
        <>
          {/* MEET YOUR AI EMPLOYEE */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Meet Your AI Employee
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  Custom AI agents trained on your business, your processes, and
                  your voice.
                </p>
              </AnimateIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    type: "Customer Service Agent",
                    desc: "Handles FAQs, troubleshooting, and support tickets 24/7 in your brand voice. Escalates complex issues to your team with full context.",
                  },
                  {
                    type: "Lead Qualifier",
                    desc: "Engages new leads instantly, asks qualifying questions, and scores them so your sales team only talks to hot prospects.",
                  },
                  {
                    type: "Appointment Setter",
                    desc: "Books meetings directly on your calendar after qualifying the lead. Handles rescheduling and reminders automatically.",
                  },
                  {
                    type: "FAQ Bot",
                    desc: "Trained on your knowledge base to answer common questions accurately. Reduces support load and improves customer satisfaction.",
                  },
                  {
                    type: "Internal Operations Agent",
                    desc: "Automates internal workflows like data entry, report generation, and team notifications so your staff can focus on high-value work.",
                  },
                ].map((agent, i) => (
                  <AnimateIn key={agent.type} direction="up" delay={i * 0.08}>
                    <div className="glass-card rounded-2xl p-6 h-full">
                      <h3 className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-lg mb-3">
                        {agent.type}
                      </h3>
                      <p className="text-[#999] text-sm">{agent.desc}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* INTEGRATIONS */}
          <section className="bg-[#111] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Integrations
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  Your AI agent connects to the tools you already use.
                </p>
              </AnimateIn>

              <AnimateIn direction="up" delay={0.2}>
                <div className="glass-card rounded-2xl p-8 md:p-12">
                  <div className="flex flex-col items-center">
                    {/* Top row */}
                    <div className="grid grid-cols-3 gap-4 mb-4 w-full max-w-md">
                      {["CRM", "Phone System", "Website"].map((item) => (
                        <div
                          key={item}
                          className="bg-white/5 rounded-xl p-3 text-center border border-white/10"
                        >
                          <span className="text-white text-xs font-bold uppercase">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Center hub */}
                    <div className="bg-[#E71840] rounded-2xl px-8 py-4 my-4">
                      <span className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-lg">
                        AI Agent
                      </span>
                    </div>

                    {/* Bottom row */}
                    <div className="grid grid-cols-3 gap-4 mt-4 w-full max-w-md">
                      {["Social Media", "Email", "Calendar"].map((item) => (
                        <div
                          key={item}
                          className="bg-white/5 rounded-xl p-3 text-center border border-white/10"
                        >
                          <span className="text-white text-xs font-bold uppercase">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </section>

          {/* BUILD VS BUY */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Build vs Buy
                </h2>
              </AnimateIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimateIn direction="left" delay={0.1}>
                  <div className="glass-card rounded-2xl p-8 h-full border border-white/5">
                    <h3 className="font-[family-name:var(--font-oswald)] text-white/60 font-bold uppercase text-xl mb-6">
                      Off-the-Shelf Chatbots
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Generic responses that don't match your brand",
                        "Limited to basic Q&A with no real intelligence",
                        "No integration with your existing systems",
                        "One-size-fits-all with no competitive edge",
                      ].map((con) => (
                        <li key={con} className="flex items-start gap-3 text-[#999] text-sm">
                          <span className="text-red-500 mt-0.5 shrink-0">&#10007;</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>

                <AnimateIn direction="right" delay={0.1}>
                  <div className="glass-card rounded-2xl p-8 h-full border border-[#E71840]/30">
                    <h3 className="font-[family-name:var(--font-oswald)] text-[#E71840] font-bold uppercase text-xl mb-6">
                      Custom AI Agents by NIXAR
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Tailored to your business, industry, and customers",
                        "Deep integrations with your CRM, phone, and tools",
                        "Learns your processes and improves over time",
                        "A true competitive advantage no one else has",
                      ].map((pro) => (
                        <li key={pro} className="flex items-start gap-3 text-[#999] text-sm">
                          <span className="text-green-500 mt-0.5 shrink-0">&#10003;</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </section>
        </>
      );

    // ─── 9. BRANDING / BRAND IDENTITY ───────────────────────────────
    case "branding-brand-identity":
      return (
        <>
          {/* BRAND ELEMENTS */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Brand Elements
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  Every touchpoint of your brand is intentionally designed.
                </p>
              </AnimateIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Logo Design", desc: "A distinctive mark that captures your brand essence and works across every medium and size." },
                  { name: "Color System", desc: "A strategic palette that evokes the right emotions and ensures instant brand recognition." },
                  { name: "Typography", desc: "Font pairings that reinforce your brand personality from headlines to body copy." },
                  { name: "Brand Voice", desc: "A defined tone and language style that makes every piece of communication unmistakably yours." },
                  { name: "Messaging Framework", desc: "Core taglines, value propositions, and elevator pitches that align your entire team." },
                  { name: "Brand Guidelines", desc: "A comprehensive playbook so your brand stays consistent across every channel and team member." },
                ].map((item, i) => (
                  <AnimateIn key={item.name} direction="up" delay={i * 0.08}>
                    <div className="glass-card rounded-2xl p-6 h-full">
                      <h3 className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-lg mb-2">
                        {item.name}
                      </h3>
                      <p className="text-[#999] text-sm">{item.desc}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* BRAND ALIGNMENT PROCESS */}
          <section className="bg-[#111] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  The Brand Alignment Process
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  A proven four-stage process that transforms how your business
                  shows up in the world.
                </p>
              </AnimateIn>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "01",
                    title: "Audit",
                    desc: "We analyze your current brand presence, competitors, and market positioning to find gaps and opportunities.",
                  },
                  {
                    step: "02",
                    title: "Define",
                    desc: "Together we define your brand values, target audience, personality, and strategic positioning.",
                  },
                  {
                    step: "03",
                    title: "Create",
                    desc: "Our design team builds your complete visual identity system\u2014logo, colors, typography, and all brand assets.",
                  },
                  {
                    step: "04",
                    title: "Implement",
                    desc: "We roll out the new brand across your website, social media, print materials, and internal tools.",
                  },
                ].map((item, i) => (
                  <AnimateIn key={item.step} direction="up" delay={i * 0.1}>
                    <div className="glass-card rounded-2xl p-6 h-full">
                      <span className="text-[#E71840] font-bold text-3xl block mb-2">
                        {item.step}
                      </span>
                      <h3 className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-xl mb-3">
                        {item.title}
                      </h3>
                      <p className="text-[#999] text-sm">{item.desc}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>
        </>
      );

    // ─── 10. PAID ADVERTISING ───────────────────────────────────────
    case "paid-advertising":
      return (
        <>
          {/* PLATFORM BREAKDOWN */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Platform Breakdown
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  Different platforms, different strategies. We tailor ad
                  campaigns to each one.
                </p>
              </AnimateIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Google Ads", desc: "Search, display, and Performance Max campaigns that capture high-intent buyers the moment they search." },
                  { name: "Meta Ads", desc: "Hyper-targeted Facebook and Instagram campaigns using custom audiences, lookalikes, and retargeting." },
                  { name: "LinkedIn Ads", desc: "B2B lead generation with precision targeting by job title, company size, and industry." },
                  { name: "YouTube Ads", desc: "Video ads that build brand awareness and drive action with skippable, non-skippable, and bumper formats." },
                  { name: "TikTok Ads", desc: "Native-feeling ads that blend into the feed and reach younger, highly engaged audiences." },
                ].map((platform, i) => (
                  <AnimateIn key={platform.name} direction="up" delay={i * 0.08}>
                    <div className="glass-card rounded-2xl p-6 h-full">
                      <h3 className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-lg mb-2">
                        {platform.name}
                      </h3>
                      <p className="text-[#999] text-sm">{platform.desc}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>

          {/* WHERE YOUR AD DOLLAR GOES */}
          <section className="bg-[#111] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Where Your Ad Dollar Goes
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  Transparent allocation. Every dollar is accounted for.
                </p>
              </AnimateIn>

              <AnimateIn direction="up" delay={0.2}>
                <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
                  <div className="space-y-6">
                    {[
                      { label: "Targeting & Research", pct: 25 },
                      { label: "Creative Production", pct: 25 },
                      { label: "Campaign Management", pct: 25 },
                      { label: "Optimization & Reporting", pct: 25 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-[family-name:var(--font-oswald)] text-white font-bold uppercase text-sm">
                            {item.label}
                          </span>
                          <span className="text-[#E71840] font-bold">
                            {item.pct}%
                          </span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-3">
                          <div
                            className="bg-[#E71840] h-3 rounded-full"
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            </div>
          </section>

          {/* COMMON AD SPEND MISTAKES */}
          <section className="bg-[#0A0A0A] py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <AnimateIn direction="up">
                <h2 className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase text-white mb-4">
                  Common Ad Spend Mistakes
                </h2>
                <p className="text-[#999] max-w-2xl mb-12">
                  We see these every day. NIXAR makes sure you avoid them.
                </p>
              </AnimateIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    mistake: "No Conversion Tracking",
                    desc: "Without proper tracking, you're flying blind. We set up end-to-end conversion tracking from day one so every dollar is measured.",
                  },
                  {
                    mistake: "Broad Targeting",
                    desc: "Casting too wide a net wastes budget on the wrong audience. We use layered targeting to reach only your ideal customers.",
                  },
                  {
                    mistake: "Set-and-Forget Campaigns",
                    desc: "Ads need constant optimization. We monitor, test, and adjust campaigns weekly to maximize performance.",
                  },
                  {
                    mistake: "Ignoring Landing Pages",
                    desc: "Great ads with bad landing pages kill conversions. We design dedicated landing pages that match your ad message and convert.",
                  },
                ].map((item, i) => (
                  <AnimateIn key={item.mistake} direction="up" delay={i * 0.08}>
                    <div className="glass-card rounded-2xl p-6 h-full">
                      <h3 className="font-[family-name:var(--font-oswald)] text-[#E71840] font-bold uppercase text-lg mb-2">
                        {item.mistake}
                      </h3>
                      <p className="text-[#999] text-sm">{item.desc}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>
        </>
      );

    default:
      return null;
  }
}
