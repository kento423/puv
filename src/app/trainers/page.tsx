import { getTrainers, TrainerWithTeam } from '@/app/actions/trainer';
import TrainerCard from '@/components/trainer/TrainerCard';

export const metadata = {
    title: 'トレーナー名鑑 | Pokemon Unite Tools',
    description: 'ポケモンユナイトのプロ・アマ選手名鑑。プレイスタイルをレーダーチャートで評価。',
};

export const dynamic = 'force-dynamic';

export default async function TrainersPage() {
    let trainers: TrainerWithTeam[] = [];

    try {
        trainers = await getTrainers();
    } catch (e) {
        console.error(e);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">トレーナー名鑑</h1>
                    <p className="text-gray-400">
                        プロ・アマ問わず、様々なトレーナーのプレイスタイルを可視化
                    </p>
                </div>
                {/* 将来的に検索ボックスなどを配置 */}
            </div>

            {trainers.length === 0 ? (
                <div className="text-center py-20 bg-gray-800/30 rounded-xl">
                    <p className="text-gray-400 text-lg">登録されているトレーナーはいません。</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trainers.map((trainer) => (
                        <TrainerCard key={trainer.id} trainer={trainer} />
                    ))}
                </div>
            )}
        </div>
    );
}
