const SOCIALS = [
  { name: "Facebook", href: "https://facebook.com/nixarsolutions", icon: "/images/social-facebook.png" },
  { name: "Instagram", href: "https://instagram.com/nixarsolutions", icon: "/images/social-instagram.png" },
  { name: "LinkedIn", href: "https://linkedin.com/company/nixarsolutions", icon: "/images/social-linkedin.png" },
  { name: "TikTok", href: "https://tiktok.com/@nixarsolutions", icon: "/images/social-tiktok.png" },
];

export default function TrustBar() {
  return (
    <section
      className="py-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between md:flex-wrap md:gap-6">
          <p className="text-gray-300 text-base uppercase tracking-widest text-center">Follow Us On Our Socials!</p>
          <div className="flex items-center justify-center flex-nowrap gap-4 sm:gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`NIXAR Solutions on ${s.name}`}
                className="inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center transition-transform duration-300 hover:scale-110 hover:brightness-110"
              >
                <img
                  src={s.icon}
                  alt={`${s.name} icon`}
                  className="h-full w-full object-contain"
                  style={s.name === "LinkedIn" ? { transform: "scale(1.3)" } : undefined}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="text-white text-base font-600">4.9/5</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-400 text-base">97% Client Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  )
}
