import { Layers, BarChart3, Clock, Users } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const BLOCKS = [
  {
    icon: Layers,
    title: "Cross-Functional Brand Alignment",
    description:
      "We unify engineering, sales, marketing, and customer success around a single brand identity BEFORE external marketing begins",
  },
  {
    icon: BarChart3,
    title: "Data-Driven, Not Guesswork",
    description:
      "Every strategy is backed by research and analytics. We make decisions based on data, not hunches",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring & Optimization",
    description:
      "We don't set it and forget it. Continuous testing, optimization, and support",
  },
  {
    icon: Users,
    title: "One Team, Full Accountability",
    description:
      "No finger-pointing between vendors. One dedicated team manages strategy, execution, and results",
  },
] as const;

export default function Differentiators() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn className="text-center">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            Why NIXAR
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
            What Makes Us Different
          </h2>
        </AnimateIn>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {BLOCKS.map(({ icon: Icon, title, description }, i) => (
            <AnimateIn key={title} delay={0.08 * i}>
              <div className="h-full rounded-2xl bg-[var(--color-bg-alt)] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
                  <Icon size={22} className="text-[var(--color-primary)]" />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-heading)] text-[1.15rem] font-700 text-[#1A1A1A]">
                  {title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                  {description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
