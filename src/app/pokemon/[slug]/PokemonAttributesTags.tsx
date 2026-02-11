"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";

interface AttributeTag {
  label: string;
  value: string;
  color: string;
}

interface CustomTag {
  tag: {
    id: number;
    name: string;
    color: string;
  };
}

interface PokemonAttributesTagsProps {
  damageClass: string;
  rangeType: string;
  battleStyle: string;
  customTags: CustomTag[];
  slug?: string;
  onTagsUpdated?: () => void;
  showBasicTags?: boolean;
  showCustomTags?: boolean;
  compact?: boolean;
}

// 属性を日本語に変換するマッピング
const damageClassLabels: Record<string, { ja: string; color: string }> = {
  physical: { ja: "攻撃", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
  special: { ja: "特攻", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
};

const rangeTypeLabels: Record<string, { ja: string; color: string }> = {
  melee: { ja: "近接", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
  ranged: { ja: "遠隔", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
};

const battleStyleLabels: Record<string, { ja: string; color: string }> = {
  attacker: { ja: "アタック型", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  "all-rounder": { ja: "バランス型", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  defender: { ja: "ディフェンス型", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  speedster: { ja: "スピード型", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  supporter: { ja: "サポート型", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
};

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

export default function PokemonAttributesTags({
  damageClass,
  rangeType,
  battleStyle,
  customTags,
  slug,
  onTagsUpdated,
  showBasicTags = true,
  showCustomTags = true,
  compact = false,
}: PokemonAttributesTagsProps) {
  const [showForm, setShowForm] = useState(false);
  const [tagName, setTagName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandTags, setExpandTags] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ビューポートをリセット（モバイルのキーボードズーム＆スクロール位置対策）
  const resetViewport = () => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        // Zoom level をリセット
        document.documentElement.style.zoom = "1";
        // スクロール位置をリセット
        window.scrollTo({ top: 0, behavior: "smooth" });
        // 入力フォーカスを外す（iOS で UI が再計算される）
        inputRef.current?.blur();
      }, 50);
    }
  };

  // デバイスタイプを判定
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // デバイスごとに表示するタグ数を決定
  const maxVisibleTags = isMobile ? 2 : 3;

  // 統一されたタグのクラス名（基本情報とカスタムタグで同じサイズ）
  const tagClassName = "text-xs md:text-sm font-medium px-3 py-1.5 rounded-full";
  const customTagColor = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

  const handleAddTag = async () => {
    if (!tagName.trim() || !slug) {
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
          color: "gray",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "タグの追加に失敗しました");
      }

      setTagName("");
      setShowForm(false);
      resetViewport();
      if (onTagsUpdated) {
        onTagsUpdated();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "エラーが発生しました";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTag = async (tagId: number) => {
    if (!slug || !window.confirm("このタグを削除しますか？")) {
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

      if (onTagsUpdated) {
        onTagsUpdated();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "エラーが発生しました";
      setError(message);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className={compact ? "space-y-2" : "space-y-4 mt-4"}>
      {/* 基本情報セクション */}
      {showBasicTags && (
        <div>
          <div className="flex flex-wrap gap-2">
            {damageClassLabels[damageClass] && (
              <span className={`${tagClassName} ${damageClassLabels[damageClass].color}`}>
                {damageClassLabels[damageClass].ja}
              </span>
            )}
            {rangeTypeLabels[rangeType] && (
              <span className={`${tagClassName} ${rangeTypeLabels[rangeType].color}`}>
                {rangeTypeLabels[rangeType].ja}
              </span>
            )}
            {battleStyleLabels[battleStyle] && (
              <span className={`${tagClassName} ${battleStyleLabels[battleStyle].color}`}>
                {battleStyleLabels[battleStyle].ja}
              </span>
            )}
          </div>
        </div>
      )}

      {/* カスタムタグセクション */}
      {showCustomTags && (
        <div>
          {/* 既存タグ表示 */}
          {customTags.length > 0 && (
            <div>
              <div className={`flex flex-wrap gap-2 ${compact ? "mb-2" : "mb-3"}`}>
                {/* compactモード時はデバイスに応じて表示タグ数を変更 */}
                {(compact && !expandTags ? customTags.slice(0, maxVisibleTags) : customTags).map((ct) => (
                  <div
                    key={ct.tag.id}
                    className={`flex items-center gap-2 ${tagClassName} ${customTagColor} border border-current border-opacity-30`}
                  >
                    <span>{ct.tag.name}</span>
                    {slug && (
                      <button
                        onClick={() => handleDeleteTag(ct.tag.id)}
                        disabled={isDeleting === ct.tag.id}
                        className="hover:opacity-70 transition-opacity disabled:opacity-50"
                        aria-label={`${ct.tag.name}を削除`}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {/* expandボタン（compactモード時で非表示タグがある場合） */}
              {compact && customTags.length > maxVisibleTags && (
                <button
                  onClick={() => setExpandTags(!expandTags)}
                  className="text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {expandTags ? `タグを折りたたむ (${customTags.length})` : `さらに${customTags.length - maxVisibleTags}個のタグを表示`}
                </button>
              )}
            </div>
          )}

        {/* エラー表示 */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 px-3 py-2 rounded text-xs md:text-sm">
            {error}
          </div>
        )}

        {/* タグ追加フォーム */}
        {slug && (
          <>
            {showForm ? (
              <div className={`bg-gray-50 dark:bg-gray-700 p-3 rounded-lg space-y-2 ${compact ? "mt-2" : ""}`}>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  新しいタグを追加
                </label>
                <input
                  type="text"
                  placeholder="タグ名を入力... (最大20文字)"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  maxLength={20}
                  ref={inputRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isSubmitting && tagName.trim()) {
                      handleAddTag();
                    }
                    if (e.key === "Escape") {
                      setShowForm(false);
                      setTagName("");
                      setError(null);
                      resetViewport();
                    }
                  }}
                  autoFocus
                  className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-xs md:text-sm"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setTagName("");
                      setError(null);
                      resetViewport();
                    }}
                    disabled={isSubmitting}
                    className="px-3 py-2 text-xs md:text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleAddTag}
                    disabled={isSubmitting || !tagName.trim()}
                    className="px-3 py-2 text-xs md:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isSubmitting ? "追加中..." : "追加"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className={`flex items-center gap-1 px-3 py-2 text-xs md:text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all ${
                  compact ? "" : ""
                }`}
              >
                <Plus size={16} />
                タグを追加
              </button>
            )}
          </>
        )}
        </div>
      )}
    </div>
  );
}
