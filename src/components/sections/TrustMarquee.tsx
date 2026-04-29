export default function TrustMarquee() {
  const text =
    "Digital-Transformation Agency \u00A0\u2022\u00A0 Content-Centric & SEO-Driven \u00A0\u2022\u00A0 Sales-Focused & Lead-Conversion \u00A0\u2022\u00A0 End-to-End Digital Infrastructure \u00A0\u2022\u00A0 Full-Funnel Sales Support \u00A0\u2022\u00A0 Trusted by Clients Across DFW and Nationwide \u00A0\u2022\u00A0 4.9/5 Client Rating \u00A0\u2022\u00A0 ";

  return (
    <section className="overflow-hidden bg-[var(--color-bg-alt)] py-6" aria-label="Brand descriptors">
      <div className="trust-marquee-track flex whitespace-nowrap">
        {[0, 1].map((n) => (
          <span
            key={n}
            className="inline-block text-[12px] font-600 uppercase tracking-[0.12em] text-[#777]"
            aria-hidden={n === 1}
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
