/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/search/image/:path*',
        destination: 'https://openapi.naver.com/v1/search/image/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
