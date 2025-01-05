import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: false, // Disable strict mode
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;