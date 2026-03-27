import { getTeamList, TeamListDetail } from '@/app/actions/team';
import TeamCard from '@/components/team/TeamCard';
import TeamAddDialog from '@/components/team/TeamAddDialog';

export const metadata = {
    title: 'チーム名鑑 | Pokemon Unite Tools',
    description: 'ポケモンユナイトのプロ・アマチーム名鑑。チームのプレイスタイルを可視化。',
};

export const revalidate = 60;

export default async function TeamsPage() {
    let teams: TeamListDetail[] = [];

    try {
        teams = await getTeamList();
    } catch (e) {
        console.error(e);
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 mb-2">
                        チーム名鑑
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
                        プロチームやアマチュア・コミュニティチームの情報、所属メンバーの傾向からチーム単位のプレイスタイルを分析。
                    </p>
                </div>
                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                    <TeamAddDialog />
                    <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-orange-400 rounded-full opacity-30"></div>
                </div>
            </div>

            {teams.length === 0 ? (
                <div className="text-center py-24 bg-white dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-700/50 shadow-sm transition-all">
                    <div className="mb-4 text-gray-300 dark:text-gray-600 flex justify-center">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <p className="text-xl font-black text-gray-400 dark:text-gray-500">まだチームが登録されていません</p>
                    <p className="text-sm font-medium text-gray-400 mt-2">右上のボタンから最初のチームを登録してみましょう！</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))}
                </div>
            )}
        </div>
    );
}
