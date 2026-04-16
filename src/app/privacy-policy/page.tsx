import type { Metadata } from "next";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Privacy Policy | NIXAR Solutions",
  description:
    "Learn about NIXAR Solutions' privacy practices, how we collect and use your information, and your rights regarding your personal data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you voluntarily provide when you fill out forms on our website, request a consultation, or contact us via email or phone. This includes your name, email address, phone number, company name, and any details you share about your project or business needs. Additionally, we automatically collect certain usage data when you visit our site, including your IP address, browser type, operating system, referring URLs, pages visited, and the dates and times of your visits. We may also collect information through cookies and similar tracking technologies that help us understand how visitors interact with our website and improve your overall browsing experience.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use the information we collect to deliver, maintain, and improve our digital marketing, web development, and AI services. Your contact information allows us to respond to inquiries, schedule consultations, and communicate project updates. We may use your email address to send relevant updates about our services, industry insights, or promotional offers, though you can opt out at any time. Usage data helps us analyze website performance, identify areas for improvement, and tailor our content to better serve our visitors. We also use collected information to protect the security of our website and to comply with applicable legal obligations.",
  },
  {
    title: "3. Cookies & Tracking",
    content:
      "Our website uses cookies and similar tracking technologies to enhance your experience. Cookies are small text files stored on your device that help us recognize returning visitors, remember preferences, and gather analytics data. We use Google Analytics to understand how visitors engage with our website, which pages are most popular, and how users navigate through our content. These analytics cookies collect anonymized data that does not personally identify you. You can manage or disable cookies through your browser settings at any time. Please note that disabling certain cookies may limit your ability to use some features of our website. We do not use cookies for targeted advertising purposes.",
  },
  {
    title: "4. Third-Party Services",
    content:
      "We work with trusted third-party service providers to support our business operations. Google Analytics helps us measure website traffic and user engagement patterns. If applicable, payment processors handle financial transactions securely on our behalf, and we do not store your credit card or banking information on our servers. Our hosting and infrastructure providers maintain the servers and systems that power our website. Each of these third-party services has its own privacy policy governing how they handle data. We only share the minimum information necessary for these services to function and we carefully vet each provider to ensure they maintain appropriate data protection standards.",
  },
  {
    title: "5. Data Security",
    content:
      "We take the security of your personal information seriously and implement industry-standard measures to protect it. Our website uses SSL/TLS encryption to secure data transmitted between your browser and our servers. We store personal information in secure, access-controlled environments and limit access to authorized personnel only. We regularly review and update our security practices to address emerging threats and vulnerabilities. While no method of electronic transmission or storage is completely secure, we strive to use commercially acceptable means to protect your personal data. In the event of a data breach that affects your information, we will notify you in accordance with applicable law.",
  },
  {
    title: "6. Your Rights",
    content:
      "You have the right to access, correct, or delete the personal information we hold about you. You may request a copy of the data we have collected, ask us to update any inaccurate information, or request that we delete your personal data from our systems. If you have subscribed to any communications, you can unsubscribe at any time using the link provided in our emails or by contacting us directly. Depending on your jurisdiction, you may have additional rights under applicable data protection laws, including the right to restrict processing or to data portability. We will respond to all legitimate requests within a reasonable timeframe, typically within 30 days.",
  },
  {
    title: "7. Contact Us About Privacy",
    content:
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please do not hesitate to reach out. You can contact us by email at hello@nixarsolutions.com or by phone at 469-759-3638. Our mailing address is NIXAR Solutions, Frisco, TX. We are committed to resolving any privacy-related issues promptly and transparently. We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. When we make significant changes, we will update the \"Last Updated\" date at the top of this page and, where appropriate, notify you directly.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pb-12 pt-12 lg:pt-16">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <AnimateIn>
            <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(2.5rem,6vw,4.5rem)] font-700 uppercase leading-[1.05] text-white">
              PRIVACY
              <span className="text-[var(--color-primary)]">.</span>
              <br />
              POLICY
              <span className="text-[var(--color-primary)]">.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="mt-6 text-[16px] text-white/75">
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
                <p className="mt-4 text-[16px] leading-[1.8] text-[#999]">
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
