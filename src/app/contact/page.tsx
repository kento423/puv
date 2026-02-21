import Link from "next/link";
import { Mail, MessageSquare, ExternalLink } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="max-w-3xl mx-auto py-8 md:py-12 px-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                お問い合わせ
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Unite Communityをご利用いただきありがとうございます。
                不具合の報告、機能の改善要望、その他のお問い合わせは以下の方法で受け付けております。
            </p>

            <div className="space-y-6">
                {/* Google Form Link */}
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdR_RwyDRr_L56zxpNrAR7h0TGsErQrotPEpP-hvRsFDDqFhQ/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group"
                >
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-4">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            お問い合わせフォーム
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Googleフォームが開きます。最も確実な連絡方法です。
                        </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </a>

                {/* X (Twitter) link placeholder */}
                <div className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm opacity-75">
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/20 text-gray-600 mr-4">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            公式X (旧Twitter)
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            最新情報の発信と、メンションでの軽微な報告を受け付けています（準備中）。
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12 p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                <h3 className="text-lg font-bold text-orange-800 dark:text-orange-300 mb-2">
                    不具合報告について
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-400 leading-relaxed">
                    不具合を報告される際は、可能な限り「操作手順」「使用デバイス（iPhone15、PC等）」「スクリーンショット（フォーム内に添付可）」を、添えていただけますと迅速な対応が可能です。
                </p>
            </div>
        </div>
    );
}
