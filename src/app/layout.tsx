import type { Metadata } from "next";
import { Bebas_Neue, Anton, Oswald, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import IntroSequence from "@/components/layout/IntroSequence";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
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
      "NIXAR Solutions | Marketing Agency Dallas | Digital Marketing Agency Dallas",
    template: "%s | NIXAR Solutions",
  },
  description:
    "NIXAR Solutions is a full-service digital marketing agency in Dallas-Fort Worth. We specialize in AI-powered SEO, web development, custom AI agents, branding, and growth strategies. 500+ projects delivered with 97%+ client satisfaction.",
  keywords: [
    "marketing agency dallas",
    "digital marketing agency dallas",
    "SEO agency Dallas",
    "web development Dallas",
    "AI marketing agency",
    "Dallas marketing company",
    "DFW digital agency",
    "Frisco marketing agency",
    "AI SEO agency",
    "custom AI agents Dallas",
    "GEO optimization",
    "generative engine optimization",
  ],
  authors: [{ name: "NIXAR Solutions" }],
  creator: "NIXAR Solutions",
  publisher: "NIXAR Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nixarsolutions.com",
    siteName: "NIXAR Solutions",
    title: "NIXAR Solutions | Marketing Agency Dallas",
    description:
      "Full-service digital marketing agency in Dallas-Fort Worth. AI-powered SEO, web development, custom AI agents, and growth strategies. 500+ projects. 97%+ satisfaction.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NIXAR Solutions - Marketing Agency Dallas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIXAR Solutions | Marketing Agency Dallas",
    description:
      "Full-service digital marketing agency in Dallas-Fort Worth. AI-powered SEO, web development, and custom AI agents.",
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
      <body className="min-h-dvh flex flex-col antialiased">
        <SmoothScroll>
          <CustomCursor />
          <IntroSequence />
          <Navbar />
          <div id="main-content">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
