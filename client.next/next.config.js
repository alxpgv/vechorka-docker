/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CLIENT_HOST: process.env.CLIENT_HOST,
    API_HOST: process.env.API_HOST,
    API_HOST_DOCKER: process.env.API_HOST_DOCKER,
    UPLOAD_HOST: process.env.UPLOAD_HOST,
    UPLOAD_HOST_DOCKER: process.env.UPLOAD_HOST_DOCKER,
    DOCKER: process.env.DOCKER,
  },
  images: {
    domains: ["vechorka.loc", "localhost", "wp"],
  },
};

module.exports = nextConfig;
