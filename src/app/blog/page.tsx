import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedPosts, getSeriesPosts, getMorePosts } from "@/lib/data/blog";
import AnimatedOrbs from "@/components/ui/AnimatedOrbs";
import ParticleField from "@/components/ui/ParticleField";
import NewsletterForm from "@/components/sections/NewsletterForm";
import DecodedText from "@/components/ui/DecodedText";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI, SEO, GEO, social media, and the Dallas marketing landscape from the NIXAR Solutions team.",
  openGraph: {
    title: "Blog | NIXAR Solutions",
    description:
      "Strategy, trends, and ideas from Dallas's AI-forward marketing agency.",
    url: "https://nixarsolutions.com/blog",
    type: "website",
  },
};

/* ─── badge color helper ─────────────────────────────────────────── */
function badgeBg(color?: string) {
  return {
    backgroundColor: color ? `${color}22` : "rgba(231,24,64,0.13)",
    color: color ?? "#E71840",
    border: `1px solid ${color ? `${color}44` : "rgba(231,24,64,0.3)"}`,
  };
}


export default function BlogPage() {
  const featured = getFeaturedPosts();
  const series = getSeriesPosts();
  const more = getMorePosts();

  return (
    <main className="w-full bg-[#0A0A0A] relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <AnimatedOrbs />
        <ParticleField />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           HERO. VIDEO BACKGROUND
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/videos/blog-bg-compressed.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" style={{ zIndex: 1 }} />
        <div className="relative text-center px-6 max-w-3xl mx-auto" style={{ zIndex: 2 }}>
          <div className="inline-block border border-red-500/30 rounded-full px-4 py-1.5 mb-6">
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "#E71840" }}
            >
              ● NIXAR SOLUTIONS BLOG
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-oswald)] font-700 text-white text-4xl md:text-7xl leading-tight">
            The{" "}
            <span
              className="italic"
              style={{
                color: "#E71840",
                fontFamily: "var(--font-playfair)",
              }}
            >
              Future
            </span>{" "}
            of
            <br />
            Marketing, <DecodedText />
          </h1>
          <p className="mt-6 text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-[family-name:var(--font-plus-jakarta)]">
            NIXAR Solutions breaks down emerging trends in AI, SEO, social media,
            and the Dallas marketing landscape — so you can stay ahead.
          </p>
          <p className="mt-3 text-xs text-gray-600 tracking-wider">
            Powered by{" "}
            <span style={{ color: "#E71840" }}>NIXAR Solutions</span> , 
            Dallas&apos;s AI-forward marketing agency
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-col sm:flex-row">
            <a
              href="#blog-content"
              className="px-8 py-3 bg-[#E71840] text-white font-semibold rounded-lg hover:bg-[#C41535] transition-colors text-center"
            >
              Read Latest ↓
            </a>
            <Link
              href="/contact"
              className="px-8 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-white hover:text-white transition-colors text-center"
            >
              Work With Us
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION: LATEST POSTS (Featured)
           ═══════════════════════════════════════════════════════════════ */}
      <section id="blog-content" className="relative z-10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-[0.65rem] font-600 uppercase tracking-[0.2em] text-[#E71840]">
            LATEST POSTS
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,5vw,4rem)] font-700 uppercase leading-none text-white">
            What We&apos;re{" "}
            <span className="text-[#E71840]">Thinking</span> About
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card group flex flex-col !p-0 overflow-hidden"
              >
                <div className="relative h-[200px] w-full overflow-hidden rounded-t-[24px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E71840]" />
                  <span
                    className="absolute top-4 left-4 rounded-full px-3 py-1 text-[0.6rem] font-700 uppercase tracking-wider"
                    style={badgeBg(post.badgeColor)}
                  >
                    {post.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.1em] text-[#666]">
                    <span className="text-[#E71840] font-600">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-oswald)] text-[1.2rem] font-700 uppercase leading-[1.3] text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-[#888]">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 flex items-center justify-between text-[0.7rem] text-[#666]">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span className="mt-4 text-[0.75rem] font-600 uppercase tracking-[0.1em] text-[#E71840] transition-colors group-hover:text-white">
                    Read Article &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION: BEGINNER'S GUIDE SERIES
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 lg:py-32 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-[0.65rem] font-600 uppercase tracking-[0.2em] text-[#E71840]">
            BEGINNER&apos;S GUIDE SERIES
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,5vw,4rem)] font-700 uppercase leading-none text-white">
            New to <span className="text-[#E71840]">Marketing?</span> Start Here
          </h2>
          <p className="mt-4 text-[1rem] text-[#888] max-w-2xl font-[family-name:var(--font-plus-jakarta)]">
            Our beginner&apos;s guide series walks you through the fundamentals , 
            no experience needed. Start with Part 1 and work your way through.
          </p>

          {/* Progress dots */}
          <div className="mt-8 flex items-center gap-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[0.7rem] font-700 border transition-colors"
                  style={{
                    borderColor: "#E71840",
                    backgroundColor: "rgba(231,24,64,0.1)",
                    color: "#E71840",
                  }}
                >
                  {i + 1}
                </div>
                {i < 4 && (
                  <div className="w-6 h-px bg-[#333]" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {series.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card group flex flex-col !p-0 overflow-hidden"
              >
                <div className="relative h-[140px] w-full overflow-hidden rounded-t-[24px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#10B981]" />
                  <span
                    className="absolute top-3 left-3 rounded-full px-3 py-1 text-[0.55rem] font-700 uppercase tracking-wider"
                    style={badgeBg("#10B981")}
                  >
                    {post.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[0.6rem] font-700 uppercase tracking-wider text-[#10B981]">
                    Part {post.series!.part} of {post.series!.total}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase leading-[1.3] text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-[#888] line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-4 text-[0.7rem] font-600 uppercase tracking-[0.1em] text-[#10B981] transition-colors group-hover:text-white">
                    Start Reading &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION: MORE FROM NIXAR
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 lg:py-32 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-[0.65rem] font-600 uppercase tracking-[0.2em] text-[#E71840]">
            MORE FROM NIXAR
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,5vw,4rem)] font-700 uppercase leading-none text-white">
            More from{" "}
            <span className="text-[#E71840]">NIXAR Solutions</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {more.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card group flex flex-col sm:flex-row !p-0 overflow-hidden"
              >
                <div className="relative h-[180px] sm:h-auto sm:w-[220px] flex-shrink-0 overflow-hidden rounded-t-[24px] sm:rounded-t-none sm:rounded-l-[24px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 sm:bottom-auto sm:top-0 sm:right-0 left-0 sm:left-auto sm:w-[3px] h-[3px] sm:h-full bg-[#E71840]" />
                  <span
                    className="absolute top-3 left-3 rounded-full px-3 py-1 text-[0.55rem] font-700 uppercase tracking-wider"
                    style={badgeBg(post.badgeColor)}
                  >
                    {post.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.1em] text-[#666]">
                    <span className="text-[#E71840] font-600">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-oswald)] text-[1.1rem] font-700 uppercase leading-[1.3] text-white">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-[#888] line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4 flex items-center justify-between text-[0.65rem] text-[#666]">
                    <span>{post.author} · {post.readTime}</span>
                    <span className="font-600 uppercase tracking-[0.1em] text-[#E71840] transition-colors group-hover:text-white">
                      Read Article &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           SECTION: NEWSLETTER
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 lg:py-32 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-2xl px-5 lg:px-8">
          <div className="glass-card text-center !p-12">
            <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,4vw,3rem)] font-700 uppercase leading-none text-white">
              Stay Ahead of the{" "}
              <span className="text-[#E71840]">Curve</span>
            </h2>
            <p className="mt-4 text-[0.95rem] text-[#888] font-[family-name:var(--font-plus-jakarta)]">
              Get weekly insights on marketing, AI, and digital strategy delivered
              to your inbox. No spam — just signal.
            </p>
            <NewsletterForm />
            <p className="mt-4 text-[0.7rem] text-[#555]">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }])]} />
    </main>
  );
}
