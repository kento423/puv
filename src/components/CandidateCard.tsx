"use client";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, Swords, Target, MoreHorizontal, Trash2, Edit3, Share2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getUserId } from "@/lib/userId";

interface CandidateCardProps {
  name: string;
  imageUrl: string;
  reason: string;
  counterType?: "hard" | "soft" | null;
  upvotes: number;
  downvotes: number;
  onVote: (voteType: "upvote" | "downvote") => Promise<void>;
  onEditReason: (newReason: string, newCounterType?: "hard" | "soft" | null) => Promise<void>;
  onDelete?: () => Promise<void> | void;
  guestId?: string | null;
  targetPokemonName?: string;
}

export default function CandidateCard({
  name,
  imageUrl,
  reason,
  counterType,
  upvotes,
  downvotes,
  onVote,
  onEditReason,
  onDelete,
  slug,
  guestId,
  targetPokemonName,
}: CandidateCardProps & { slug: string }) {
  const [activeVote, setActiveVote] = useState<"upvote" | "downvote" | null>(null);
  const [displayUpvotes, setDisplayUpvotes] = useState(upvotes);
  const [displayDownvotes, setDisplayDownvotes] = useState(downvotes);
  const [isVoting, setIsVoting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editReason, setEditReason] = useState(reason);
  const [editCounterType, setEditCounterType] = useState<"hard" | "soft" | null>(
    counterType || null
  );
  const [isEditSaving, setIsEditSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);


  const [currentUserGuestId, setCurrentUserGuestId] = useState<string | null>(null);
  const isOwner = currentUserGuestId != null && currentUserGuestId === guestId;

  const isUpvoted = activeVote === "upvote";
  const isDownvoted = activeVote === "downvote";
  const hasVoted = activeVote !== null;

  useEffect(() => {
    setCurrentUserGuestId(getUserId());
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (isVoting || hasVoted) return;

    setIsVoting(true);
    setActiveVote(voteType);
    if (voteType === "upvote") {
      setDisplayUpvotes(displayUpvotes + 1);
    } else {
      setDisplayDownvotes(displayDownvotes + 1);
    }

    try {
      await onVote(voteType);
    } catch (error) {
      setActiveVote(null);
      if (voteType === "upvote") {
        setDisplayUpvotes(displayUpvotes);
      } else {
        setDisplayDownvotes(displayDownvotes);
      }
      alert(error instanceof Error ? error.message : "投票に失敗しました");
    } finally {
      setIsVoting(false);
    }
  };

  const handleEditClick = () => {
    setEditReason(reason);
    setEditCounterType(counterType || null);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditReason(reason);
    setEditCounterType(counterType || null);
    setIsEditing(false);
  };

  const handleEditSave = async () => {
    setIsEditSaving(true);
    try {
      await onEditReason(editReason, editCounterType);
      setIsEditing(false);
    } catch (error) {
      console.error("Edit reason/type error:", error);
      setEditReason(reason);
      setEditCounterType(counterType || null);
      alert(`編集に失敗しました: ${error instanceof Error ? error.message : "未知のエラー"}`);
    } finally {
      setIsEditSaving(false);
    }
  };

  const CounterBadge = ({ type, className }: { type: "hard" | "soft" | null | undefined, className?: string }) => {
    if (type === "hard") {
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-800/50 ${className}`}>
          <Swords size={12} className="shrink-0" />
          ハードカウンター
        </span>
      );
    }
    if (type === "soft") {
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-800/50 ${className}`}>
          <Target size={12} className="shrink-0" />
          ソフトカウンター
        </span>
      );
    }
    return null;
  };

  if (isDeleting) {
    return (
      <li className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
          <Trash2 size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
            この対策を削除しますか？
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            削除したデータは元に戻せません。
          </p>
        </div>
        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={async () => {
              if (onDelete) await onDelete();
              setIsDeleting(false);
            }}
            className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition active:scale-95 shadow-sm"
          >
            削除する
          </button>
          <button
            onClick={() => setIsDeleting(false)}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition active:scale-95 shadow-sm"
          >
            戻る
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-3 p-3 md:p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow relative">

      {/* シェア・メニュー（右上に絶対配置） */}
      <div className="absolute top-2 right-2 flex items-center gap-0.5 z-[5]">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${targetPokemonName || ""}のカウンターに${name}を提案！\n#ポケモンユナイト #UniteCounterGuide\n`)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            title="Xでシェア"
          >
            <Share2 size={14} />
          </a>
          {isOwner && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <MoreHorizontal size={16} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-10">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleEditClick();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <Edit3 size={14} />
                    <span>編集</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDeleting(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>削除</span>
                  </button>

                </div>
              )}
            </div>
          )}
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center">
      {/* アイコンと名前（スマホでは横並び、PCではアイコンのみ） */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <Link href={`/pokemon/${slug}`} prefetch={false} className="hover:opacity-80 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            width={56}
            height={56}
            className="rounded-full md:w-16 md:h-16 w-14 h-14 bg-gray-100 dark:bg-gray-700 object-cover border border-gray-100 dark:border-gray-700 shadow-sm"
          />
        </Link>
        <div className="md:hidden flex-1 min-w-0">
          <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1 truncate">{name}</h3>
          {!isEditing && <CounterBadge type={counterType} />}
        </div>
      </div>

      <div className="flex-1 w-full md:w-auto">
        {/* PC表示用の名前とバッジ */}
        <div className="hidden md:flex items-center gap-2 mb-2 flex-wrap">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{name}</h3>
          {!isEditing && <CounterBadge type={counterType} />}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setEditCounterType(editCounterType === "hard" ? null : "hard")}
                disabled={isEditSaving}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${editCounterType === "hard"
                  ? "bg-orange-500 text-white border-orange-500 dark:bg-orange-600 dark:border-orange-600"
                  : "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/50 dark:hover:bg-orange-900/40"
                  } disabled:opacity-50`}
              >
                <Swords size={14} /> ハードカウンター
              </button>
              <button
                onClick={() => setEditCounterType(editCounterType === "soft" ? null : "soft")}
                disabled={isEditSaving}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${editCounterType === "soft"
                  ? "bg-purple-600 text-white border-purple-600 dark:bg-purple-500 dark:border-purple-500"
                  : "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/50 dark:hover:bg-purple-900/40"
                  } disabled:opacity-50`}
              >
                <Target size={14} /> ソフトカウンター
              </button>
            </div>
            <textarea
              className="text-xs md:text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full min-h-[80px]"
              value={editReason}
              onChange={(e) => setEditReason(e.target.value)}
              placeholder="対策理由や立ち回り..."
              disabled={isEditSaving}
            />
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-xs md:text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95 font-medium flex-1 md:flex-none shadow-sm"
                onClick={handleEditSave}
                disabled={isEditSaving}
              >
                {isEditSaving ? "保存中..." : "保存する"}
              </button>
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs md:text-sm rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95 font-medium flex-1 md:flex-none"
                onClick={handleEditCancel}
                disabled={isEditSaving}
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2">
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 flex-1 break-words leading-relaxed whitespace-pre-wrap">
              {reason || <span className="text-gray-400 italic">理由はまだありません</span>}
            </p>
          </div>
        )}
      </div>

      <div className="text-xs md:text-sm flex items-center gap-1 md:gap-2 flex-shrink-0 w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-700/50 justify-between md:justify-end">
        <div className="text-gray-500 dark:text-gray-400 text-xs font-medium md:hidden ml-1">評価</div>
        <div className="flex gap-1 md:gap-2">
          <button
            onClick={() => handleVote("upvote")}
            disabled={hasVoted || isVoting}
            className={`flex items-center gap-1.5 px-3 py-2 md:px-3 md:py-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-xs md:text-sm font-semibold border ${isUpvoted
              ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
              : "bg-white border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-blue-900/20 disabled:hover:text-gray-600 disabled:hover:bg-white disabled:hover:border-gray-200 dark:disabled:hover:text-gray-400 dark:disabled:hover:bg-gray-800 dark:disabled:hover:border-gray-600"
              }`}
            aria-label="いいね"
            aria-pressed={isUpvoted}
          >
            <ThumbsUp size={16} className="md:w-5 md:h-5" stroke="currentColor" fill={isUpvoted ? "currentColor" : "none"} />
            <span>{displayUpvotes}</span>
          </button>
          <button
            onClick={() => handleVote("downvote")}
            disabled={hasVoted || isVoting}
            className={`flex items-center gap-1.5 px-3 py-2 md:px-3 md:py-2 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-xs md:text-sm font-semibold border ${isDownvoted
              ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300"
              : "bg-white border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:text-red-400 dark:hover:border-red-700 dark:hover:bg-red-900/20 disabled:hover:text-gray-600 disabled:hover:bg-white disabled:hover:border-gray-200 dark:disabled:hover:text-gray-400 dark:disabled:hover:bg-gray-800 dark:disabled:hover:border-gray-600"
              }`}
            aria-label="よくないね"
            aria-pressed={isDownvoted}
          >
            <ThumbsDown size={16} className="md:w-5 md:h-5" stroke="currentColor" fill={isDownvoted ? "currentColor" : "none"} />
            <span>{displayDownvotes}</span>
          </button>
        </div>
      </div>
      </div>
    </li>

  );
}