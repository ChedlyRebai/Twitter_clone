/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  eslint: {

    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
