import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds for the demo
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable type checking during builds for the demo
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
