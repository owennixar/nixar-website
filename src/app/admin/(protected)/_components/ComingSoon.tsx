export default function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Nixar Portal</p>
        <h1 className="mt-1 font-[var(--font-bebas)] text-4xl tracking-wide md:text-5xl">
          {title} <span className="text-[#E71840]">·</span>
        </h1>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#E71840]/30 bg-[#E71840]/10 text-2xl text-[#E71840]">
          ◌
        </div>
        <h2 className="text-lg font-semibold">Coming next</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/50">{description}</p>
        <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-white/30">Under construction · hackathon phase</p>
      </div>
    </div>
  );
}
