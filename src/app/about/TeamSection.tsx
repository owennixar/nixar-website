import { founders, board } from "@/lib/data/team";
import type { TeamMember } from "@/lib/data/team";
import AnimateIn from "@/components/ui/AnimateIn";

function MemberCard({
  member,
  large,
  delay,
}: {
  member: TeamMember;
  large?: boolean;
  delay: number;
}) {
  const size = large ? "h-28 w-28" : "h-20 w-20";
  const textSize = large
    ? "text-2xl"
    : "text-lg";

  return (
    <AnimateIn delay={delay}>
      <div className="group flex flex-col items-center text-center">
        <div
          className={`${size} overflow-hidden rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:ring-[#E71840] group-hover:shadow-[0_0_20px_rgba(231,24,64,0.2)]`}
        >
          <img
            src={member.image}
            alt={`${member.name}, ${member.role} at NIXAR Solutions`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <p
          className={`mt-3 font-[family-name:var(--font-heading)] font-700 text-white ${
            large ? "text-[1.1rem]" : "text-[0.95rem]"
          }`}
        >
          {member.name}
        </p>
        <p className="mt-0.5 text-[13px] text-white/40">
          {member.role}
        </p>
      </div>
    </AnimateIn>
  );
}

export default function TeamSection() {
  return (
    <section className="bg-white/[0.02] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn className="text-center">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[#E71840]">
            Our People
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-white">
            The NIXAR Team
          </h2>
        </AnimateIn>

        {/* Co-Founders — large */}
        <div className="mt-14 flex flex-wrap justify-center gap-16">
          {founders.map((m, i) => (
            <MemberCard key={m.name} member={m} large delay={0.1 + i * 0.1} />
          ))}
        </div>

        {/* Board of Directors */}
        <div className="mt-16">
          <AnimateIn className="text-center">
            <h3 className="text-[11px] font-600 uppercase tracking-[0.2em] text-white/40">
              Board of Directors
            </h3>
          </AnimateIn>
          <div className="mt-8 flex flex-wrap justify-center gap-10 lg:gap-14">
            {board.map((m, i) => (
              <MemberCard key={m.name} member={m} delay={0.15 + i * 0.08} />
            ))}
          </div>
        </div>

        {/* Partner Agency */}
        <div className="mt-16">
          <AnimateIn className="text-center">
            <h3 className="text-[11px] font-600 uppercase tracking-[0.2em] text-[#E71840]">
              Partner Agency
            </h3>
          </AnimateIn>
          <AnimateIn delay={0.2} className="mt-8 text-center">
            <a
              href="https://xlncdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img
                src="/images/xlnc-logo.png"
                alt="XLNC Digital — Partner Agency"
                className="w-20 h-20 object-contain rounded-xl mx-auto"
              />
              <p className="mt-3 text-sm" style={{ color: '#E71840' }}>Partner Agency</p>
            </a>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
