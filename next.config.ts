import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Consider fixing TypeScript errors for better stability
  },
  eslint: {
    ignoreDuringBuilds: true, // Same as above for ESLint issues
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    ppr: "incremental", // Incremental static regeneration
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

module.exports = nextConfig;
