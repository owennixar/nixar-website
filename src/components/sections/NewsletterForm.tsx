"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 rounded-lg border border-[#333] bg-[#111] px-4 py-3 text-sm text-white placeholder-[#666] outline-none focus:border-[#E71840] transition-colors"
      />
      <button
        type="submit"
        className="rounded-lg bg-[#E71840] px-6 py-3 text-sm font-600 uppercase tracking-wider text-white hover:bg-[#C41535] transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
