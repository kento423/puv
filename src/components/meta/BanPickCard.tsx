"use client";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, MoreHorizontal, Trash2, Edit3, Shield, Target } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getUserId } from "@/lib/userId";

interface BanPickCardProps {
  id: number;
  pokemon: {
    nameJa: string;
    imageUrl: string | null;
    slug: string;
  };
  side: string; // "first" | "second"
  reason: string | null;
  upvotes: number;
  downvotes: number;
  guestId: string | null;
  onVote: (voteType: "upvote" | "downvote") => Promise<void>;
  onEdit: (reason: string, side: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  isPastPatch?: boolean;
}

export default function BanPickCard({
  id,
  pokemon,
  side,
  reason,
  upvotes,
  downvotes,
  guestId,
  onVote,
  onEdit,
  onDelete,
  isPastPatch,
}: BanPickCardProps) {
  const [activeVote, setActiveVote] = useState<"upvote" | "downvote" | null>(null);
  const [displayUpvotes, setDisplayUpvotes] = useState(upvotes);
  const [displayDownvotes, setDisplayDownvotes] = useState(downvotes);
  const [isVoting, setIsVoting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editReason, setEditReason] = useState(reason || "");
  const [editSide, setEditSide] = useState(side);
  const [isEditSaving, setIsEditSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


  const [currentUserGuestId, setCurrentUserGuestId] = useState<string | null>(null);
  const isOwner = currentUserGuestId != null && currentUserGuestId === guestId;
  const hasVoted = activeVote !== null;

  useEffect(() => {
    setCurrentUserGuestId(getUserId());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (isVoting || hasVoted) return;
    setIsVoting(true);
    setActiveVote(voteType);
    if (voteType === "upvote") setDisplayUpvotes(prev => prev + 1);
    else setDisplayDownvotes(prev => prev + 1);

    try {
      await onVote(voteType);
    } catch (error) {
      setActiveVote(null);
      if (voteType === "upvote") setDisplayUpvotes(upvotes);
      else setDisplayDownvotes(downvotes);
      alert(error instanceof Error ? error.message : "投票に失敗しました");
    } finally {
      setIsVoting(false);
    }
  };

  const handleEditSave = async () => {
    setIsEditSaving(true);
    try {
      await onEdit(editReason, editSide);
      setIsEditing(false);
    } catch (error) {
      alert("編集に失敗しました");
    } finally {
      setIsEditSaving(false);
    }
  };

  if (isDeleting) {
    return (
      <li className="flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400">
          <Trash2 size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
            この提案を削除しますか？
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
    <li className={`flex flex-col gap-3 p-3 md:p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative transition-all`}>

      {isOwner && !isPastPatch && (
        <div className="absolute top-2 right-2 z-[5] text-gray-400">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <MoreHorizontal size={16} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-10">
                <button
                  onClick={() => { setIsMenuOpen(false); setIsEditing(true); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <Edit3 size={14} /><span>編集</span>
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); setIsDeleting(true); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <Trash2 size={14} /><span>削除</span>
                </button>

              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link href={`/pokemon/${pokemon.slug}`} className="hover:opacity-80 flex-shrink-0">
            <Image
              src={pokemon.imageUrl || ""}
              alt={pokemon.nameJa}
              width={56}
              height={56}
              className="rounded-full md:w-16 md:h-16 w-14 h-14 bg-gray-100 dark:bg-gray-700 object-cover border border-gray-100 shadow-sm"
            />
          </Link>
          <div className="md:hidden flex-1">
            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">{pokemon.nameJa}</h3>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
              {side === "first" ? <Shield size={12}/> : <Target size={12}/>}
              {side === "first" ? "先攻BAN" : "後攻BAN"}
            </span>
          </div>
        </div>

        <div className="flex-1 w-full md:w-auto">
          <div className="hidden md:flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{pokemon.nameJa}</h3>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
              {side === "first" ? <Shield size={12}/> : <Target size={12}/>}
              {side === "first" ? "先攻" : "後攻"}
            </span>
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-3">
              <select
                value={editSide}
                onChange={(e) => setEditSide(e.target.value)}
                className="text-sm p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white max-w-[200px]"
                disabled={isEditSaving}
              >
                <option value="first">先攻</option>
                <option value="second">後攻</option>
              </select>
              <textarea
                className="text-sm p-3 border rounded-lg focus:ring-2 focus:ring-brand-primary w-full min-h-[80px]"
                value={editReason || ""}
                onChange={(e) => setEditReason(e.target.value)}
                placeholder="BANする理由"
                disabled={isEditSaving}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditSave} disabled={isEditSaving}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm transition-colors hover:bg-purple-700"
                >
                  保存する
                </button>
                <button
                  onClick={() => setIsEditing(false)} disabled={isEditSaving}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm"
                >
                  キャンセル
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-700 dark:text-gray-300 break-words whitespace-pre-wrap">
              {reason || <span className="text-gray-400 italic">理由なし</span>}
            </p>
          )}
        </div>

        <div className="text-xs md:text-sm flex items-center gap-2 w-full md:w-auto mt-2 pt-2 border-t md:border-t-0 md:mt-0 md:pt-0 justify-end flex-shrink-0">
          <button
            onClick={() => handleVote("upvote")}
            disabled={isVoting || hasVoted || isPastPatch}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all font-semibold ${
              activeVote === "upvote"
                ? "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                : "bg-white border-gray-200 text-gray-600 hover:text-brand-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
            }`}
          >
           <ThumbsUp size={16} fill={activeVote === "upvote" ? "currentColor" : "none"} />
           <span>{displayUpvotes}</span>
          </button>
          <button
            onClick={() => handleVote("downvote")}
            disabled={isVoting || hasVoted || isPastPatch}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all font-semibold ${
              activeVote === "downvote"
                ? "bg-gray-100 border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
            }`}
          >
           <ThumbsDown size={16} fill={activeVote === "downvote" ? "currentColor" : "none"} />
           <span>{displayDownvotes}</span>
          </button>
        </div>
      </div>
    </li>
  );
}
