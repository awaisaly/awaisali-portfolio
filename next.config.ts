import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // Reduce bundle size by rewriting imports for large libraries.
    optimizePackageImports: ['lucide-react'],
    // Inline/optimize critical CSS to reduce render-blocking impact.
    optimizeCss: true,
  },
  turbopack: {
    // Prevent root inference from parent folders with other lockfiles.
    root: __dirname,
  },
};

export default nextConfig;
