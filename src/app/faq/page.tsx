import { HelpCircle } from "lucide-react";

export default function FAQPage() {
    const faqs = [
        {
            q: "Unite Communityとは何ですか？",
            a: "ポケモンユナイトをもっと深く楽しむためのファンコミュニティサイトです。現在は「カウンター（対策）情報」のデータベースをメインとしています。"
        },
        {
            q: "『カウンター』とは何ですか？",
            a: "特定のポケモンに対して有利に立ち回れる、あるいはスキル構成的に有利なポケモンのことです。例えば『物理耐久が非常に高いポケモン』に対する『特殊アタッカー』などが挙げられます。"
        },
        {
            q: "誰でも投稿できますか？",
            a: "はい、ログインなしで誰でも対策情報の投稿や投票が可能です。皆様の知識を共有して、より良いデータベースにしていきましょう。"
        },
        {
            q: "不適切な投稿を見つけたら？",
            a: "お問い合わせフォームよりご連絡ください。運営が内容を確認し、必要に応じて削除等の対応を行います。"
        }
    ];

    return (
        <div className="max-w-3xl mx-auto py-8 md:py-12 px-4">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <HelpCircle className="w-6 h-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                    よくある質問 (FAQ)
                </h1>
            </div>

            <div className="space-y-6">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-start">
                            <span className="text-blue-600 mr-2 font-black">Q.</span>
                            {faq.q}
                        </h2>
                        <div className="text-gray-600 dark:text-gray-400 leading-relaxed flex items-start">
                            <span className="text-orange-500 mr-2 font-black">A.</span>
                            <p>{faq.a}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
