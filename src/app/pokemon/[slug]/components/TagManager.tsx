"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface CustomTag {
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
  const [error, setError] = useState<string | null>(null);

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

  const handleDeleteTag = async (tagId: number) => {
    if (!window.confirm("このタグを削除しますか？")) {
      return;
    }

    setIsDeleting(tagId);
    setError(null);

    try {
      const res = await fetch(`/api/pokemon/${slug}/tags/${tagId}`, {
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

  return (
    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
      <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
        特徴タグを管理
      </h3>

      {/* 既存タグ表示 */}
      {customTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customTags.map((ct) => (
            <div
              key={ct.tag.id}
              className={`flex items-center gap-2 text-xs md:text-sm font-medium px-3 py-1.5 rounded-full ${customTagColorMap[ct.tag.color] || customTagColorMap.gray
                } border border-current border-opacity-30`}
            >
              <span>{ct.tag.name}</span>
              <button
                onClick={() => handleDeleteTag(ct.tag.id)}
                disabled={isDeleting === ct.tag.id}
                className="hover:opacity-70 transition-opacity disabled:opacity-50"
                aria-label={`${ct.tag.name}を削除`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
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
            className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <select
            value={tagColor}
            onChange={(e) => setTagColor(e.target.value)}
            className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
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
              className="px-4 py-2 md:py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 font-medium"
            >
              {isSubmitting ? "追加中..." : "追加"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 md:py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
        >
          <Plus size={18} />
          タグを追加
        </button>
      )}
    </div>
  );
}
