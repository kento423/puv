'use client';

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip
} from 'recharts';

interface Props {
  data: { label: string; value: number; original: number }[];
}

export default function StatRadarChart({ data }: Props) {
  return (
    <RadarChart outerRadius={90} width={500} height={400} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="label" />
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
      />
    </RadarChart>
  );
}