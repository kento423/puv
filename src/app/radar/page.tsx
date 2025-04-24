// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page

// import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

// const dummyData = [
//   { label: 'HP', value: 70, original: 2700 },
//   { label: 'こうげき', value: 60, original: 150 },
//   { label: 'とくこう', value: 90, original: 420 },
//   { label: 'ぼうぎょ', value: 40, original: 80 },
//   { label: 'とくぼう', value: 30, original: 60 },
//   { label: 'すばやさ', value: 50, original: 110 },
// ];

// export default function RadarPage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-8">
//       <h1 className="text-xl font-bold mb-6">ステータスレーダーチャート</h1>
//       <RadarChart outerRadius={90} width={500} height={400} data={dummyData}>
//         <PolarGrid />
//         <PolarAngleAxis dataKey="label" />
//         <PolarRadiusAxis angle={30} domain={[0, 100]} />
//         <Radar name="ステータス" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//         <Tooltip
//           formatter={(value, name, props) => `${props.payload.original}（実値）`}
//           labelFormatter={(label) => `ステータス: ${label}`}
//         />
//       </RadarChart>
//     </div>
//   );
// }
// "use client";

// // ✅ 1. ダミーデータ例（1キャラ分）
// const rawStats = {
//     name: "ピカチュウ",
//     imageUrl: "https://unite-db.com/image/pikachu.png",
//     stats: {
//       HP: 2700,
//       こうげき: 150,
//       とくこう: 420,
//       ぼうぎょ: 80,
//       とくぼう: 60,
//       すばやさ: 110
//     }
//   };
  
//   // ✅ 2. 全キャラからmin/maxを算出（ここでは仮の数値）
//   const statMinMax = {
//     HP: { min: 2000, max: 10000 },
//     こうげき: { min: 50, max: 300 },
//     とくこう: { min: 100, max: 500 },
//     ぼうぎょ: { min: 50, max: 200 },
//     とくぼう: { min: 40, max: 180 },
//     すばやさ: { min: 80, max: 150 }
//   };
  
//   function normalize(value, min, max) {
//     return ((value - min) / (max - min)) * 100;
//   }
  
//   // ✅ 3. 正規化データへ変換
//   const normalizedStats = Object.entries(rawStats.stats).map(([label, original]) => {
//     const { min, max } = statMinMax[label];
//     return {
//       label,
//       value: normalize(original, min, max),
//       original
//     };
//   });
  
//   // ✅ 4. Rechartsを使ってチャート表示
//   import {
//     Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip
//   } from 'recharts';
  
//   function StatRadarChart({ data }) {
//     return (
//       <RadarChart outerRadius={90} width={500} height={400} data={data}>
//         <PolarGrid />
//         <PolarAngleAxis dataKey="label" />
//         <PolarRadiusAxis angle={30} domain={[0, 100]} />
//         <Radar
//           name="ステータス"
//           dataKey="value"
//           stroke="#8884d8"
//           fill="#8884d8"
//           fillOpacity={0.6}
//         />
//         {/* <Tooltip
//           formatter={(value, name, props) => `${props.payload.original}（実値）`}
//           labelFormatter={(label) => `ステータス: ${label}`}
//         /> */}
//         <Tooltip
//           formatter={(value: number, name: string, props: any): [string, string] => {
//             return [`${props.payload.original}（実値）`, name];
//           }}
//           labelFormatter={(label: string) => `ステータス: ${label}`}
//         />
//       </RadarChart>
//     );
//   }
  
//   // ✅ 使用例（Appなどで）
//   export default function App() {
//     return (
//       <div className="p-4">
//         <h1 className="text-xl font-bold mb-4">ピカチュウのステータスチャート</h1>
//         <StatRadarChart data={normalizedStats} />
//       </div>
//     );
//   }

'use client';

import dynamic from 'next/dynamic';

const StatRadarChart = dynamic(() => import('@/components/StatRadarChart'), {
  ssr: false,
});

// const dummyData = [
//   { label: 'HP', value: 70, original: 2700 },
//   { label: 'こうげき', value: 60, original: 150 },
//   { label: 'とくこう', value: 90, original: 420 },
//   { label: 'ぼうぎょ', value: 40, original: 80 },
//   { label: 'とくぼう', value: 30, original: 60 },
//   { label: 'すばやさ', value: 50, original: 110 },
// ];
const dummyData = [
  { label: 'HP', value: 0.7, original: 2700 },
  { label: '攻撃', value: 0.6, original: 150 },
  { label: '特攻', value: 0.9, original: 420 },
  { label: '防御', value: 0.4, original: 80 },
  { label: '特防', value: 0.3, original: 60 },
  { label: '素早さ', value: 0.5, original: 110 },
];

export default function RadarPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-xl font-bold mb-6">ステータスレーダーチャート</h1>
      <StatRadarChart data={dummyData} />
    </div>
  );
}