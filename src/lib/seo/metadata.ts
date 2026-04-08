import type { Metadata } from "next";

const SITE_URL = "https://nixarsolutions.com";
const SITE_NAME = "NIXAR Solutions";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = "/og-image.jpg",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords: [
      ...keywords,
      "NIXAR Solutions",
      "marketing agency dallas",
      "digital marketing dallas",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

// City page metadata generator
export function generateCityMetadata(
  cityName: string,
  slug: string,
  seoTitle: string,
  seoDescription: string
): Metadata {
  return generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    path: `/${slug}`,
    keywords: [
      `marketing agency ${cityName.toLowerCase()}`,
      `digital marketing ${cityName.toLowerCase()}`,
      `SEO ${cityName.toLowerCase()}`,
      `web development ${cityName.toLowerCase()}`,
      `${cityName.toLowerCase()} marketing company`,
    ],
  });
}

// Service page metadata generator
export function generateServiceMetadata(
  serviceTitle: string,
  slug: string,
  seoTitle: string,
  seoDescription: string
): Metadata {
  return generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    path: `/services/${slug}`,
    keywords: [
      `${serviceTitle.toLowerCase()} dallas`,
      `${serviceTitle.toLowerCase()} agency`,
      `${serviceTitle.toLowerCase()} DFW`,
    ],
  });
}
