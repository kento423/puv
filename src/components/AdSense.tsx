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
    // スクリプトが既に読み込まれているか確認
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // スクリプト読み込み後に初期化
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [client]);

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
