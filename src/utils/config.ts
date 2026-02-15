// utils/config.ts
export const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// クライアントサイド用（NEXT_PUBLIC_版）
export const NEXT_PUBLIC_BASE_URL =
  typeof window !== "undefined"
    ? BASE_URL
    : (process.env.NEXT_PUBLIC_VERCEL_URL ?? BASE_URL);
