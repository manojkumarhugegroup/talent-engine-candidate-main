import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: ["http://192.168.0.102:3000", "http://localhost:3000"],
  experimental: {
    externalDir: true,
  },

  // Webpack customizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false, // 👈 prevent bundling canvas
      };
    }
    return config;
  },
  // 👇 force dynamic import of pdf viewer modules
  transpilePackages: ["@react-pdf-viewer/core"],
};

export default nextConfig;
