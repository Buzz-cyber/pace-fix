/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["pacesetterfrontier.com", "localhost", "api.pacesetterfrontier.com"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Reduced from 86400 (24h) to 60 seconds for fresh images
    formats: ["image/avif", "image/webp"],
  },
  output: "standalone",
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
