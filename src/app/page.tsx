import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* お知らせ機能（インフォメーションボックス） */}
      <div className="w-full flex justify-center bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-700 -mx-4 px-4 py-3 md:py-4 mb-6 md:mb-8">
        <div className="w-full text-yellow-800 dark:text-yellow-200 text-center text-sm md:text-base">
          <strong>お知らせ：</strong>このサイトは現在{" "}
          <span className="font-bold">アルファ版</span> です。動作やデータ内容に不具合がある場合があります。ご意見・ご要望はお気軽にお寄せください。
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">ポケモンカウンター図鑑</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed">
            ポケモンユナイトの対策・カウンター情報をみんなで共有するWebアプリです。
            気になるポケモンの対策や、他の人の投稿をチェックしましょう！
          </p>
          <Link href="/pokemon">
            <button className="bg-blue-600 dark:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 active:scale-95 transition-all text-base md:text-lg font-semibold shadow-md hover:shadow-lg w-full md:w-auto max-w-sm">
              ポケモン一覧へ
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
