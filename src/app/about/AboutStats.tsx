const STATS = [
  {
    headline: "4.9/5",
    label: "Client Rating",
    disclaimer: "Average rating from clients across DFW and beyond",
  },
  {
    headline: "DFW + Nationwide",
    label: "Trusted by Clients",
    disclaimer: "Serving Dallas-Fort Worth plus clients in Miami, New York, and Washington",
  },
  {
    headline: "2023",
    label: "Founded in Frisco, TX",
    disclaimer: "Built by Anwar Mirza and Owen Nixon to bring AI-first marketing to DFW",
  },
] as const;

function StatBlock({
  headline,
  label,
  disclaimer,
}: {
  headline: string;
  label: string;
  disclaimer: string;
}) {
  return (
    <div
      className="flex flex-col items-center text-center py-10 px-6 rounded-2xl h-full"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <p className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-900 leading-tight text-white">
        {headline}
      </p>
      <p className="mt-3 text-lg font-600 text-white">{label}</p>
      <p className="mt-2 text-sm leading-snug text-white/40 max-w-xs">{disclaimer}</p>
    </div>
  );
}

export default function AboutStats() {
  return (
    <section className="border-y border-white/10 bg-transparent py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
          By The Numbers
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {STATS.map((stat) => (
            <StatBlock key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
