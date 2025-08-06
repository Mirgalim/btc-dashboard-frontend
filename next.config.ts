import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  images: {
    domains: ["images.unsplash.com"], // шаардлагатай домэйн
  },
};

export default nextConfig;
