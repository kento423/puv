import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdSense from "@/components/AdSense";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unite Community - ユナイトコミュニティ",
  description: "ポケモンユナイトもっと楽しみ、盛り上げるために作ったコミュニティWebアプリ",
  other: {
    "google-adsense-account": "ca-pub-3903983116971021",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col`}>
        {/* ヘッダー */}
        <header className="w-full border-b bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
          <nav className="w-full mx-auto flex justify-between items-center px-4 py-3 md:px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg md:text-xl text-blue-700 dark:text-blue-400">
              <Image src="/logo.png" alt="Unite Community Logo" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 rounded-lg shadow-sm" priority />
              <span>
                <span className="text-orange-500">Unite</span>{" "}
                <span className="text-purple-600">Community</span>
              </span>
            </Link>
          </nav>
        </header>
        {/* メインコンテンツ */}
        <main className="flex-1 w-full px-4 py-6 md:px-6 md:py-8">{children}</main>
        {/* 広告枠（ページ下部） */}
        <aside className="w-full bg-white dark:bg-gray-800 border-t border-b py-6">
          <div className="px-4 md:px-6">
            <AdSense />
          </div>
        </aside>
        {/* フッター */}
        <footer className="w-full border-t bg-white dark:bg-gray-800 py-4 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400 text-xs md:text-sm gap-3 px-4 md:px-6">
            <div>© {new Date().getFullYear()} Unite Community</div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/faq" className="hover:underline transition">よくある質問</Link>
              <Link href="/guidelines" className="hover:underline transition">ガイドライン</Link>
              <Link href="/contact" className="hover:underline transition">お問い合わせ</Link>
              <Link href="/terms" className="hover:underline transition">利用規約</Link>
              <Link href="/privacy" className="hover:underline transition">プライバシーポリシー</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
