'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { createTeam } from '@/app/actions/team';

export default function TeamAddDialog() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        name: '',
        shortName: '',
        type: 'pro',
        region: 'JP',
        twitterUrl: '',
        websiteUrl: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!form.name.trim()) {
            setError('チーム名を入力してください。');
            setIsSubmitting(false);
            return;
        }

        const result = await createTeam({
            name: form.name.trim(),
            shortName: form.shortName.trim() || undefined,
            type: form.type,
            region: form.region || undefined,
            twitterUrl: form.twitterUrl.trim() || undefined,
            websiteUrl: form.websiteUrl.trim() || undefined,
        });

        if (result.success) {
            setOpen(false);
            setForm({ name: '', shortName: '', type: 'pro', region: 'JP', twitterUrl: '', websiteUrl: '' });
            router.refresh();
        } else {
            setError(result.message || 'エラーが発生しました。');
        }
        setIsSubmitting(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-gradient-to-r from-brand-accent to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-orange-900/20 transition-all active:scale-95">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    チームを追加
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 rounded-3xl border-none shadow-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="w-2 h-7 bg-brand-primary rounded-full"></span>
                        新規チーム登録
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs font-bold animate-shake">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">チーム名 <span className="text-brand-accent">*</span></label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-brand-accent rounded-xl px-4 py-3 text-gray-900 dark:text-white outline-none transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-600"
                            placeholder="チーム名を入力（必須）"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">チーム区分 <span className="text-brand-accent">*</span></label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, type: 'pro' })}
                                className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${form.type === 'pro'
                                    ? 'bg-brand-accent border-brand-accent text-white shadow-lg shadow-brand-accent/20'
                                    : 'bg-gray-50 dark:bg-gray-900 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100'
                                    }`}
                            >
                                プロチーム
                            </button>
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, type: 'amateur' })}
                                className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${form.type === 'amateur'
                                    ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                    : 'bg-gray-50 dark:bg-gray-900 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100'
                                    }`}
                            >
                                アマチュア
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">略称</label>
                        <input
                            type="text"
                            value={form.shortName}
                            onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-brand-accent rounded-xl px-4 py-3 text-gray-900 dark:text-white outline-none transition-all font-bold placeholder:text-gray-300 dark:placeholder:text-gray-600"
                            placeholder="略称（例: SS）"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">活動地域</label>
                        <select
                            value={form.region}
                            onChange={(e) => setForm({ ...form, region: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-brand-accent rounded-xl px-4 py-3 text-gray-900 dark:text-white outline-none transition-all font-bold appearance-none cursor-pointer"
                        >
                            <option value="JP">JP (Japan)</option>
                            <option value="NA">NA (North America)</option>
                            <option value="EU">EU (Europe)</option>
                            <option value="KR">KR (Korea)</option>
                            <option value="OCE">OCE (Oceania)</option>
                            <option value="SA">SA (South America)</option>
                            <option value="OTHER">その他</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">X (Twitter) URL</label>
                        <input
                            type="url"
                            value={form.twitterUrl}
                            onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-brand-accent rounded-xl px-4 py-3 text-gray-900 dark:text-white outline-none transition-all font-medium text-sm placeholder:text-gray-300 dark:placeholder:text-gray-600"
                            placeholder="https://x.com/..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Webサイト URL</label>
                        <input
                            type="url"
                            value={form.websiteUrl}
                            onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-brand-accent rounded-xl px-4 py-3 text-gray-900 dark:text-white outline-none transition-all font-medium text-sm placeholder:text-gray-300 dark:placeholder:text-gray-600"
                            placeholder="https://..."
                        />
                    </div>

                    <DialogFooter className="pt-4 mt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-brand-accent to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black py-4 rounded-xl shadow-xl shadow-orange-900/10 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                    登録する
                                </>
                            )}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
