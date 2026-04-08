import { founders, board, consultants } from "@/lib/data/team";
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
        {/* Avatar placeholder */}
        {/* TODO: Replace with actual team headshots */}
        <div
          className={`${size} flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-bg-alt)] to-[var(--color-primary-light)] ring-2 ring-transparent transition-all duration-300 group-hover:ring-[var(--color-primary)] group-hover:shadow-[0_0_20px_var(--color-primary-glow)]`}
        >
          <span
            className={`font-[family-name:var(--font-heading)] ${textSize} font-800 text-[var(--color-text-muted)]`}
          >
            {member.initials}
          </span>
        </div>
        <p
          className={`mt-3 font-[family-name:var(--font-heading)] font-700 text-[#1A1A1A] ${
            large ? "text-[1.1rem]" : "text-[0.95rem]"
          }`}
        >
          {member.name}
        </p>
        <p className="mt-0.5 text-[13px] text-[var(--color-text-muted)]">
          {member.role}
        </p>
      </div>
    </AnimateIn>
  );
}

export default function TeamSection() {
  return (
    <section className="bg-[var(--color-bg-alt)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn className="text-center">
          <p className="text-[0.75rem] font-600 uppercase tracking-[0.15em] text-[var(--color-primary)]">
            Our People
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3rem)] font-800 leading-tight tracking-tight text-[#1A1A1A]">
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
            <h3 className="text-[11px] font-600 uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Board of Directors
            </h3>
          </AnimateIn>
          <div className="mt-8 flex flex-wrap justify-center gap-10 lg:gap-14">
            {board.map((m, i) => (
              <MemberCard key={m.name} member={m} delay={0.15 + i * 0.08} />
            ))}
          </div>
        </div>

        {/* Consultant */}
        {consultants.length > 0 && (
          <div className="mt-16">
            <AnimateIn className="text-center">
              <h3 className="text-[11px] font-600 uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                Consultant
              </h3>
            </AnimateIn>
            <div className="mt-8 flex justify-center">
              {consultants.map((m, i) => (
                <MemberCard key={m.name} member={m} delay={0.2 + i * 0.1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
