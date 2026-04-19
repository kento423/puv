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
import { addTeamSponsor, deleteTeamSponsor, TeamDetail } from '@/app/actions/team';
import { Plus, Trash2, Globe, Image as ImageIcon, Settings2 } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';


type SponsorManageDialogProps = {
    team: TeamDetail;
};

export default function SponsorManageDialog({ team }: SponsorManageDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteDialogId, setDeleteDialogId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);


    const [form, setForm] = useState({
        name: '',
        logoUrl: '',
        url: '',
    });

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!form.name.trim()) {
            setError('スポンサー名を入力してください。');
            setIsSubmitting(false);
            return;
        }

        const result = await addTeamSponsor({
            teamId: team.id,
            name: form.name.trim(),
            logoUrl: form.logoUrl.trim() || undefined,
            url: form.url.trim() || undefined,
        });

        if (result.success) {
            setForm({ name: '', logoUrl: '', url: '' });
            router.refresh();
        } else {
            setError(result.message || '追加に失敗しました。');
        }
        setIsSubmitting(false);
    };

    const executeDelete = async (id: number) => {
        setIsSubmitting(true);
        const result = await deleteTeamSponsor(id, team.id);
        if (result.success) {
            router.refresh();
        } else {
            setError(result.message || '削除に失敗しました。');
        }
        setIsSubmitting(false);
    };

    const handleDelete = (id: number) => {
        setDeleteDialogId(id);
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group" title="スポンサー管理">
                    <Settings2 className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 rounded-3xl border-none shadow-2xl overflow-hidden p-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="w-2 h-7 bg-orange-500 rounded-full"></span>
                        スポンサー管理
                    </DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
                    {/* 追加フォーム */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Plus className="w-4 h-4 text-orange-500" />
                            新規追加
                        </h4>
                        <form onSubmit={handleAdd} className="space-y-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs font-bold">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">スポンサー名 *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500 transition-all font-bold"
                                    placeholder="例: 株式会社ユナイト"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                        <ImageIcon className="w-3 h-3" /> ロゴURL
                                    </label>
                                    <input
                                        type="url"
                                        value={form.logoUrl}
                                        onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500 transition-all"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                        <Globe className="w-3 h-3" /> リンクURL
                                    </label>
                                    <input
                                        type="url"
                                        value={form.url}
                                        onChange={(e) => setForm({ ...form, url: e.target.value })}
                                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500 transition-all"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-black py-2.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 text-sm"
                            >
                                追加する
                            </button>
                        </form>
                    </div>

                    {/* 一覧 */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">現在のスポンサー</h4>
                        <div className="space-y-2">
                            {team.sponsors.length === 0 ? (
                                <p className="text-xs text-gray-400 italic py-4 text-center">登録されているスポンサーはありません</p>
                            ) : (
                                team.sponsors.map((sponsor) => (
                                    <div key={sponsor.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 group hover:border-purple-500/30 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700 overflow-hidden">
                                                {sponsor.logoUrl ? (
                                                    <img src={sponsor.logoUrl} alt={sponsor.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <Settings2 className="w-4 h-4 text-gray-300" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{sponsor.name}</p>
                                                {sponsor.url && <p className="text-[10px] text-gray-400 truncate max-w-[200px]">{sponsor.url}</p>}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(sponsor.id)}
                                            disabled={isSubmitting}
                                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-4 bg-gray-50 dark:bg-gray-900/50">
                    <button
                        onClick={() => setOpen(false)}
                        className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        閉じる
                    </button>
                </DialogFooter>
            </DialogContent>
            <DeleteConfirmDialog
                open={deleteDialogId !== null}
                onOpenChange={(open) => !open && setDeleteDialogId(null)}
                onConfirm={() => deleteDialogId && executeDelete(deleteDialogId)}
                title="スポンサーを削除しますか？"
            />
        </Dialog>

    );
}
