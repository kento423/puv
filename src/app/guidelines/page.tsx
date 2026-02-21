import { ShieldCheck, Heart, Zap, AlertTriangle } from "lucide-react";

export default function GuidelinesPage() {
    const guidelines = [
        {
            title: "お互いを尊重しよう",
            icon: <Heart className="text-red-500" />,
            content: "ポケモンユナイトは多様なプレイスタイルがあるゲームです。自分と違う意見であっても、人格否定や攻撃的な言葉は避け、建設的な議論を心がけましょう。"
        },
        {
            title: "有益な情報を共有しよう",
            icon: <Zap className="text-yellow-500" />,
            content: "対策情報を投稿する際は、なぜそのポケモンがカウンターになるのか、理由を添えていただけると他のトレーナーの参考になります。"
        },
        {
            title: "禁止事項",
            icon: <AlertTriangle className="text-orange-500" />,
            content: "誹謗中傷、特定の個人・クランへの攻撃、虚偽の情報拡散、スパム行為等は禁止です。発見次第、運営にて削除を行います。"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 text-center">
            <div className="mb-12">
                <div className="inline-flex p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mb-4">
                    <ShieldCheck className="w-10 h-10" />
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    コミュニティガイドライン
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    みんなで楽しく、ユナイトを盛り上げるための共通ルールです。
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left uppercase text-sm">
                {guidelines.map((g, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                        <div className="mb-6 bg-gray-50 dark:bg-gray-700 w-12 h-12 rounded-xl flex items-center justify-center">
                            {g.icon}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {g.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed normal-case">
                            {g.content}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-16 py-8 px-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    このガイドラインは、コミュニティの成長に合わせて随時アップデートされます。<br />
                    より良いコミュニティにするための提案もお待ちしております！
                </p>
            </div>
        </div>
    );
}
