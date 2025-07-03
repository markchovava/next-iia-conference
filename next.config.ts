import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{ 
          ignoreDuringBuilds: true,
      },
      typescript: {
        ignoreBuildErrors: true,
      },
      experimental: {
        serverActions: {
          bodySizeLimit: '300mb',
        },
      },
};

export default nextConfig;
