import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | NIXAR Solutions",
  description:
    "Insights, strategies, and trends from the NIXAR Solutions team.",
};

export default function BlogPage() {
  return (
    <main className="w-full bg-[#0A0A0A]">
      {/* HERO WITH VIDEO BACKGROUND */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-black/50" style={{ zIndex: 1 }} />
        <div className="relative text-center px-4" style={{ zIndex: 2 }}>
          <div className="inline-block border border-red-500/30 rounded-full px-4 py-1 mb-6">
            <span className="text-xs uppercase tracking-widest" style={{ color: '#E71840' }}>● NIXAR SOLUTIONS BLOG</span>
          </div>
          <h1 className="font-oswald font-bold text-white text-5xl md:text-7xl leading-tight">
            The <span className="italic" style={{ color: '#E71840', fontFamily: 'Playfair Display, serif' }}>Future</span> of<br />
            Marketing, <span className="underline decoration-2 underline-offset-8" style={{ color: '#E71840' }}>Decoded.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            NIXAR Solutions breaks down emerging trends in AI, SEO, social media, and the Dallas marketing landscape — so you can stay ahead.
          </p>
          <p className="mt-3 text-xs text-gray-600 tracking-wider">
            Powered by <span style={{ color: '#E71840' }}>NIXAR Solutions</span> — Dallas&apos;s AI-forward marketing agency
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a href="#blog-content" className="px-8 py-3 bg-[#E71840] text-white font-semibold rounded-lg hover:bg-[#C41535] transition-colors">
              Read Latest ↓
            </a>
            <a href="/contact" className="px-8 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-white hover:text-white transition-colors">
              Work With Us
            </a>
          </div>
        </div>
      </section>

      {/* BLOG CONTENT IFRAME - skip the blog's own hero */}
      <div id="blog-content" style={{ overflow: 'hidden', height: '200vh' }}>
        <iframe
          src="https://y-two-tawny.vercel.app/"
          className="w-full border-none"
          style={{
            height: 'calc(200vh + 950px)',
            marginTop: '-950px',
            border: 'none',
            background: '#0A0A0A',
          }}
          title="NIXAR Solutions Blog"
          allow="clipboard-write"
        />
      </div>
    </main>
  );
}
