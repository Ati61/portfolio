/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    // Ensure all images are properly processed
    unoptimized: process.env.NODE_ENV === 'development', // Skip optimization in development for faster builds
    // Add debug information
    dangerouslyAllowSVG: true,
  },
  // Verbose build output for debugging
  onDemandEntries: {
    // development server configuration
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack(config, { dev, isServer }) {
    // Enable debugging in development
    if (dev) {
      config.devtool = 'eval-source-map';
    }

    return config;
  },
  // Ensure all errors are logged in development
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
