"use client";

import { useState, useMemo } from "react";
import type { PortfolioProject } from "@/lib/data/portfolio";
import AnimateIn from "@/components/ui/AnimateIn";

const FILTERS = ["All", "Digital Marketing", "Development", "Social Media"] as const;

const GRADIENT_CLASSES = [
  "from-rose-100 via-white to-slate-100",
  "from-sky-100 via-white to-rose-50",
  "from-slate-100 via-white to-amber-50",
  "from-violet-50 via-white to-rose-100",
];

export default function PortfolioGrid({ projects }: { projects: PortfolioProject[] }) {
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.services.some((s) => s === filter));
  }, [filter, projects]);

  return (
    <section className="bg-white pb-24 pt-8 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1 rounded-full bg-[var(--color-bg-alt)] p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-[13px] font-500 transition-all ${
                filter === f
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {filtered.map((project, i) => (
            <AnimateIn key={project.slug} delay={0.08 * i}>
              {/* TODO: Replace gradient with nano-banana-2 generated project mockup */}
              <a
                href={`/portfolio/${project.slug}`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_CLASSES[i % GRADIENT_CLASSES.length]} transition-transform duration-500 group-hover:scale-105`}
                />

                {/* Placeholder */}
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
                  <p className="mt-1 text-[13px] text-white/70">
                    {project.description}
                  </p>
                </div>
              </a>
            </AnimateIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[var(--color-text-muted)]">No projects match this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
