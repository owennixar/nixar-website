export default function TrustMarquee() {
  const text =
    "Digital-Transformation Agency \u00A0\u2022\u00A0 Content-Centric & SEO-Driven \u00A0\u2022\u00A0 Sales-Focused & Lead-Conversion \u00A0\u2022\u00A0 End-to-End Digital Infrastructure \u00A0\u2022\u00A0 Full-Funnel Sales Support \u00A0\u2022\u00A0 20+ Years Combined Experience \u00A0\u2022\u00A0 500+ Projects Delivered \u00A0\u2022\u00A0 97%+ Client Satisfaction \u00A0\u2022\u00A0 ";

  return (
    <section className="overflow-hidden bg-[var(--color-bg-alt)] py-6" aria-label="Brand descriptors">
      <div className="trust-marquee-track flex whitespace-nowrap">
        {[0, 1].map((n) => (
          <span
            key={n}
            className="inline-block text-[16px] font-600 uppercase tracking-[0.12em] text-[#777]"
            aria-hidden={n === 1}
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
