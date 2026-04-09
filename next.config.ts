import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "https://y-two-tawny.vercel.app/",
      },
      {
        source: "/blog/:path*",
        destination: "https://y-two-tawny.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
