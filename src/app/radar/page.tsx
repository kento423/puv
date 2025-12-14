'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const StatRadarChart = dynamic(() => import('@/components/StatRadarChart'), {
  ssr: false,
});

export default function RadarPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      const response = await fetch('/api/stats');
      const result = await response.json();
      setData(result);
    }

    fetchStats();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">ステータスレーダーチャート</h1>
      {data.length > 0 ? (
        <div className="w-full px-4 md:px-0">
          <StatRadarChart data={data} />
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">データを読み込んでいます...</p>
      )}
    </div>
  );
}