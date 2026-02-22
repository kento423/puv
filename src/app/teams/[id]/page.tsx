import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTeamById } from '@/app/actions/team';
import { getRadarMetrics } from '@/app/actions/radar';
import RadarChartClientWrapper from '@/components/radar/RadarChartClientWrapper';
import TrainerCard from '@/components/trainer/TrainerCard';
import SponsorManageDialog from '@/components/team/SponsorManageDialog';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props) {
    const params = await props.params;
    const id = Number(params.id);
    const team = await getTeamById(id);
    if (!team) return { title: 'Not Found' };

    return {
        title: `${team.name} | チーム名鑑`,
        description: `${team.name} のメンバーとプレイスタイル分析。`,
    };
}

export default async function TeamDetailPage(props: Props) {
    const params = await props.params;
    const id = Number(params.id);
    if (isNaN(id)) return notFound();

    const [team, metrics] = await Promise.all([
        getTeamById(id),
        getRadarMetrics(),
    ]);

    if (!team) return notFound();

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header / Team Profile Section */}
            <div className="relative mb-10 overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-600 to-orange-500 opacity-10 dark:opacity-20"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white dark:bg-gray-700 flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl transform md:-rotate-3 translate-y-2 md:translate-y-0 text-purple-600 dark:text-purple-400">
                        {team.logoUrl ? (
                            <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-5xl font-black italic">
                                {team.shortName || team.name.charAt(0)}
                            </span>
                        )}
                    </div>

                    <div className="text-center md:text-left flex-1 space-y-3">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-1">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">{team.name}</h1>
                            <span className={`text-xs font-black tracking-widest px-3 py-1.5 rounded-xl border mb-1.5 ${String(team.type).toLowerCase() === 'pro'
                                ? 'bg-orange-500 text-white border-orange-400'
                                : 'bg-purple-600 text-white border-purple-500'
                                }`}>
                                {String(team.type).toLowerCase() === 'pro' ? 'PRO TEAM' : 'AMATEUR / COMMUNITY'}
                            </span>
                            {team.shortName && (
                                <span className="text-2xl font-bold text-gray-400 mb-1.5">
                                    @{team.shortName}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
                            {team.region && (
                                <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                                    Region: {team.region}
                                </span>
                            )}
                            {team.twitterUrl && (
                                <a href={team.twitterUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg hover:text-purple-500 transition-colors flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    Official X
                                </a>
                            )}
                            {team.websiteUrl && (
                                <a href={team.websiteUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg hover:text-orange-500 transition-colors flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    Website
                                </a>
                            )}
                        </div>

                        <div className="flex justify-center md:justify-start gap-10 pt-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-tighter text-gray-400 font-black">Members</span>
                                <span className="text-2xl font-black text-gray-800 dark:text-white">{team.trainers.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Team Style & Roster */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Team Radar Chart Section */}
                    {team.trainers.length > 0 && team.averageStats ? (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                    <span className="w-2 h-8 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></span>
                                    チーム プレイスタイル分析
                                </h2>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full">
                                    Member Average
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 mb-6 font-medium">
                                ※所属する全てのトレーナーの直近の評価を平均し、チームとしての傾向を可視化しています。
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-all duration-700"></div>
                                    <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                                        <RadarChartClientWrapper data={team.averageStats} metrics={metrics} height={350} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {metrics.map(m => {
                                        const val = team.averageStats ? team.averageStats[m.key] : 0;
                                        return (
                                            <div key={m.id} className="group bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 transition-all hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:border-purple-500/30">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 group-hover:text-purple-500 transition-colors">{m.label}</div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-black text-gray-900 dark:text-white">
                                                        {val ? val.toFixed(1) : '-'}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-bold">/ 10</span>
                                                </div>
                                                <div className="mt-2 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-purple-600 to-orange-400 rounded-full opacity-80"
                                                        style={{ width: `${(val || 0) * 10}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {/* Current Roster */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">所属メンバー（{team.trainers.length}名）</h3>
                        </div>

                        {team.trainers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {team.trainers.map((trainer) => (
                                    <TrainerCard key={trainer.id} trainer={{ ...trainer, team } as any} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-10 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <p className="text-gray-400 dark:text-gray-500 font-medium">現在所属しているトレーナーはいません。</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Sponsors, History, etc */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Sponsors / Partners */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                スポンサー / パートナー
                            </h3>
                            <SponsorManageDialog team={team} />
                        </div>

                        {team.sponsors && team.sponsors.length > 0 ? (
                            <div className="flex flex-wrap gap-4">
                                {team.sponsors.map((sponsor) => (
                                    <a
                                        key={sponsor.id}
                                        href={sponsor.url || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-2 border border-gray-100 dark:border-gray-700 hover:border-orange-500/50 transition-all group"
                                    >
                                        {sponsor.logoUrl ? (
                                            <img src={sponsor.logoUrl} alt={sponsor.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                                        ) : (
                                            <span className="text-[10px] font-bold text-gray-400 text-center">{sponsor.name}</span>
                                        )}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400 italic">スポンサー募集中</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
