/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Ai-finance-manager',
  images: {
    unoptimized: true,
  },
  publicRuntimeConfig: {
    basePath: '/Ai-finance-manager',
  },
  assetPrefix: '/Ai-finance-manager',
};

module.exports = nextConfig; 