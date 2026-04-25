'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { createTrainer, getTeams } from '@/app/actions/trainer';
import { Team } from '@/generated/prisma';

export default function TrainerAddDialog() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);

    const [form, setForm] = useState({
        name: '',
        type: 'amateur',
        teamId: '',
    });

    useEffect(() => {
        if (open) {
            getTeams().then(setTeams);
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!form.name.trim()) {
            setError('名前を入力してください。');
            setIsSubmitting(false);
            return;
        }

        const result = await createTrainer({
            name: form.name,
            type: form.type,
            teamId: form.teamId ? Number(form.teamId) : undefined,
        });

        if (result.success) {
            setOpen(false);
            setForm({ name: '', type: 'amateur', teamId: '' });
            router.refresh();
        } else {
            setError(result.message || 'エラーが発生しました。');
        }
        setIsSubmitting(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-gradient-to-r from-brand-primary to-indigo-600 hover:from-brand-primary hover:to-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-purple-900/20 transition-all active:scale-95">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    トレーナーを追加
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 rounded-3xl border-none shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="w-2 h-7 bg-brand-accent rounded-full"></span>
                        新規トレーナー登録
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs font-bold animate-shake">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">名前</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-brand-primary rounded-xl px-4 py-3 text-gray-900 dark:text-white outline-none transition-all font-bold placeholder:text-gray-300"
                            placeholder="トレーナー名を入力"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">区分</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['amateur', 'pro'].map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setForm({ ...form, type: t })}
                                    className={`py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${form.type === t
                                            ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/20'
                                            : 'bg-gray-50 dark:bg-gray-900 text-gray-400 border-transparent hover:border-brand-primary/30'
                                        }`}
                                >
                                    {t === 'pro' ? 'PRO' : 'AMATEUR'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">所属チーム（任意）</label>
                        <select
                            value={form.teamId}
                            onChange={(e) => setForm({ ...form, teamId: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-brand-primary rounded-xl px-4 py-3 text-gray-900 dark:text-white outline-none transition-all font-bold appearance-none cursor-pointer"
                        >
                            <option value="">無所属</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <DialogFooter className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-brand-primary to-indigo-700 hover:from-brand-primary hover:to-indigo-600 text-white font-black py-4 rounded-xl shadow-xl shadow-purple-900/10 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
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
