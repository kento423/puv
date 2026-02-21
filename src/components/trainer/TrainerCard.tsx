'use client';

import Link from 'next/link';
import { TrainerWithTeam } from '@/app/actions/trainer';

type Props = {
    trainer: TrainerWithTeam;
};

export default function TrainerCard({ trainer }: Props) {
    return (
        <Link href={`/trainers/${trainer.id}`} className="block group">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:bg-gray-800 hover:shadow-lg h-full">
                <div className="flex items-center space-x-4">
                    {/* チームロゴ or アバタープレースホルダー */}
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {trainer.team?.logoUrl ? (
                            <img src={trainer.team.logoUrl} alt={trainer.team.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl font-bold text-gray-500">
                                {trainer.name.charAt(0)}
                            </span>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                            {trainer.name}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">
                            {trainer.team?.shortName || trainer.team?.name || '無所属'}
                        </p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${trainer.type === 'pro'
                            ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                            : 'bg-green-500/20 text-green-500 border border-green-500/30'
                        }`}>
                        {trainer.type === 'pro' ? 'PRO' : 'AMATEUR'}
                    </span>
                    <span className="text-xs text-gray-400">
                        評価数: <span className="text-white font-medium">{trainer._count.radarPosts}</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}
