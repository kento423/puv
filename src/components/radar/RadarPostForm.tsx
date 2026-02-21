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
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">このトレーナーを評価する</h3>

            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4 text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                {metrics.map((metric) => (
                    <div key={metric.id}>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-gray-300 font-medium">{metric.label}</label>
                            <span className="text-sm text-gray-500 font-mono">
                                {values[metric.id] ? values[metric.id] : '-'} / 10
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => handleValueChange(metric.id, num)}
                                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${values[metric.id] === num
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <div>
                    <label className="block text-gray-300 font-medium mb-2">
                        コメント（任意）
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        rows={3}
                        placeholder="プレイスタイルについてのコメント..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isSubmitting ? '送信中...' : '評価を投稿する'}
                </button>
            </div>
            <p className="mt-4 text-xs text-center text-gray-500">
                ※ 3項目以上の入力が必須です。<br />
                ※ 投稿は匿名ですが、識別IDが記録されます。
            </p>
        </form>
    );
}
