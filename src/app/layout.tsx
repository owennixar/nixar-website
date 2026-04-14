import type { Metadata } from "next";
import { Bebas_Neue, Anton, Oswald, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import IntroSequence from "@/components/layout/IntroSequence";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import StickyCTA from "@/components/ui/StickyCTA";
import SocialProofToast from "@/components/ui/SocialProofToast";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: "700",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: "700",
  style: "italic",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nixarsolutions.com"),
  title: {
    default:
      "Digital Marketing Agency Dallas TX | SEO, Web Design & AI Marketing | NIXAR Solutions",
    template: "%s | NIXAR Solutions",
  },
  description:
    "NIXAR Solutions is a full-service digital marketing agency in Dallas, TX. We offer SEO, web design, social media marketing, paid ads, AI automation, and branding for DFW businesses. Get your free audit today.",
  keywords: [
    "digital marketing agency dallas",
    "marketing agency dallas tx",
    "SEO company dallas",
    "web design dallas",
    "social media marketing dallas",
    "AI marketing agency dallas",
    "Dallas marketing company",
    "DFW digital agency",
    "Frisco marketing agency",
    "PPC agency dallas",
    "branding agency dallas",
    "GEO optimization",
  ],
  authors: [{ name: "NIXAR Solutions" }],
  creator: "NIXAR Solutions",
  publisher: "NIXAR Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nixarsolutions.com",
    siteName: "NIXAR Solutions",
    title: "Digital Marketing Agency Dallas TX | NIXAR Solutions",
    description:
      "Full-service digital marketing agency in Dallas, TX. SEO, web design, social media marketing, paid ads, AI automation, and branding for DFW businesses.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NIXAR Solutions. Digital Marketing Agency Dallas TX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency Dallas TX | NIXAR Solutions",
    description:
      "Full-service digital marketing agency in Dallas, TX. SEO, web design, social media, paid ads, and AI marketing.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nixarsolutions.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${anton.variable} ${oswald.variable} ${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preload" as="video" href="/videos/intro-compressed.mp4" />
        <meta name="theme-color" content="#E71840" />
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Frisco" />
      </head>
      <body className="min-h-dvh flex flex-col antialiased bg-[#0A0A0A] text-white">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <BackgroundEffects />
        <SmoothScroll>
          <div className="relative z-[1]">
            <ScrollProgressBar />
            <CustomCursor />
            <IntroSequence />
            <Navbar />
            <div id="main-content">{children}</div>
            <Footer />
            <StickyCTA />
            <SocialProofToast />
            <ExitIntentPopup />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
