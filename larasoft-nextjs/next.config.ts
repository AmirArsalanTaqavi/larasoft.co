// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/wp-content/uploads/**', // Be specific
      },
      // TODO: When you go live, add your production domain here
      // {
      //   protocol: 'https',
      //   hostname: 'your-production-wp-domain.com',
      //   pathname: '/wp-content/uploads/**',
      // },
    ],
  },
};

export default nextConfig;