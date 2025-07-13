export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">利用規約</h1>
      <p className="mb-4">このページは「ポケモンユナイト対策DB」の利用規約の雛形です。実際の運用時は内容を適宜ご調整ください。</p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>本サービスは非公式のファンサイトです。株式会社ポケモン・任天堂・TiMi Studiosとは一切関係ありません。</li>
        <li>掲載情報の正確性・完全性について保証しません。</li>
        <li>利用者が本サービスを利用したことによる損害について、運営者は一切責任を負いません。</li>
        <li>本規約は予告なく変更される場合があります。</li>
      </ul>
    </div>
  );
}
