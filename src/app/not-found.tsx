import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 pt-20 text-center">
      {/* Large 404 with brand styling */}
      <div className="relative">
        <span
          className="block font-[family-name:var(--font-heading)] text-[clamp(8rem,20vw,14rem)] font-900 leading-none text-[var(--color-bg-alt)] select-none"
          aria-hidden="true"
        >
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.5rem)] font-900 text-[#1A1A1A]">
          Page Not Found
        </span>
      </div>

      <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-[var(--color-text-secondary)]">
        Looks like this page took a wrong turn. No worries — let&apos;s get you back
        to where the transformation happens.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-full bg-[var(--color-primary)] px-7 text-[14px] font-600 text-white transition-all hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-[var(--color-primary-glow)]"
        >
          Back to Home
        </Link>
        <Link
          href="/services"
          className="inline-flex h-12 items-center rounded-full border-2 border-[var(--color-border)] px-7 text-[14px] font-600 text-[#1A1A1A] transition-all hover:border-[#1A1A1A]"
        >
          View Services
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 text-[13px]">
        <Link href="/about" className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]">
          About
        </Link>
        <Link href="/dallas" className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]">
          Dallas
        </Link>
        <Link href="/portfolio" className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]">
          Portfolio
        </Link>
        <Link href="/contact" className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]">
          Contact
        </Link>
      </div>
    </main>
  );
}
