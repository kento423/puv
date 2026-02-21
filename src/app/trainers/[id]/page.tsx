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
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header / Profile Section */}
            <div className="relative mb-10 overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700">
                {/* Decorative background gradient */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-600 to-orange-500 opacity-10 dark:opacity-20"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white dark:bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl transform md:-rotate-3 translate-y-2 md:translate-y-0 text-purple-600 dark:text-purple-400">
                        {trainer.team?.logoUrl ? (
                            <img src={trainer.team.logoUrl} alt={trainer.team.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-5xl font-black italic">
                                {trainer.name.charAt(0)}
                            </span>
                        )}
                    </div>

                    <div className="text-center md:text-left flex-1 space-y-3">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-1">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">{trainer.name}</h1>
                            <span className={`text-xs font-black tracking-widest px-3 py-1.5 rounded-xl border mb-1.5 ${trainer.type === 'pro'
                                ? 'bg-orange-500 text-white border-orange-400'
                                : 'bg-purple-600 text-white border-purple-500'
                                }`}>
                                {trainer.type === 'pro' ? 'PRO PLAYER' : 'AMATEUR'}
                            </span>
                        </div>

                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 dark:text-gray-400 text-xl font-medium">
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                                {trainer.team?.name || '無所属'}
                                {trainer.team?.shortName && <span className="ml-2 text-gray-400 font-normal">({trainer.team.shortName})</span>}
                            </span>
                        </div>

                        <div className="flex justify-center md:justify-start gap-10 pt-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-tighter text-gray-400 font-black">Reviews Total</span>
                                <span className="text-2xl font-black text-gray-800 dark:text-white">{trainer.radarPosts.length}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-tighter text-gray-400 font-black">Activity</span>
                                <span className="text-lg font-bold text-green-500 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Chart & Stats */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Radar Chart Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                <span className="w-2 h-8 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></span>
                                プレイスタイル分析
                            </h2>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full">
                                Realtime Data
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-all duration-700"></div>
                                <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                                    <RadarChartClientWrapper data={trainer.averageStats} metrics={metrics} height={400} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {metrics.map(m => (
                                    <div key={m.id} className="group bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:border-purple-500/30">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 group-hover:text-purple-500 transition-colors">{m.label}</div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-gray-900 dark:text-white">
                                                {trainer.averageStats[m.key]?.toFixed(1) || '-'}
                                            </span>
                                            <span className="text-xs text-gray-400 font-bold">/ 10</span>
                                        </div>
                                        <div className="mt-3 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                                                style={{ width: `${(trainer.averageStats[m.key] || 0) * 10}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Post Form */}
                    <RadarPostForm trainerId={trainer.id} metrics={metrics} />

                    {/* Recent Reviews */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">最近の評価コメント</h3>
                        </div>

                        {trainer.radarPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {trainer.radarPosts.map((post) => (
                                    <div key={post.id} className="bg-white dark:bg-gray-800/40 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50 dark:border-gray-800">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-[10px] font-black text-gray-400 italic">ID</div>
                                                <span className="text-[10px] font-black tracking-widest text-gray-400">#{post.authorToken.slice(0, 6)}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-md">{formatDateSimple(post.createdAt)}</span>
                                        </div>
                                        {post.comment ? (
                                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">"{post.comment}"</p>
                                        ) : (
                                            <p className="text-gray-400 dark:text-gray-500 text-sm italic">コメントなし</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-10 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <p className="text-gray-400 dark:text-gray-500 font-medium">まだ評価コメントはありません。</p>
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Column: History, etc */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg sticky top-24">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600/20 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                            所属履歴
                        </h3>
                        <ul className="space-y-6 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-gradient-to-b before:from-purple-600/20 before:to-transparent">
                            {trainer.history.length > 0 ? (
                                trainer.history.map((h) => (
                                    <li key={h.id} className="relative pl-8">
                                        <div className="absolute left-1.5 top-1.5 w-3 h-3 bg-white dark:bg-gray-800 border-2 border-purple-600 rounded-full z-10"></div>
                                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-transparent hover:border-purple-500/20 transition-all">
                                            <div className="text-gray-900 dark:text-white font-black text-sm">{h.team.name}</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-[10px] font-bold mt-1 uppercase tracking-tight">
                                                {formatDateSimple(h.joinedAt)} — {h.leftAt ? formatDateSimple(h.leftAt) : 'PRESENT'}
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400 dark:text-gray-500 text-sm font-medium italic pl-8">履歴情報なし</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
