import type { Metadata } from "next";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms and conditions governing the use of NIXAR Solutions' website and digital services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the NIXAR Solutions website and any of our digital marketing, web development, or AI services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services. These terms constitute a legally binding agreement between you and NIXAR Solutions. We reserve the right to modify these terms at any time, and your continued use of our services following any changes constitutes acceptance of those modifications. It is your responsibility to review these terms periodically for updates.",
  },
  {
    title: "2. Description of Services",
    content:
      "NIXAR Solutions provides a range of digital services including but not limited to web design and development, search engine optimization (SEO), AI-powered marketing solutions, custom AI agent development, branding, social media management, and digital strategy consulting. The specific scope, deliverables, timelines, and pricing for each engagement will be outlined in a separate proposal or statement of work agreed upon by both parties. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time. All services are provided on a professional best-efforts basis, and results may vary depending on market conditions and other external factors.",
  },
  {
    title: "3. Payment Terms",
    content:
      "Payment terms for our services are established in the individual proposal or contract for each project engagement. Unless otherwise specified, invoices are due upon receipt or within the timeframe stated in the agreement. Late payments may be subject to interest charges as permitted by applicable law. We reserve the right to suspend work on any project for which payment is overdue. Deposits, where required, are non-refundable unless explicitly stated otherwise. All prices are quoted in US dollars. You are responsible for any applicable taxes, duties, or fees associated with the services provided. Refund policies, if any, will be detailed in the specific project agreement.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "All content on the NIXAR Solutions website, including text, graphics, logos, images, and software, is the property of NIXAR Solutions and is protected by United States and international intellectual property laws. You may not reproduce, distribute, or create derivative works from our website content without prior written consent. For client projects, intellectual property ownership and usage rights will be defined in the individual project agreement. Generally, upon full payment, clients receive ownership of custom deliverables created specifically for their project, while NIXAR Solutions retains ownership of proprietary tools, frameworks, templates, and methodologies used in the delivery of services.",
  },
  {
    title: "5. Limitation of Liability",
    content:
      "To the fullest extent permitted by law, NIXAR Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our website or services. This includes, without limitation, damages for loss of profits, revenue, data, business opportunities, or goodwill. Our total liability for any claim arising from these terms or our services shall not exceed the amount you paid to NIXAR Solutions during the twelve months preceding the claim. We do not guarantee specific results from our marketing or SEO services, as outcomes depend on numerous factors beyond our control including search engine algorithms, market conditions, and competitive landscapes.",
  },
  {
    title: "6. Indemnification",
    content:
      "You agree to indemnify, defend, and hold harmless NIXAR Solutions, its co-founders, employees, contractors, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorney fees) arising from or related to your use of our services, your breach of these terms, your violation of any applicable law, or any content or materials you provide to us for use in your project. This indemnification obligation survives the termination of any agreement between you and NIXAR Solutions. We reserve the right to assume exclusive defense and control of any matter subject to indemnification, at your expense.",
  },
  {
    title: "7. Governing Law",
    content:
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising from or related to these terms or our services shall be resolved exclusively in the state or federal courts located in Collin County, Texas. Both parties consent to the personal jurisdiction of such courts and waive any objection to venue. If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect. These terms represent the complete agreement between you and NIXAR Solutions regarding the subject matter herein.",
  },
  {
    title: "8. Contact Information",
    content:
      "If you have any questions or concerns about these Terms and Conditions, please contact us at hello@nixarsolutions.com or call us at 469-759-3638. Our office is located in Frisco, Texas. We are committed to addressing any questions about these terms in a timely and transparent manner. For formal legal notices, please send correspondence to our business address. We encourage you to reach out before taking any formal legal action so that we can attempt to resolve any issues directly and amicably.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pb-12 pt-12 lg:pt-16">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <AnimateIn>
            <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,6vw,4.5rem)] font-700 uppercase leading-[1.05] text-white">
              TERMS &
              <br />
              CONDITIONS
              <span className="text-[var(--color-primary)]">.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="mt-6 text-[15px] text-white/40">
              Last updated: April 2026
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-24">
        <div className="mx-auto max-w-4xl space-y-8 px-5 lg:px-8">
          {sections.map((section, i) => (
            <AnimateIn key={section.title} delay={0.1 * i}>
              <div className="glass-card p-8 lg:p-10">
                <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(1.25rem,2.5vw,1.5rem)] font-700 uppercase text-white">
                  {section.title}
                </h2>
                <p className="mt-4 text-[15px] leading-[1.8] text-[#999]">
                  {section.content}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
