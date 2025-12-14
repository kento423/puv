'use client';

import { useEffect, useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer
} from 'recharts';

interface Props {
  data: { label: string; value: number; original: number }[];
}

export default function StatRadarChart({ data }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
        <RadarChart outerRadius={isMobile ? 60 : 90} data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" tick={{ fontSize: isMobile ? 10 : 12 }} />
          <Radar
            name="ステータス"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip
            formatter={(value: number, name: string, props: any): [string, string] => {
              return [`${props.payload.original}`, ''];
            }}
            contentStyle={{ fontSize: isMobile ? 12 : 14 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}