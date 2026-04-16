"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Parse H2 headings from markdown content
  const headings: TocItem[] = content
    .split("\n")
    .filter((line) => line.startsWith("## ") && !line.startsWith("### "))
    .map((line) => {
      const text = line.replace(/^## /, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return { id, text };
    });

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <>
      {/* Mobile: collapsible accordion */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/10 px-5 py-3 text-base font-600 text-white/70"
        >
          <span>Table of Contents</span>
          <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>
        {isOpen && (
          <nav className="mt-2 rounded-xl bg-white/[0.04] border border-white/10 px-5 py-4">
            <ol className="space-y-2">
              {headings.map(({ id, text }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block text-base transition-colors ${
                      activeId === id
                        ? "text-[#E71840] font-600"
                        : "text-white/85 hover:text-white/80"
                    }`}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <nav
        className="hidden lg:block sticky top-[100px] max-h-[calc(100vh-140px)] overflow-y-auto"
        aria-label="Table of contents"
      >
        <p className="text-[1rem] font-700 uppercase tracking-[0.2em] text-white/75 mb-4">
          On This Page
        </p>
        <ol className="space-y-2 border-l border-white/10 pl-4">
          {headings.map(({ id, text }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-[16px] leading-relaxed transition-colors ${
                  activeId === id
                    ? "text-[#E71840] font-600 border-l-2 border-[#E71840] -ml-[17px] pl-[15px]"
                    : "text-white/75 hover:text-white/70"
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
