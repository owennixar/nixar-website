import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | NIXAR Solutions",
  description:
    "Insights, strategies, and trends from the NIXAR Solutions team.",
};

export default function BlogPage() {
  return (
    <main className="w-full bg-[#0A0A0A]" style={{ paddingTop: "80px" }}>
      {/* Cinematic Hero */}
      <section className="relative w-full h-[50vh] overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/videos/blog-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />
        <div className="relative text-center" style={{ zIndex: 2 }}>
          <h1
            className="font-oswald font-bold text-white uppercase"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            INSIGHTS <span style={{ color: "#E71840" }}>&amp;</span> RESOURCES
            <span style={{ color: "#E71840" }}>.</span>
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            Strategy, trends, and ideas from the NIXAR team.
          </p>
        </div>
      </section>

      {/* Blog iframe */}
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
