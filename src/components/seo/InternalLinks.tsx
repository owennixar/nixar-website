import Link from "next/link";
import { services } from "@/lib/data/services";

/**
 * "We Serve All of DFW" — internal links to city pages.
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
