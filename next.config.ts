import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.mixkit.co",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-slot",
      "clsx",
      "tailwind-merge",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  reactStrictMode: false,
};

export default nextConfig;
