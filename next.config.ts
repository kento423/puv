import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Trigger restart for prisma config update

  // Vercel デプロイ時に NEXT_PUBLIC_BASE_URL を動的に設定
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  },
};

export default nextConfig;
