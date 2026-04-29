import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { authors, AUTHOR_SLUGS, getAuthor } from "@/lib/data/authors";
import { blogPosts } from "@/lib/data/blog";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnimateIn from "@/components/ui/AnimateIn";
import { personSchema, breadcrumbSchema } from "@/lib/seo/schemas";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return AUTHOR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: `${author.name} | ${author.role}, NIXAR Solutions`,
    description: author.bio,
    alternates: { canonical: `/about/team/${author.slug}` },
    openGraph: {
      type: "profile",
      title: `${author.name} — ${author.role} at NIXAR Solutions`,
      description: author.bio,
      url: `https://nixarsolutions.com/about/team/${author.slug}`,
      images: [
        {
          url: `https://nixarsolutions.com${author.avatar}`,
          width: 800,
          height: 800,
          alt: `${author.name}, ${author.role}, NIXAR Solutions`,
        },
      ],
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const authorPosts = blogPosts
    .filter((p) => p.authorSlug === author.slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <main className="bg-[#0A0A0A]">
        <section className="pb-8 pt-32 lg:pt-40">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <AnimateIn>
              <p className="text-[0.75rem] font-600 uppercase tracking-[0.2em] text-[#E71840]">
                {author.role}, NIXAR Solutions
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,5vw,4rem)] font-700 uppercase leading-[1.05] tracking-tight text-white">
                {author.name}
              </h1>
            </AnimateIn>
          </div>
        </section>

        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Team", href: "/about/team" },
          { label: author.name, href: `/about/team/${author.slug}` },
        ]} />

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr]">
              <AnimateIn>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Image
                    src={author.avatar}
                    alt={`${author.name}, ${author.role}, NIXAR Solutions`}
                    width={560}
                    height={560}
                    className="h-auto w-full"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                    priority
                  />
                </div>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <div>
                  <p className="text-[1rem] leading-[1.85] text-white/70">{author.bio}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {author.email && (
                      <a
                        href={`mailto:${author.email}`}
                        className="inline-flex h-11 items-center rounded-full border border-white/20 px-6 text-[13px] font-600 text-white transition-all hover:border-[#E71840] hover:text-[#E71840]"
                      >
                        Email {author.name.split(" ")[0]}
                      </a>
                    )}
                    {author.linkedIn && (
                      <a
                        href={author.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center rounded-full border border-white/20 px-6 text-[13px] font-600 text-white transition-all hover:border-[#E71840] hover:text-[#E71840]"
                      >
                        LinkedIn
                      </a>
                    )}
                    <Link
                      href="/about/team"
                      className="inline-flex h-11 items-center rounded-full px-6 text-[13px] font-600 text-white/60 transition-all hover:text-white"
                    >
                      &larr; Back to team
                    </Link>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {authorPosts.length > 0 && (
          <section className="border-t border-white/10 py-16 lg:py-24">
            <div className="mx-auto max-w-5xl px-5 lg:px-8">
              <AnimateIn>
                <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,3vw,2.25rem)] font-700 uppercase text-white">
                  Articles by {author.name.split(" ")[0]}
                </h2>
              </AnimateIn>
              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {authorPosts.map((post, i) => (
                  <AnimateIn key={post.slug} delay={i * 0.04}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-[#E71840]/40 hover:bg-white/[0.05]"
                    >
                      <p className="text-[0.65rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
                        {post.category}
                      </p>
                      <h3 className="mt-2 font-[family-name:var(--font-oswald)] text-[1.05rem] font-700 uppercase leading-[1.3] text-white">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-[0.75rem] text-white/40">
                        {post.date} · {post.readTime}
                      </p>
                    </Link>
                  </AnimateIn>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      <JsonLd
        data={[
          personSchema({
            name: author.name,
            jobTitle: `${author.role}, NIXAR Solutions`,
            description: author.bio,
            slug: author.slug,
            image: author.avatar,
            email: author.email,
            sameAs: author.linkedIn ? [author.linkedIn] : [],
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
            { name: "Team", url: "/about/team" },
            { name: author.name, url: `/about/team/${author.slug}` },
          ]),
        ]}
      />
    </>
  );
}
