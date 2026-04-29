const STATS = [
  { headline: "4.9/5", label: "Client Rating" },
  { headline: "DFW + Nationwide", label: "Trusted by Clients" },
  { headline: "2023", label: "Founded in Frisco, TX" },
] as const;

function StatBlock({ headline, label }: { headline: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4.5vw,3.5rem)] font-900 leading-none text-white">
        {headline}
      </p>
      <div className="mx-auto mt-3 h-[2px] w-8 bg-[var(--color-primary)]" />
      <p className="mt-3 text-[14px] font-500 text-white/50">{label}</p>
    </div>
  );
}

export default function Results() {
  return (
    <section className="relative bg-[#0A0A0A] py-24 lg:py-32 overflow-hidden">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="font-[family-name:var(--font-heading)] text-[20vw] font-900 uppercase leading-none text-white/[0.03] select-none">
          NIXAR
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            Track Record
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-white">
            Proven Results, Real Impact
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {STATS.map((stat) => (
            <StatBlock key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
