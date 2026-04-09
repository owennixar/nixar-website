import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | NIXAR Solutions",
  description:
    "Insights, strategies, and trends from the NIXAR Solutions team.",
};

export default function BlogPage() {
  return (
    <main className="relative w-full min-h-screen">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full"
        style={{ zIndex: 0, objectFit: "contain", backgroundColor: "#0A0A0A" }}
      >
        <source src="/videos/blog-bg.mp4" type="video/mp4" />
      </video>
      <iframe
        src="https://y-two-tawny.vercel.app/"
        className="relative w-full border-none"
        style={{ zIndex: 1, height: "100vh", minHeight: "100vh", background: "transparent" }}
        title="NIXAR Solutions Blog"
        allow="clipboard-write"
      />
    </main>
  );
}
