import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">ポケモンカウンター図鑑</div>
        </nav>
      </header>

      {/* お知らせ機能（インフォメーションボックス） */}
      <div className="w-full flex justify-center bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-2xl w-full px-4 py-3 text-yellow-800 text-center text-sm">
          <strong>お知らせ：</strong>このサイトは現在{" "}
          <span className="font-bold">アルファ版</span> です。動作やデータ内容に不具合がある場合があります。ご意見・ご要望はお気軽にお寄せください。
        </div>
      </div>

      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">ポケモンカウンター図鑑</h1>
          <p className="text-lg text-gray-600 mb-8">
            ポケモンユナイトの対策・カウンター情報をみんなで共有するWebアプリです。
            気になるポケモンの対策や、他の人の投稿をチェックしましょう！
          </p>
          <Link href="/pokemon">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow">
              ポケモン一覧へ
            </button>
          </Link>
        </div>
      </main>

      <footer className="p-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>© 2025 ポケモンカウンター図鑑</p>
        </div>
      </footer>
    </div>
  );
}
