import { getTrainers, TrainerWithTeam } from '@/app/actions/trainer';
import TrainerCard from '@/components/trainer/TrainerCard';
import TrainerAddDialog from '@/components/trainer/TrainerAddDialog';

export const metadata = {
    title: 'トレーナー名鑑 | Pokemon Unite Tools',
    description: 'ポケモンユナイトのプロ・アマ選手名鑑。プレイスタイルをレーダーチャートで評価。',
};

export const revalidate = 60;

export default async function TrainersPage() {
    let trainers: TrainerWithTeam[] = [];

    try {
        trainers = await getTrainers();
    } catch (e) {
        console.error(e);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent mb-2">
                        トレーナー名鑑
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
                        プロ・アマ問わず、様々なトレーナーのプレイスタイルを可視化。
                        あなたのプレイスタイルに合ったトレーナーを見つけよう。
                    </p>
                </div>
                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                    <TrainerAddDialog />
                    <div className="h-1 w-24 bg-gradient-to-r from-brand-primary to-orange-400 rounded-full opacity-30"></div>
                </div>
            </div>

            {trainers.length === 0 ? (
                <div className="text-center py-24 bg-white dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-700/50 shadow-sm transition-all">
                    <div className="mb-4 text-gray-300 dark:text-gray-600 flex justify-center">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">登録されているトレーナーはいません。</p>
                    <p className="text-gray-400 dark:text-gray-500 mt-1">最初のトレーナーが登録されるまでお待ちください。</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {trainers.map((trainer) => (
                        <TrainerCard key={trainer.id} trainer={trainer} />
                    ))}
                </div>
            )}
        </div>
    );
}
