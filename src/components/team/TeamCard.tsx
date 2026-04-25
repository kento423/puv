import Link from 'next/link';
import { TeamListDetail } from '@/app/actions/team';

type TeamCardProps = {
    team: TeamListDetail;
};

export default function TeamCard({ team }: TeamCardProps) {
    return (
        <Link href={`/teams/${team.id}`} className="block group h-full">
            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 shadow-sm transition-all duration-300 group-hover:border-brand-primary/50 group-hover:shadow-xl group-hover:shadow-brand-primary/10 group-hover:-translate-y-1 flex flex-col h-full relative overflow-hidden">
                {/* 装飾用背景 */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 rounded-bl-full -mr-10 -mt-10 group-hover:from-brand-primary/10 group-hover:to-brand-accent/10 transition-all duration-500"></div>

                <div className="flex items-center space-x-4 relative z-10">
                    {/* チームロゴ */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner border border-white dark:border-gray-600">
                        {team.logoUrl ? (
                            <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl font-black text-brand-primary/50 dark:text-purple-400/40 italic">
                                {team.shortName || team.name.charAt(0)}
                            </span>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-brand-primary dark:group-hover:text-purple-400 transition-colors">
                            {team.name}
                        </h3>
                        <div className="flex items-center mt-0.5">
                            <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {team.shortName && `@${team.shortName}`}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/50 flex justify-between items-center mt-auto relative z-10">
                    <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-lg uppercase ${String(team.type).toLowerCase() === 'pro'
                        ? 'bg-brand-accent/10 text-orange-600 border border-brand-accent/20'
                        : 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 dark:bg-brand-primary/10 dark:text-purple-400'
                        }`}>
                        {String(team.type).toLowerCase() === 'pro' ? 'PRO' : 'AMATEUR'}
                    </span>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase text-gray-400 font-bold tracking-tight">所属メンバー</span>
                        <span className="text-sm font-black text-gray-700 dark:text-gray-300">
                            {team._count.trainers}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
