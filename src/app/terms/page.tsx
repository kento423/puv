export default function TermsPage() {
  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">利用規約</h1>
      <p className="mb-4 md:mb-6 text-sm md:text-base text-gray-700 dark:text-gray-300">このページは「Unite Community」の利用規約です。</p>
      <ul className="list-disc pl-5 md:pl-6 space-y-2 md:space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>本サービスは非公式のファンサイトです。株式会社ポケモン・任天堂・TiMi Studiosとは一切関係ありません。</li>
        <li>掲載情報の正確性・完全性について保証しません。</li>
        <li>利用者が本サービスを利用したことによる損害について、運営者は一切責任を負いません。</li>
        <li>本規約は予告なく変更される場合があります。</li>
      </ul>
    </div>
  );
}
