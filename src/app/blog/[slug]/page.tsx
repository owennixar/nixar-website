import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getRelatedPosts } from "@/lib/data/blog";
import AnimatedOrbs from "@/components/ui/AnimatedOrbs";
import ParticleField from "@/components/ui/ParticleField";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | NIXAR Solutions Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://nixarsolutions.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/* ─── badge color helper ─────────────────────────────────────────── */
function badgeBg(color?: string) {
  return {
    backgroundColor: color ? `${color}22` : "rgba(231,24,64,0.13)",
    color: color ?? "#E71840",
    border: `1px solid ${color ? `${color}44` : "rgba(231,24,64,0.3)"}`,
  };
}

const GRADIENTS = [
  "from-[#2a0a0f] to-[#0a0a0a]",
  "from-[#0a0f2a] to-[#0a0a0a]",
  "from-[#1a0a2a] to-[#0a0a0a]",
  "from-[#0a2a1a] to-[#0a0a0a]",
];

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  return (
    <main className="w-full bg-[#0A0A0A] relative overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <AnimatedOrbs />
        <ParticleField />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           HERO
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840] hover:text-white transition-colors mb-8"
          >
            &larr; Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
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

          <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(2rem,5vw,3.5rem)] font-700 uppercase leading-[1.1] text-white">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-[0.75rem] text-[#666]">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
           ARTICLE BODY
           ═══════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 pb-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="glass-card !p-8 lg:!p-12">
            <p className="text-[1.05rem] leading-[1.8] text-[#ccc] font-[family-name:var(--font-plus-jakarta)]">
              {post.excerpt}
            </p>

            <div className="mt-12 border-t border-[#222] pt-12 text-center">
              <div className="inline-block rounded-2xl border border-[#E71840]/20 bg-[#E71840]/5 px-8 py-6">
                <p className="text-[0.85rem] font-600 text-white">
                  Full article coming soon
                </p>
                <p className="mt-2 text-[0.8rem] text-[#888]">
                  We&apos;re finalizing this piece. Check back shortly or subscribe to
                  get notified when it&apos;s live.
                </p>
              </div>
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
              {related.map((rel, i) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="glass-card group flex flex-col !p-0 overflow-hidden"
                >
                  <div className="relative h-[160px] w-full overflow-hidden rounded-t-[24px]">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
                    />
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
            Want NIXAR to Handle{" "}
            <span className="text-[#E71840]">Your Marketing?</span>
          </h2>
          <p className="mt-4 text-[0.95rem] text-[#888] font-[family-name:var(--font-plus-jakarta)]">
            From AI-powered SEO to full-service campaigns — we help Dallas
            businesses grow faster.
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
