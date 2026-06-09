import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore ESLint errors during production builds (e.g., on Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optimize for Vercel deployment
  serverExternalPackages: ['openai'],
  // Handle trailing slashes
  trailingSlash: false,
};

export default nextConfig;
