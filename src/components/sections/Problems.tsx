import {
  TrendingDown,
  SearchX,
  ThumbsDown,
  DollarSign,
  Shuffle,
  Bot,
} from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";

const PROBLEMS = [
  {
    icon: TrendingDown,
    problem: "Low Website Conversions",
    solution:
      "We optimize UX, messaging, and design for maximum lead generation",
  },
  {
    icon: SearchX,
    problem: "Invisible on Google",
    solution:
      "Our SEO and AI SEO services drive organic + AI search visibility across traditional and AI engines",
  },
  {
    icon: ThumbsDown,
    problem: "Social Media Not Converting",
    solution:
      "Strategic campaigns with precision targeting and CTAs that turn followers into customers",
  },
  {
    icon: DollarSign,
    problem: "Ads Burning Money",
    solution:
      "We fine-tune targeting, creative, and bidding strategies to maximize every dollar of your ad spend",
  },
  {
    icon: Shuffle,
    problem: "Inconsistent Brand",
    solution:
      "Cross-functional brand alignment across every touchpoint before any external marketing begins",
  },
  {
    icon: Bot,
    problem: "Not Showing Up in AI Search",
    solution:
      "GEO optimization ensures you get cited when people ask ChatGPT and Perplexity for recommendations",
  },
] as const;

export default function Problems() {
  return (
    <section className="bg-[var(--color-bg-alt)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn className="text-center">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            Pain Points
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
            Solutions to Your Problems
          </h2>
        </AnimateIn>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, problem, solution }, i) => (
            <AnimateIn key={problem} delay={0.05 * i}>
              <div className="group h-full rounded-2xl border border-transparent bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-t-[3px] hover:border-t-[var(--color-primary)] hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-light)]">
                  <Icon size={20} className="text-[var(--color-primary)]" />
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-[1.05rem] font-700 text-[#1A1A1A]">
                  {problem}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-[var(--color-text-secondary)]">
                  {solution}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
