import AnimateIn from "@/components/ui/AnimateIn";

const values = [
  {
    number: "01",
    title: "Transformation Over Marketing",
    description:
      "We don\u2019t just run campaigns. We fundamentally transform how businesses operate online. Marketing is a byproduct of getting the foundation right.",
  },
  {
    number: "02",
    title: "Alignment Before Action",
    description:
      "We unify your engineering, sales, marketing, and customer success teams around a single brand identity BEFORE any external marketing begins. This is our core differentiator.",
  },
  {
    number: "03",
    title: "Accountability, Not Excuses",
    description:
      "One team. Full ownership. We don\u2019t blame the algorithm, the platform, or the market. We take accountability for your digital success.",
  },
];

export default function Values() {
  return (
    <section className="bg-[#111] py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <AnimateIn>
          <h2 className="font-[family-name:var(--font-oswald)] text-[2.5rem] lg:text-[3rem] font-bold uppercase text-white text-center mb-16">
            What We Believe
          </h2>
        </AnimateIn>

        <div className="space-y-6">
          {values.map((value, i) => (
            <AnimateIn key={i} delay={i * 0.15}>
              <div className="glass-card rounded-2xl p-8 lg:p-10">
                <span className="font-[family-name:var(--font-oswald)] text-[4rem] font-bold text-[#E71840]/15 leading-none block">
                  {value.number}
                </span>
                <h3 className="font-[family-name:var(--font-oswald)] text-[1.5rem] font-bold text-white uppercase mt-2">
                  {value.title}
                </h3>
                <p className="text-[16px] text-[#999] mt-3 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
