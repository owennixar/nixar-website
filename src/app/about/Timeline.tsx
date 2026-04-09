"use client";

import { useRef, useEffect, useState } from "react";
import AnimateIn from "@/components/ui/AnimateIn";

const timelineData = [
  {
    year: "2023",
    description:
      "Founded by Anwar Mirza & Owen Nixon in Frisco, TX. Started by helping a local tire shop bring in new customers during slow season.",
  },
  {
    year: "2023",
    description:
      "Saw the gap in the market \u2014 small businesses struggling to compete online. Decided to build something bigger.",
  },
  {
    year: "2024",
    description:
      "Expanded services to include full-spectrum digital solutions \u2014 web dev, SEO, content, social media, paid ads.",
  },
  {
    year: "2024",
    description:
      "Landed enterprise clients including RunMyProcess (AWS partner, ISO certified).",
  },
  {
    year: "2025",
    description:
      "Launched AI-powered services \u2014 custom AI agents, GEO optimization, AI SEO.",
  },
  {
    year: "2025",
    description:
      "Grew to serve clients across DFW and nationally.",
  },
  {
    year: "2026",
    description:
      "Pioneering the intersection of AI and marketing for Dallas-Fort Worth businesses.",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the section is visible / scrolled past
      const scrolledInto = windowHeight - sectionTop;
      const progress = Math.min(
        Math.max(scrolledInto / (sectionHeight + windowHeight * 0.3), 0),
        1
      );
      setLineHeight(progress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <AnimateIn>
          <h2 className="font-[family-name:var(--font-oswald)] text-[2.5rem] lg:text-[3rem] font-bold uppercase text-white text-center mb-16">
            Our Journey
          </h2>
        </AnimateIn>

        <div className="relative pl-12 lg:pl-16">
          {/* Background line (faded) */}
          <div className="absolute left-4 lg:left-6 top-0 bottom-0 w-[2px] bg-white/10" />
          {/* Animated red line */}
          <div
            ref={lineRef}
            className="absolute left-4 lg:left-6 top-0 w-[2px] bg-[#E71840] origin-top transition-none"
            style={{ height: `${lineHeight}%` }}
          />

          <div className="space-y-8">
            {timelineData.map((item, i) => (
              <AnimateIn key={i} delay={i * 0.1} direction="left">
                <div className="relative">
                  {/* Dot */}
                  <div
                    className="absolute w-3 h-3 rounded-full bg-[#E71840] border-2 border-[#0A0A0A]"
                    style={{
                      left: "-2.15rem",
                      top: "1.75rem",
                    }}
                  />
                  {/* Card */}
                  <div className="glass-card rounded-2xl p-6 lg:p-8">
                    <span className="font-[family-name:var(--font-oswald)] text-[2rem] font-bold text-[#E71840] leading-none">
                      {item.year}
                    </span>
                    <p className="text-white/70 text-[15px] mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
