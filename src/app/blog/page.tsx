import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | NIXAR Solutions",
  description:
    "Insights, strategies, and trends from the NIXAR Solutions team.",
};

export default function BlogPage() {
  return (
    <main className="w-full bg-[#0A0A0A]" style={{ paddingTop: "80px" }}>
      <iframe
        src="https://y-two-tawny.vercel.app/"
        className="w-full border-none"
        style={{ height: "calc(100vh - 80px)", minHeight: "800px" }}
        title="NIXAR Solutions Blog"
        allow="clipboard-write"
      />
    </main>
  );
}
