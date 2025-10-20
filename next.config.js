/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
  },
  devIndicators: {
    devTools: false,
  },
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;