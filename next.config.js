/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Ai-finance-manager',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: '/Ai-finance-manager/',
};

module.exports = nextConfig; 