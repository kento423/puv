"use client";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, SquarePen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CandidateCardProps {
  name: string;
  imageUrl: string;
  reason: string;
  upvotes: number;
  downvotes: number;
  onVote: (voteType: "upvote" | "downvote") => Promise<void>;
  onEditReason: (newReason: string) => Promise<void>;
}

export default function CandidateCard({
  name,
  imageUrl,
  reason,
  upvotes,
  downvotes,
  onVote,
  onEditReason,
  slug,
}: CandidateCardProps & { slug: string }) {
  const [activeVote, setActiveVote] = useState<"upvote" | "downvote" | null>(null);
  const [displayUpvotes, setDisplayUpvotes] = useState(upvotes);
  const [displayDownvotes, setDisplayDownvotes] = useState(downvotes);
  const [isVoting, setIsVoting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editReason, setEditReason] = useState(reason);
  const [isEditSaving, setIsEditSaving] = useState(false);

  const isUpvoted = activeVote === "upvote";
  const isDownvoted = activeVote === "downvote";
  const hasVoted = activeVote !== null;

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
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditReason(reason);
    setIsEditing(false);
  };

  const handleEditSave = async () => {
    setIsEditSaving(true);
    try {
      await onEditReason(editReason);
      setIsEditing(false);
    } catch (error) {
      console.error("Edit reason error:", error);
      setEditReason(reason);
      alert(`編集に失敗しました: ${error instanceof Error ? error.message : "未知のエラー"}`);
    } finally {
      setIsEditSaving(false);
    }
  };

  return (
    <li className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center p-3 md:p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
      <Link href={`/pokemon/${slug}`} prefetch={false} className="hover:opacity-80 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={name}
          width={56}
          height={56}
          className="rounded-full md:w-16 md:h-16 w-14 h-14"
        />
      </Link>
      <div className="flex-1 w-full md:w-auto">
        <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white">{name}</h3>
        {isEditing ? (
          <div className="flex flex-col gap-2 mt-2">
            <textarea
              className="text-xs md:text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={editReason}
              onChange={e => setEditReason(e.target.value)}
              rows={2}
              disabled={isEditSaving}
            />
            <div className="flex gap-2">
              <button 
                className="px-3 py-2 md:py-1 bg-blue-500 dark:bg-blue-600 text-white text-xs md:text-xs rounded hover:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95 font-medium flex-1 md:flex-none" 
                onClick={handleEditSave}
                disabled={isEditSaving}
              >
                {isEditSaving ? "保存中..." : "保存"}
              </button>
              <button 
                className="px-3 py-2 md:py-1 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white text-xs md:text-xs rounded hover:bg-gray-400 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors active:scale-95 font-medium flex-1 md:flex-none" 
                onClick={handleEditCancel}
                disabled={isEditSaving}
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2 mt-1">
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 flex-1 break-words">{reason}</p>
            <button 
              className="p-1 md:p-1.5 text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors flex-shrink-0" 
              onClick={handleEditClick}
              title="編集"
              aria-label="理由を編集"
            >
              <SquarePen size={16} className="md:w-5 md:h-5" />
            </button>
          </div>
        )}
      </div>
      <div className="text-xs md:text-sm flex items-center gap-1 md:gap-2 flex-shrink-0 w-full md:w-auto justify-start md:justify-end">
        <button
          onClick={() => handleVote("upvote")}
          disabled={hasVoted || isVoting}
          className={`flex items-center gap-1 px-2.5 md:px-3 py-2 md:py-1.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-xs md:text-sm font-medium ${
            isUpvoted
              ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
              : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:hover:text-gray-500 disabled:hover:bg-transparent"
          }`}
          aria-label="いいね"
          aria-pressed={isUpvoted}
        >
          <ThumbsUp size={16} className="md:w-5 md:h-5" stroke="currentColor" fill={isUpvoted ? "currentColor" : "none"} /> 
          <span className="hidden sm:inline">{displayUpvotes}</span>
        </button>
        <button
          onClick={() => handleVote("downvote")}
          disabled={hasVoted || isVoting}
          className={`flex items-center gap-1 px-2.5 md:px-3 py-2 md:py-1.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-xs md:text-sm font-medium ${
            isDownvoted
              ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300"
              : "text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:hover:text-gray-500 disabled:hover:bg-transparent"
          }`}
          aria-label="よくないね"
          aria-pressed={isDownvoted}
        >
          <ThumbsDown size={16} className="md:w-5 md:h-5" stroke="currentColor" fill={isDownvoted ? "currentColor" : "none"} /> 
          <span className="hidden sm:inline">{displayDownvotes}</span>
        </button>
      </div>
    </li>
  );
}