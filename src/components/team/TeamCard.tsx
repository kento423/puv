import Link from 'next/link';
import { TeamListDetail } from '@/app/actions/team';

type TeamCardProps = {
    team: TeamListDetail;
};

export default function TeamCard({ team }: TeamCardProps) {
    return (
        <Link href={`/teams/${team.id}`} className="block group h-full">
            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-xl group-hover:shadow-purple-500/10 group-hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                {/* 装飾用背景グラデーション */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-orange-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>

                <div className="flex items-start gap-4 mb-4 relative z-10 w-full">
                    {/* チームロゴ枠 */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group-hover:border-purple-300 dark:group-hover:border-purple-700 transition-colors">
                        {team.logoUrl ? (
                            <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-indigo-500 opacity-50">
                                {team.shortName || team.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {team.name}
                            </h3>
                            <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded border ${String(team.type).toLowerCase() === 'pro'
                                ? 'bg-orange-500/10 text-orange-600 border-orange-500/20'
                                : 'bg-purple-600/10 text-purple-600 border-purple-600/20'
                                }`}>
                                {String(team.type).toLowerCase() === 'pro' ? 'PRO' : 'AMATEUR'}
                            </span>
                            {team.region && (
                                <span className="text-[10px] font-black tracking-wider px-2 py-0.5 rounded-md uppercase bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                                    {team.region}
                                </span>
                            )}
                        </div>
                        {team.shortName && (
                            <p className="text-sm font-medium text-gray-400">
                                @{team.shortName}
                            </p>
                        )}
                    </div>
                </div>

                {/* データエリア */}
                <div className="mt-auto space-y-3 relative z-10">
                    <div className="flex items-center justify-between text-sm py-2 px-3 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                        <span className="font-bold text-gray-500 dark:text-gray-400">所属メンバー</span>
                        <div className="flex items-center gap-1.5 text-gray-900 dark:text-white font-black">
                            <span>{team._count.trainers}</span>
                            <span className="text-xs text-gray-400 font-medium">名</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {team.twitterUrl && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </div>
                        )}
                        {team.websiteUrl && (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
