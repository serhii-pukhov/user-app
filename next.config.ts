import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  reactStrictMode: true,
  eslint: {
      ignoreDuringBuilds: true,
  },
}

export default nextConfig;
