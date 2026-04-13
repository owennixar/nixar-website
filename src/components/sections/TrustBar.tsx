export default function TrustBar() {
  return (
    <section
      className="py-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <p className="text-gray-500 text-sm uppercase tracking-widest">Trusted By</p>
          <div className="flex items-center gap-8 lg:gap-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            <span className="font-[family-name:var(--font-oswald)] text-lg text-white">Tire Geeks</span>
            <span className="font-[family-name:var(--font-oswald)] text-lg text-white">SYB Builders</span>
            <span className="font-[family-name:var(--font-oswald)] text-lg text-white hidden sm:inline">Lonestar Kart Park</span>
            <span className="font-[family-name:var(--font-oswald)] text-lg text-white hidden md:inline">Nixon Jach Hubbard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="text-white text-sm font-600">4.9/5</span>
            </div>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span className="text-gray-400 text-sm hidden sm:inline">97% Client Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  )
}
