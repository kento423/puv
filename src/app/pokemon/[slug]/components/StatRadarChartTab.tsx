"use client";

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Info } from "lucide-react";

interface StatRadarChartTabProps {
  slug: string;
}

// モックデータ：対角線配置で軸を設定
// HP - 素早さ、攻撃 - 特攻、防御 - 特防
const mockData = [
  { name: "HP", value: 75 },
  { name: "攻撃", value: 80 },
  { name: "特攻", value: 65 },
  { name: "防御", value: 70 },
  { name: "特防", value: 72 },
  { name: "素速", value: 68 },
];

export default function StatRadarChartTab({ slug }: StatRadarChartTabProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 px-4 py-3 rounded-lg text-sm text-amber-800 dark:text-amber-100">
        <Info className="w-4 h-4 shrink-0" /> 詳細なステータス仕様は現在調整中です。Coming soon...
      </div>

      {/* レーダーチャートのモック表示 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-4">
          ステータス（Lv15時点）
        </h3>
        <div className="flex justify-center" style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={mockData}>
              <PolarGrid
                stroke="rgba(156, 163, 175, 0.5)"
                strokeDasharray="5 5"
              />
              <PolarAngleAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "rgba(107, 114, 128, 1)" }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "rgba(107, 114, 128, 1)" }}
              />
              <Radar
                name="ステータス"
                dataKey="value"
                stroke="rgb(147, 51, 234)"
                fill="rgb(147, 51, 234)"
                fillOpacity={0.25}
                isAnimationActive={true}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* ステータス詳細テーブル */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="text-left py-2 px-2 text-gray-700 dark:text-gray-300 font-semibold">ステータス</th>
                <th className="text-right py-2 px-2 text-gray-700 dark:text-gray-300 font-semibold">Lv15</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((stat) => (
                <tr key={stat.name} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 px-2 text-gray-700 dark:text-gray-300">{stat.name}</td>
                  <td className="text-right py-2 px-2 text-gray-900 dark:text-white font-medium">{stat.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
