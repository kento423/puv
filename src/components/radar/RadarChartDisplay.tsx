'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';

type RadarData = {
    subject: string;
    A: number; // value
    fullMark: number;
};

type Props = {
    data: Record<string, number>; // key: value
    width?: number | string;
    height?: number | string;
};

// キーと表示名のマッピング（ハードコードまたはPropsで渡す）
// MVPでは簡易的にここで定義、またはServerから受け取る形にするが、
// 表示用ラベルはDBの `label` カラムにあるので、それを渡すのがベスト。
// 今回は `data` のキーが `macro`, `micro` などで、表示はマッピングが必要。
// propsで `metrics` 配列を受け取る形に修正。

type Metric = {
    key: string;
    label: string;
};

type ExtendedProps = Props & {
    metrics: Metric[];
};

export default function RadarChartDisplay({ data, metrics, width = '100%', height = 300 }: ExtendedProps) {
    // Recharts 用のデータ形式に変換
    const chartData = metrics.map((m) => ({
        subject: m.label,
        value: data[m.key] || 0,
        fullMark: 10,
    }));

    return (
        <div className="w-full flex justify-center items-center" style={{ height }}>
            <ResponsiveContainer width={width} height={height}>
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="60%"
                    data={chartData}
                    margin={{ top: 10, right: 40, bottom: 10, left: 40 }}
                >
                    <PolarGrid stroke="#4B5563" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 'bold' }}
                        tickSize={15}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 10]}
                        tick={false} // 目盛り数値は非表示ですっきりさせる
                        axisLine={false}
                    />
                    <Radar
                        name="Trainer Stats"
                        dataKey="value"
                        stroke="#9333ea"
                        strokeWidth={3}
                        fill="#9333ea"
                        fillOpacity={0.5}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
