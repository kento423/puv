import { notFound } from 'next/navigation';
import { getTrainer } from '@/app/actions/trainer';
import { getRadarMetrics } from '@/app/actions/radar';
import RadarChartClientWrapper from '@/components/radar/RadarChartClientWrapper';
import RadarPostForm from '@/components/radar/RadarPostForm';

// 簡易的な日付フォーマット関数
function formatDateSimple(date: Date) {
    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
}

// Next 15/16では params は Promise になる可能性があるが、App Routerの標準的な書き方で記述
// type Props = {
//   params: { id: string };
// };
// 最新のNext.jsでは params は Promise<...>

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props) {
    const params = await props.params;
    const id = Number(params.id);
    const trainer = await getTrainer(id);
    if (!trainer) return { title: 'Not Found' };

    return {
        title: `${trainer.name} | トレーナー名鑑`,
        description: `${trainer.team?.name || '無所属'} のトレーナー、${trainer.name} のプレイスタイル評価。`,
    };
}

export default async function TrainerDetailPage(props: Props) {
    const params = await props.params;
    const id = Number(params.id);
    if (isNaN(id)) return notFound();

    const [trainer, metrics] = await Promise.all([
        getTrainer(id),
        getRadarMetrics(),
    ]);

    if (!trainer) return notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-gray-800 shadow-xl">
                    {trainer.team?.logoUrl ? (
                        <img src={trainer.team.logoUrl} alt={trainer.team.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-4xl font-bold text-gray-500">
                            {trainer.name.charAt(0)}
                        </span>
                    )}
                </div>

                <div className="text-center md:text-left flex-1">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-black text-white">{trainer.name}</h1>
                        <span className={`text - sm px - 3 py - 1 rounded - full border ${trainer.type === 'pro'
                                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                                : 'bg-green-500/10 text-green-500 border-green-500/30'
                            } `}>
                            {trainer.type === 'pro' ? 'PRO' : 'AMATEUR'}
                        </span>
                    </div>

                    <div className="text-gray-400 text-lg mb-4">
                        {trainer.team?.name || '無所属'}
                        {trainer.team?.shortName && <span className="ml-2 text-gray-500">({trainer.team.shortName})</span>}
                    </div>

                    <div className="flex justify-center md:justify-start gap-6 text-sm">
                        <div className="flex flex-col">
                            <span className="text-gray-500">総評価数</span>
                            <span className="text-xl font-bold text-white">{trainer.radarPosts.length}</span>
                        </div>
                        {/* ここに勝率などを入れる拡張性あり */}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Chart & Stats */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Radar Chart Section */}
                    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                            <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
                            プレイスタイル分析
                        </h2>

                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/2">
                                <RadarChartClientWrapper data={trainer.averageStats} metrics={metrics} height={350} />
                            </div>

                            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 mt-6 md:mt-0 px-4">
                                {metrics.map(m => (
                                    <div key={m.id} className="bg-gray-800 p-3 rounded-lg border border-gray-700/50">
                                        <div className="text-gray-400 text-xs mb-1">{m.label}</div>
                                        <div className="text-2xl font-bold text-white">
                                            {trainer.averageStats[m.key]?.toFixed(1) || '-'}
                                            <span className="text-xs text-gray-600 ml-1">/10</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Post Form */}
                    <RadarPostForm trainerId={trainer.id} metrics={metrics} />

                    {/* Recent Reviews */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mt-8 mb-4">最近の評価コメント</h3>
                        {trainer.radarPosts.length > 0 ? (
                            trainer.radarPosts.map((post) => (
                                <div key={post.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs text-gray-500">ID: {post.authorToken.slice(0, 8)}...</span>
                                        <span className="text-xs text-gray-500">{formatDateSimple(post.createdAt)}</span>
                                    </div>
                                    {post.comment ? (
                                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{post.comment}</p>
                                    ) : (
                                        <p className="text-gray-600 text-sm italic">コメントなし</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">まだ評価コメントはありません。</p>
                        )}
                    </div>

                </div>

                {/* Right Column: History, etc (Optional, keep empty for MVP or put something small) */}
                <div className="space-y-6">
                    <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700">
                        <h3 className="text-white font-bold mb-4 border-b border-gray-700 pb-2">所属履歴</h3>
                        <ul className="space-y-3">
                            {trainer.history.length > 0 ? (
                                trainer.history.map((h) => (
                                    <li key={h.id} className="text-sm">
                                        <div className="text-white font-medium">{h.team.name}</div>
                                        <div className="text-gray-500 text-xs">
                                            {formatDateSimple(h.joinedAt)} - {h.leftAt ? formatDateSimple(h.leftAt) : '現在'}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 text-sm">履歴情報なし</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
