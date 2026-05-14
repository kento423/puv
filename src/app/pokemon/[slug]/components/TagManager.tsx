"use client";

import { Plus, X, AlertTriangle, Check, MoreHorizontal, ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserId } from "@/lib/userId";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";


interface CustomTag {
  guestId?: string | null;
  userId?: string | null;
  upvotes: number;
  downvotes: number;
  tag: {
    id: number;
    name: string;
    color: string;
  };
}

interface TagManagerProps {
  slug: string;
  customTags: CustomTag[];
  onTagsUpdated: () => void;
}

const colorOptions = [
  { value: "red", label: "赤" },
  { value: "orange", label: "オレンジ" },
  { value: "yellow", label: "黄色" },
  { value: "green", label: "緑" },
  { value: "blue", label: "青" },
  { value: "purple", label: "紫" },
  { value: "pink", label: "ピンク" },
  { value: "gray", label: "グレー" },
];

const customTagColorMap: Record<string, string> = {
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
};

export default function TagManager({ slug, customTags, onTagsUpdated }: TagManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("gray");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [deleteDialogId, setDeleteDialogId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [reportedTagId, setReportedTagId] = useState<number | null>(null);

  useEffect(() => {
    try {
      setCurrentUserId(getUserId());
    } catch (e) {
      console.error("Failed to get userId:", e);
    }
  }, []);


  const handleAddTag = async () => {
    if (!tagName.trim()) {
      setError("タグ名を入力してください");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/pokemon/${slug}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tagName: tagName.trim(),
          color: tagColor,
          guestId: currentUserId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "タグの追加に失敗しました");
      }

      setTagName("");
      setTagColor("gray");
      setShowForm(false);
      onTagsUpdated();
    } catch (err) {
      const message = err instanceof Error ? err.message : "エラーが発生しました";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const executeDeleteTag = async (tagId: number) => {
    setIsDeleting(tagId);
    setError(null);

    try {
      const res = await fetch(`/api/pokemon/${slug}/tags/${tagId}?guestId=${currentUserId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "タグの削除に失敗しました");
      }

      onTagsUpdated();
    } catch (err) {
      const message = err instanceof Error ? err.message : "エラーが発生しました";
      setError(message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleReportTag = async (tagId: number) => {
    if (!currentUserId) return;
    
    try {
      const res = await fetch(`/api/pokemon/${slug}/tags/${tagId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reporterGuestId: currentUserId,
          reason: "不適切なタグ",
        }),
      });

      if (res.ok) {
        setReportedTagId(tagId);
        setTimeout(() => setReportedTagId(null), 3000);
      }
    } catch (err) {
      console.error("Failed to report tag:", err);
    }
  };

  const handleVoteTag = async (tagId: number, voteType: "upvote" | "downvote") => {
    if (!currentUserId || !slug) return;

    try {
      const res = await fetch(`/api/pokemon/${slug}/tags/${tagId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserId,
          voteType,
        }),
      });

      if (res.ok) {
        onTagsUpdated();
      }
    } catch (err) {
      console.error("Failed to vote on tag:", err);
    }
  };

  const handleDeleteTag = (tagId: number) => {
    setDeleteDialogId(tagId);
  };


  return (
    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
      <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
        特徴タグを管理
      </h3>

      {/* 既存タグ表示 */}
      {customTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customTags.map((ct) => {
            const isOwner = currentUserId && ct.guestId === currentUserId;
            const isReported = reportedTagId === ct.tag.id;
            const score = (ct.upvotes || 0) - (ct.downvotes || 0);

            return (
              <div
                key={ct.tag.id}
                className={`flex items-center gap-1.5 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full ${customTagColorMap[ct.tag.color] || customTagColorMap.gray
                  } border border-current border-opacity-30`}
              >
                <span className="flex items-center gap-1">
                  {ct.tag.name}
                  {score !== 0 && (
                    <span className={`text-[10px] opacity-70 font-bold ${score > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {score > 0 ? `+${score}` : score}
                    </span>
                  )}
                </span>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="hover:bg-black/5 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
                      aria-label="メニュー"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2" align="start">
                    <div className="flex flex-col gap-1">
                      {/* 評価セクション */}
                      <div className="flex items-center justify-between border-b pb-1 mb-1 border-gray-100 dark:border-gray-700">
                        <button
                          onClick={() => handleVoteTag(ct.tag.id, "upvote")}
                          className="flex-1 flex items-center justify-center p-1.5 hover:bg-green-50 dark:hover:bg-green-900/30 rounded text-green-600 transition-colors"
                          title="高評価"
                        >
                          <ThumbsUp size={14} />
                        </button>
                        <button
                          onClick={() => handleVoteTag(ct.tag.id, "downvote")}
                          className="flex-1 flex items-center justify-center p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded text-red-600 transition-colors"
                          title="低評価"
                        >
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                      
                      {/* 通報 */}
                      <button
                        onClick={() => handleReportTag(ct.tag.id)}
                        className={`flex items-center gap-2 w-full text-left px-2 py-1.5 text-xs rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isReported ? 'text-green-600' : 'text-orange-600'}`}
                        disabled={isReported}
                      >
                        {isReported ? (
                          <><Check size={14} /> 通報済み</>
                        ) : (
                          <><AlertTriangle size={14} /> 通報する</>
                        )}
                      </button>

                      {/* 削除 (所有者のみ) */}
                      {isOwner && (
                        <button
                          onClick={() => handleDeleteTag(ct.tag.id)}
                          className="flex items-center gap-2 w-full text-left px-2 py-1.5 text-xs rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 transition-colors"
                        >
                          <Trash2 size={14} /> 削除する
                        </button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            );
          })}
        </div>
      )}

      {/* タグ追加フォーム */}
      {showForm ? (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}
          <input
            type="text"
            placeholder="タグ名を入力..."
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            maxLength={20}
            className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary text-sm"
          />
          <select
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
            className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-brand-primary text-sm"
          >
            {colorOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setShowForm(false);
                setTagName("");
                setTagColor("gray");
                setError(null);
              }}
              disabled={isSubmitting}
              className="px-4 py-2 md:py-1.5 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
            >
              キャンセル
            </button>
            <button
              onClick={handleAddTag}
              disabled={isSubmitting}
              className="px-4 py-2 md:py-1.5 text-sm bg-brand-primary text-white rounded-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 font-medium"
            >
              {isSubmitting ? "追加中..." : "追加"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 md:py-2 text-sm font-medium bg-brand-primary text-white rounded-lg hover:opacity-90 active:scale-95 transition-all"
        >
          <Plus size={18} />
          タグを追加
        </button>
      )}
      <DeleteConfirmDialog
        open={deleteDialogId !== null}
        onOpenChange={(open) => !open && setDeleteDialogId(null)}
        onConfirm={() => deleteDialogId && executeDeleteTag(deleteDialogId)}
        title="このタグを削除しますか？"
      />
    </div>
  );
}
