export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>
      <p className="mb-4">このページは「ポケモンユナイト対策DB」のプライバシーポリシーの雛形です。実際の運用時は内容を適宜ご調整ください。</p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>本サービスでは、個人を特定できる情報の収集は行いません。</li>
        <li>アクセス解析や広告配信のためにCookie等を利用する場合があります。</li>
        <li>第三者サービスの利用により取得される情報については、各サービスのプライバシーポリシーをご確認ください。</li>
        <li>本ポリシーは予告なく変更される場合があります。</li>
      </ul>
    </div>
  );
}
