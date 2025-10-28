import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com https://cmp.g.doubleclick.net https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; frame-src 'self' https:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
