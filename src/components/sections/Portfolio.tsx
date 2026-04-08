import Link from "next/link";
import { portfolio } from "@/lib/data/portfolio";
import AnimateIn from "@/components/ui/AnimateIn";

const GRADIENT_CLASSES = [
  "from-rose-100 via-white to-slate-100",
  "from-sky-100 via-white to-rose-50",
  "from-slate-100 via-white to-amber-50",
  "from-violet-50 via-white to-rose-100",
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-[var(--color-bg-alt)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn>
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            Portfolio
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
            Our Work
          </h2>
        </AnimateIn>

        {/* Bento grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {portfolio.map((project, i) => (
            <AnimateIn key={project.slug} delay={0.1 * i}>
              {/* TODO: Replace gradient placeholder with nano-banana-2 generated project mockup images */}
              <Link
                href={`/portfolio/${project.slug}`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl"
              >
                {/* Gradient placeholder image */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_CLASSES[i % GRADIENT_CLASSES.length]} transition-transform duration-500 group-hover:scale-105`}
                />

                {/* Placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>
                    <p className="mt-2 text-xs font-500 text-[var(--color-text-muted)]">Project Image</p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-500 text-white backdrop-blur-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-700 text-white">
                    {project.name}
                  </h3>
                  <span className="mt-1 text-[13px] font-500 text-white/80">
                    View Project &rarr;
                  </span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.3} className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex h-12 items-center rounded-full border-2 border-[#1A1A1A] px-8 text-[14px] font-600 text-[#1A1A1A] transition-all hover:bg-[#1A1A1A] hover:text-white"
          >
            View All Work &rarr;
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
