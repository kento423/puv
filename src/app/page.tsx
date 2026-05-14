import Link from "next/link";
import StatusBadge from "@/components/ui/StatusBadge";
import { MessageSquare, User, Users, Shield, Wrench, BarChart3, Scale } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "ポケモンカウンター図鑑",
      description: "対面での有利不利や対策情報をチェック・共有できるデータベースです。",
      href: "/pokemon",
      status: "beta" as const,
      icon: <Shield className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "トレーナー名鑑",
      description: "ユナイトを盛り上げるトレーナーたちのプロフィール・活動を掲載。",
      href: "/trainers",
      status: "alpha" as const,
      icon: <User className="w-6 h-6" />,
      color: "orange",
    },
    {
      title: "チーム名鑑",
      description: "プロからコミュニティまで、ユナイトチームのプレイスタイルや活動状況を網羅。",
      href: "/teams",
      status: "alpha" as const,
      icon: <Users className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "アプデ後情報掲示板",
      description: "環境トップのポケモンやBAN候補、バグ情報をリアルタイムで共有・議論。",
      href: "/meta",
      status: "beta" as const,
      icon: <MessageSquare className="w-6 h-6" />,
      color: "orange",
    },
    {
      title: "構成メーカー",
      description: "自分の考える5匹のチーム構成を作成・共有。他のユーザーの構成を参考にすることもできます。",
      href: "/compositions",
      status: "alpha" as const,
      icon: <Wrench className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "ステータス図鑑",
      description: "全ポケモンのステータスをレベル別に比較。レーダーチャートで視覚的に確認。",
      href: "/stats",
      status: "alpha" as const,
      icon: <BarChart3 className="w-6 h-6" />,
      color: "orange",
    },
    {
      title: "ステータス比較",
      description: "任意のポケモンを複数並べて、レーダーチャートと詳細テーブルで徹底比較。",
      href: "/stats/compare",
      status: "beta" as const,
      icon: <Scale className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "新機能（近日公開）",
      description: "次のアップデートをお楽しみに。",
      href: "#",
      status: "coming-soon" as const,
      icon: <Shield className="w-6 h-6" />,
      color: "gray",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Unite Community
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          ポケモンユナイトをもっと楽しく、もっと深く。コミュニティで作る究極の攻略ハブ。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {features.map((feature, idx) => (
          feature.href !== "#" ? (
            <Link
              key={idx}
              href={feature.href}
              className="group block p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-${feature.color}-50 dark:bg-${feature.color}-900/20 text-${feature.color}-600 dark:text-${feature.color}-400 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <StatusBadge status={feature.status} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ) : (
            <div
              key={idx}
              className="p-6 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 flex flex-col opacity-75"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-900/40 text-gray-400">
                  {feature.icon}
                </div>
                <StatusBadge status={feature.status} />
              </div>
              <h2 className="text-xl font-bold text-gray-400 dark:text-gray-500 mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-400 dark:text-gray-500 leading-relaxed italic">
                {feature.description}
              </p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
