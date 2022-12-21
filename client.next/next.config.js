/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CLIENT_HOST: process.env.CLIENT_HOST,
    API_HOST: process.env.API_HOST,
    UPLOAD_HOST: process.env.UPLOAD_HOST,
  },
  images: {
    domains: ["vechorka.loc", "vechorka.ru", "admin.vechorka.ru", "localhost"],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [460, 768, 1024, 1200],
  },
};

module.exports = nextConfig;
