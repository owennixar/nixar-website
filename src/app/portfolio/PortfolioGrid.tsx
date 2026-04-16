"use client";

import { useState, useMemo } from "react";
import type { PortfolioProject } from "@/lib/data/portfolio";
import { PORTFOLIO_IMAGES } from "@/lib/data/portfolio";
import AnimateIn from "@/components/ui/AnimateIn";

const FILTERS = ["All", "Digital Marketing", "Development", "Social Media"] as const;

export default function PortfolioGrid({ projects }: { projects: PortfolioProject[] }) {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.services.some((s) => s === filter));
  }, [filter, projects]);

  return (
    <section className="pb-24 pt-8 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1 rounded-full bg-white/[0.04] p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-[16px] font-500 transition-all ${
                filter === f
                  ? "bg-[#E71840] text-white"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filtered.map((project, i) => {
            const img = PORTFOLIO_IMAGES[project.slug];
            return (
              <AnimateIn key={project.slug} delay={0.08 * i}>
                <a
                  href={`/portfolio/${project.slug}`}
                  className="group block overflow-hidden rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {/* Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    {img ? (
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
                        <span className="font-[family-name:var(--font-heading)] text-2xl font-700 text-white/75">{project.name}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {project.services.map((s) => (
                        <span
                          key={s}
                          className="rounded-full px-3 py-1 text-[16px] font-600"
                          style={{ background: 'rgba(231,24,64,0.15)', color: '#E71840' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-700 text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-white/85 line-clamp-2">
                      {project.description}
                    </p>
                    <span className="mt-4 inline-flex items-center text-[16px] font-600 text-[#E71840] transition-colors group-hover:text-white">
                      View Case Study &rarr;
                    </span>
                  </div>
                </a>
              </AnimateIn>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/75">No projects match this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
