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
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-xl font-bold mb-6">ステータスレーダーチャート</h1>
      {data.length > 0 ? (
        <StatRadarChart data={data} />
      ) : (
        <p>データを読み込んでいます...</p>
      )}
    </div>
  );
}