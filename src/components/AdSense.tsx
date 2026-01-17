'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  adSlot?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSense({ adSlot }: AdSenseProps) {
  const slot = adSlot || process.env.NEXT_PUBLIC_GOOGLE_AD_SLOT;
  const client = process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT;

  // 環境変数が設定されていない場合はレンダリングしない
  if (!slot || !client) {
    console.warn('Google AdSense environment variables are not set');
    return null;
  }

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
