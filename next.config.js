/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["pacesetterfrontier.com", "localhost"],
    unoptimized: true,
  },
  experimental: {
    esmExternals: false,
  },
  output: "standalone",
}

module.exports = nextConfig
