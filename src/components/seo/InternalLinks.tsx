import Link from "next/link";
import { services } from "@/lib/data/services";
import { blogPosts } from "@/lib/data/blog";

/**
 * "We Serve All of DFW". internal links to city pages.
 * Add to service pages for local SEO.
 */
export function DfwCitiesSection() {
  const cities = [
    { name: "Dallas", href: "/dallas" },
    { name: "Frisco", href: "/frisco" },
    { name: "Plano", href: "/plano" },
    { name: "McKinney", href: "/mckinney" },
    { name: "Prosper", href: "/prosper" },
    { name: "Fort Worth", href: "/fort-worth" },
  ];

  return (
    <section className="bg-[#0A0A0A] py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase tracking-wider text-white/30 mb-4">
          We Serve All of DFW
        </h2>
        <div className="flex flex-wrap gap-3">
          {cities.map((city) => (
            <Link
              key={city.href}
              href={city.href}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[13px] font-500 text-white/50 transition-all hover:border-[#E71840]/40 hover:text-white"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Blog → Service links mapping.
 */
const BLOG_TO_SERVICES: Record<string, string[]> = {
  "geo-generative-engine-optimization-2026": ["ai-seo-geo", "search-everywhere-optimization"],
  "seo-vs-ai-seo-understanding-the-difference": ["search-everywhere-optimization", "ai-seo-geo"],
  "manus-ai-changing-social-media-marketing": ["social-media-management", "automation-ai-integration"],
  "seo-101": ["search-everywhere-optimization"],
  "geo-101": ["ai-seo-geo"],
  "ai-seo-101": ["ai-seo-geo", "search-everywhere-optimization"],
  "social-ads-101": ["paid-advertising", "social-media-management"],
  "social-content-101": ["social-media-management", "content-marketing"],
  "agentic-ai-marketing-2026": ["automation-ai-integration", "ai-tailored-agents"],
  "chatgpt-ads-what-marketers-need-to-know-2026": ["paid-advertising", "ai-seo-geo"],
  "zero-click-search-death-of-the-click-2026": ["search-everywhere-optimization", "ai-seo-geo"],
  "micro-communities-new-marketing-channel-2026": ["social-media-management", "content-marketing"],
  "ai-is-your-next-customer-marketing-to-machines-2026": ["ai-tailored-agents", "ai-seo-geo"],
  "dallas-marketing-landscape-2026": ["search-everywhere-optimization"],
};

/**
 * "Related Services" section for blog posts.
 */
export function RelatedServicesSection({ blogSlug }: { blogSlug: string }) {
  const serviceSlugs = BLOG_TO_SERVICES[blogSlug];
  if (!serviceSlugs || serviceSlugs.length === 0) return null;

  const related = serviceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-[#222]">
      <h2 className="font-[family-name:var(--font-oswald)] text-[1.1rem] font-700 uppercase text-white/40 mb-4">
        Related Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((service) => (
          <Link
            key={service!.slug}
            href={`/services/${service!.slug}`}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#E71840]/30"
          >
            <h3 className="font-[family-name:var(--font-oswald)] text-[0.95rem] font-700 uppercase text-white">
              {service!.title}
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-white/40 line-clamp-2">
              {service!.description}
            </p>
            <span className="mt-2 inline-block text-[12px] font-600 text-[#E71840]">
              Learn more &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Service → Blog mapping (inverse of BLOG_TO_SERVICES). Drives the
 * "Related Insights" section on /services/[slug] pages so service pages
 * earn outbound links into related blog posts.
 */
const SERVICE_TO_BLOG: Record<string, string[]> = {
  "search-everywhere-optimization": [
    "geo-generative-engine-optimization-2026",
    "seo-vs-ai-seo-understanding-the-difference",
    "zero-click-search-death-of-the-click-2026",
    "seo-101",
    "ai-seo-101",
  ],
  "ai-seo-geo": [
    "geo-generative-engine-optimization-2026",
    "geo-101",
    "ai-seo-101",
    "chatgpt-ads-what-marketers-need-to-know-2026",
    "ai-is-your-next-customer-marketing-to-machines-2026",
  ],
  "social-media-management": [
    "manus-ai-changing-social-media-marketing",
    "social-content-101",
    "micro-communities-new-marketing-channel-2026",
  ],
  "automation-ai-integration": [
    "agentic-ai-marketing-2026",
    "manus-ai-changing-social-media-marketing",
    "ai-is-your-next-customer-marketing-to-machines-2026",
  ],
  "ai-tailored-agents": [
    "agentic-ai-marketing-2026",
    "ai-is-your-next-customer-marketing-to-machines-2026",
  ],
  "paid-advertising": [
    "social-ads-101",
    "chatgpt-ads-what-marketers-need-to-know-2026",
  ],
  "content-marketing": [
    "social-content-101",
    "micro-communities-new-marketing-channel-2026",
    "geo-101",
  ],
  "branding-brand-identity": [
    "dallas-marketing-landscape-2026",
  ],
  "personalized-sales-support": [
    "agentic-ai-marketing-2026",
    "social-ads-101",
  ],
  "web-development": [
    "seo-101",
    "ai-seo-101",
  ],
};

/**
 * "Related Insights" section for /services/[slug] pages.
 * Filters blog posts by curated topical mapping; falls back to most-recent
 * featured posts if the service has no explicit mapping.
 */
export function RelatedInsightsSection({ serviceSlug }: { serviceSlug: string }) {
  const slugs = SERVICE_TO_BLOG[serviceSlug];
  const fallback = blogPosts.filter((p) => p.featured).slice(0, 3);
  const posts = (slugs ?? [])
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);
  const list = posts.length > 0 ? posts : fallback;

  if (list.length === 0) return null;

  return (
    <section className="border-t border-white/10 bg-[#0A0A0A] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-[0.7rem] font-700 uppercase tracking-[0.2em] text-[#E71840]">
          Related Insights
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[clamp(1.6rem,3.5vw,2.5rem)] font-700 uppercase text-white">
          From the NIXAR Blog
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {list.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-[#E71840]/40 hover:bg-white/[0.05]"
              >
                <p className="text-[0.65rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                  {post.category}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-oswald)] text-[1.05rem] font-700 uppercase leading-[1.3] text-white">
                  {post.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/50 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-[12px] font-600 uppercase tracking-[0.1em] text-[#E71840]">
                  Read article &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
