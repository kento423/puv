'use client';

import dynamic from 'next/dynamic';

const RadarChartDisplay = dynamic(() => import('./RadarChartDisplay'), {
    ssr: false,
    loading: () => <div className="w-full h-[350px] bg-gray-800/50 rounded-xl animate-pulse" />,
});

// Re-export props types if needed, or just use any/unknown if simpler for wrapper
export default function RadarChartClientWrapper(props: any) {
    return <RadarChartDisplay {...props} />;
}
