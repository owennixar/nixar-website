import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts, getRelatedPosts } from "@/lib/data/blog";
import { getAuthor } from "@/lib/data/authors";
import AnimatedOrbs from "@/components/ui/AnimatedOrbs";
import ParticleField from "@/components/ui/ParticleField";
import BlogArticle from "@/components/sections/BlogArticle";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/schemas";
import { RelatedServicesSection } from "@/components/seo/InternalLinks";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  const author = getAuthor(post.authorSlug);
  const authorName = author?.name ?? "NIXAR Solutions";
  const ogDescription = post.summary ?? post.excerpt;
  const toIso = (d: string) => {
    const parsed = new Date(d);
    return isNaN(parsed.getTime()) ? d : parsed.toISOString();
  };
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: ogDescription,
      url: `https://nixarsolutions.com/blog/${post.slug}`,
      type: "article",
      publishedTime: toIso(post.date),
      modifiedTime: toIso(post.lastUpdated ?? post.date),
      authors: [`https://nixarsolutions.com/about/team/${post.authorSlug}`],
      siteName: "NIXAR Solutions",
      images: [
        {
          url: `https://nixarsolutions.com${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: ogDescription,
      images: [`https://nixarsolutions.com${post.image}`],
      creator: authorName,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

function badgeBg(color?: string) {
  return {
    backgroundColor: color ? `${color}22` : "rgba(231,24,64,0.13)",
    color: color ?? "#E71840",
    border: `1px solid ${color ? `${color}44` : "rgba(231,24,64,0.3)"}`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const author = getAuthor(post.authorSlug);
  const authorName = author?.name ?? "NIXAR Solutions Editorial Team";
  const isUpdated = post.lastUpdated && post.lastUpdated !== post.date;

  return (
    <main className="w-full bg-[#0A0A0A] relative overflow-hidden">
      <JsonLd data={[
        blogPostingSchema({
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          lastUpdated: post.lastUpdated,
          image: post.image,
          slug: post.slug,
          author: author
            ? { slug: author.slug, name: author.name, linkedIn: author.linkedIn || undefined }
            : undefined,
        }),
        breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: post.title, url: `/blog/${post.slug}` }]),
        ...(post.faqs ? [faqSchema(post.faqs)] : []),
      ]} />

      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <AnimatedOrbs />
        <ParticleField />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           HERO. Image background
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-5 lg:px-8 pb-12 w-full">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840] hover:text-white transition-colors mb-6"
          >
            &larr; Back to Blog
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="rounded-full px-3 py-1 text-[0.6rem] font-700 uppercase tracking-wider"
              style={badgeBg(post.badgeColor)}
            >
              {post.badge}
            </span>
            <span className="text-[0.65rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
              {post.category}
            </span>
            {post.series && (
              <span className="text-[0.6rem] uppercase tracking-wider text-[#10B981] border border-[#10B981]/30 rounded-full px-3 py-1">
                Part {post.series.part} of {post.series.total}
              </span>
            )}
          </div>
          <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(1.8rem,4vw,3rem)] font-700 uppercase leading-[1.1] text-white">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-[0.8rem] text-white/70">
            {author && (
              <Link
                href={`/about/team/${author.slug}`}
                className="flex items-center gap-2.5 hover:text-[#E71840] transition-colors"
              >
                <Image
                  src={author.avatar}
                  alt={`${author.name}, ${author.role}, NIXAR Solutions`}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <span className="flex flex-col leading-tight">
                  <span className="font-600 text-white">{author.name}</span>
                  <span className="text-[0.7rem] text-white/50">{author.role}</span>
                </span>
              </Link>
            )}
            <span className="text-white/30">·</span>
            <span>{isUpdated ? `Last updated: ${post.lastUpdated}` : `Published ${post.date}`}</span>
            <span className="text-white/30">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           ARTICLE BODY
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          {/* TL;DR Summary — AI engines extract this; humans skim it */}
          {post.summary && (
            <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:p-8">
              <p className="text-[0.65rem] font-700 uppercase tracking-[0.2em] text-[#E71840]">
                TL;DR
              </p>
              <p className="mt-3 text-[16px] leading-[1.75] text-white/80">
                {post.summary}
              </p>
            </div>
          )}

          {/* Key Takeaways */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="article-summary mb-12 rounded-2xl border border-[#E71840]/20 p-6 lg:p-8" style={{ background: 'rgba(231,24,64,0.05)' }}>
              <h2 className="font-[family-name:var(--font-oswald)] text-[1.1rem] font-700 uppercase text-[#E71840] mb-4">Key Takeaways</h2>
              <ul className="space-y-3">
                {post.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/70">
                    <span className="mt-1 text-[#E71840] shrink-0">&#9656;</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <BlogArticle content={post.content} />

          {/* FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16 pt-8 border-t border-[#222]">
              <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,3vw,2rem)] font-700 uppercase text-white mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="font-[family-name:var(--font-oswald)] text-[0.95rem] font-700 text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.75] text-white/60">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Services */}
          <RelatedServicesSection blogSlug={slug} />

          {/* About the Author */}
          {author && (
            <div className="mt-16 pt-8 border-t border-[#222]">
              <div className="flex items-start gap-4 rounded-xl bg-white/[0.03] border border-white/10 p-6">
                <Image
                  src={author.avatar}
                  alt={`${author.name}, ${author.role}, NIXAR Solutions`}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="text-[14px] font-600 text-white">{author.name}</p>
                  <p className="text-[13px] text-white/40">{author.role}, NIXAR Solutions</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/60">{author.bio}</p>
                  <Link
                    href={`/about/team/${author.slug}`}
                    className="mt-3 inline-block text-[12px] font-600 text-[#E71840] hover:text-white transition-colors"
                  >
                    About {author.name.split(" ")[0]} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-[#222] flex items-center justify-between">
            <span className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#666]">
              Share this article
            </span>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://nixarsolutions.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center text-[#888] hover:border-[#E71840] hover:text-[#E71840] transition-colors text-xs"
                aria-label="Share on X"
              >
                𝕏
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://nixarsolutions.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center text-[#888] hover:border-[#E71840] hover:text-[#E71840] transition-colors text-xs"
                aria-label="Share on LinkedIn"
              >
                in
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://nixarsolutions.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center text-[#888] hover:border-[#E71840] hover:text-[#E71840] transition-colors text-xs"
                aria-label="Share on Facebook"
              >
                f
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           RELATED POSTS
           ═══════════════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="relative z-10 py-24 border-t border-[#1a1a1a]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,4vw,3rem)] font-700 uppercase leading-none text-white">
              Related <span className="text-[#E71840]">Articles</span>
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="glass-card group flex flex-col !p-0 overflow-hidden"
                >
                  <div className="relative h-[160px] w-full overflow-hidden rounded-t-[24px]">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E71840]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[0.6rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                      {rel.category}
                    </span>
                    <h3 className="mt-2 font-[family-name:var(--font-oswald)] text-[1rem] font-700 uppercase leading-[1.3] text-white">
                      {rel.title}
                    </h3>
                    <span className="mt-auto pt-4 text-[0.7rem] font-600 uppercase tracking-[0.1em] text-[#E71840] transition-colors group-hover:text-white">
                      Read Article &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
           CTA
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-2xl px-5 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,4vw,3rem)] font-700 uppercase leading-none text-white">
            Ready to Transform Your{" "}
            <span className="text-[#E71840]">Digital Presence?</span>
          </h2>
          <p className="mt-4 text-[0.95rem] text-[#888] font-[family-name:var(--font-plus-jakarta)]">
            Get your free audit and discover what&apos;s possible for your business.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-[#E71840] text-white font-semibold rounded-lg hover:bg-[#C41535] transition-colors"
            >
              Get Your Free Audit
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-white hover:text-white transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
