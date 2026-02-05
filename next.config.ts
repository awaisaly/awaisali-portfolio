import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Reduce bundle size by rewriting imports for large libraries.
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
