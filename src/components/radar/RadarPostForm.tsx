'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RadarMetric } from '@/generated/prisma';
import { submitRadarEvaluation } from '@/app/actions/radar';

type Props = {
    trainerId: number;
    metrics: RadarMetric[];
};

export default function RadarPostForm({ trainerId, metrics }: Props) {
    const router = useRouter();
    const [values, setValues] = useState<Record<number, number | null>>({});
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authorToken, setAuthorToken] = useState<string>('');

    useEffect(() => {
        // クライアント側でUUID生成・取得
        // crypto.randomUUID() はHTTPSまたはlocalhostでしか動作しないため、
        // 簡易的なフォールバックを実装
        const generateUUID = () => {
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                return crypto.randomUUID();
            }
            // 非セキュア環境用フォールバック (Math.random)
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        const key = 'puv_author_token';
        let token = localStorage.getItem(key);
        if (!token) {
            token = generateUUID();
            localStorage.setItem(key, token);
        }
        setAuthorToken(token);
    }, []);

    const handleValueChange = (metricId: number, value: number) => {
        setValues((prev) => ({
            ...prev,
            [metricId]: prev[metricId] === value ? null : value, // トグル
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const filledCount = Object.values(values).filter((v) => v !== null).length;
        if (filledCount < 3) {
            setError('少なくとも3つの項目を評価してください。');
            setIsSubmitting(false);
            return;
        }

        if (!authorToken) {
            setError('認証トークンの生成に失敗しました。');
            setIsSubmitting(false);
            return;
        }

        const result = await submitRadarEvaluation({
            trainerId,
            authorToken,
            comment,
            values,
        });

        if (result.success) {
            // 成功後、リセットまたはリダイレクト
            setValues({});
            setComment('');
            alert('評価を投稿しました！');
            router.refresh(); // データ更新反映
        } else {
            setError(result.message || '投稿に失敗しました。');
        }
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg relative overflow-hidden group">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/5 to-orange-500/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3 relative z-10">
                <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                このトレーナーを評価する
            </h3>

            {error && (
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500 text-red-600 dark:text-red-400 px-6 py-3 rounded-2xl mb-6 text-sm font-medium flex items-center gap-2 animate-shake">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {error}
                </div>
            )}

            <div className="space-y-8 relative z-10">
                {metrics.map((metric) => (
                    <div key={metric.id} className="space-y-3">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">{metric.label}</label>
                            <span className="text-xl font-black text-purple-600 dark:text-purple-400 font-mono">
                                {values[metric.id] ? values[metric.id] : '—'} <span className="text-[10px] text-gray-400">/ 10</span>
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => handleValueChange(metric.id, num)}
                                    className={`w-10 h-10 md:w-11 md:h-11 rounded-xl text-sm font-black transition-all duration-300 border flex items-center justify-center ${values[metric.id] === num
                                        ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/40 scale-110 z-10'
                                        : 'bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-600 border-gray-100 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-800 hover:text-purple-500'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="pt-4">
                    <label className="block text-sm font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
                        コメント（任意）
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none shadow-inner font-medium"
                        rows={4}
                        placeholder="プレイスタイルについてのコメントを記入してください..."
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-purple-900/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden active:scale-95"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3 text-lg tracking-widest uppercase">
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    SENDING...
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    評価を投稿する
                                </>
                            )}
                        </span>
                    </button>
                    <p className="mt-6 text-[10px] font-black tracking-widest text-center text-gray-400 uppercase">
                        ※ 3項目以上の入力が必須です <br />
                        ※ 投稿は匿名ですが、固有の識別IDが内部的に付与されます
                    </p>
                </div>
            </div>
        </form>
    );
}
