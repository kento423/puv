export default function PrivacyPage() {
  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">プライバシーポリシー</h1>
      <p className="mb-4 md:mb-6 text-sm md:text-base text-gray-700 dark:text-gray-300">このページは「ポケモンユナイト対策DB」のプライバシーポリシーの雛形です。実際の運用時は内容を適宜ご調整ください。</p>
      <ul className="list-disc pl-5 md:pl-6 space-y-2 md:space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>本サービスでは、個人を特定できる情報の収集は行いません。</li>
        <li>アクセス解析や広告配信のためにCookie等を利用する場合があります。</li>
        <li>第三者サービスの利用により取得される情報については、各サービスのプライバシーポリシーをご確認ください。</li>
        <li>本ポリシーは予告なく変更される場合があります。</li>
      </ul>
    </div>
  );
}
