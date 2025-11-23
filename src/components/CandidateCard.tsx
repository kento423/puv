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
    <li className="flex gap-4 items-center p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900">
      <Link href={`/pokemon/${slug}`} prefetch={false} className="hover:opacity-80">
        <Image
          src={imageUrl}
          alt={name}
          width={64}
          height={64}
          className="rounded-full"
        />
      </Link>
      <div className="flex-1">
        <h3 className="font-bold text-lg">{name}</h3>
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              className="text-sm text-zinc-600 dark:text-zinc-300 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editReason}
              onChange={e => setEditReason(e.target.value)}
              rows={2}
              disabled={isEditSaving}
            />
            <div className="flex gap-2">
              <button 
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                onClick={handleEditSave}
                disabled={isEditSaving}
              >
                {isEditSaving ? "保存中..." : "保存"}
              </button>
              <button 
                className="px-3 py-1 bg-gray-300 text-black text-xs rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
                onClick={handleEditCancel}
                disabled={isEditSaving}
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 flex-1">{reason}</p>
            <button 
              className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors" 
              onClick={handleEditClick}
              title="編集"
              aria-label="理由を編集"
            >
              <SquarePen size={16} />
            </button>
          </div>
        )}
      </div>
      <div className="text-sm flex items-center gap-2">
        <button
          onClick={() => handleVote("upvote")}
          disabled={hasVoted || isVoting}
          className={`mr-2 flex items-center gap-1 px-3 py-1 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isUpvoted
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              : "text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:hover:text-zinc-500 disabled:hover:bg-transparent"
          }`}
          aria-label="いいね"
          aria-pressed={isUpvoted}
        >
          <ThumbsUp size={20} stroke="currentColor" /> {displayUpvotes}
        </button>
        <button
          onClick={() => handleVote("downvote")}
          disabled={hasVoted || isVoting}
          className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isDownvoted
              ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
              : "text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 disabled:hover:text-zinc-500 disabled:hover:bg-transparent"
          }`}
          aria-label="よくないね"
          aria-pressed={isDownvoted}
        >
          <ThumbsDown size={20} stroke="currentColor" /> {displayDownvotes}
        </button>
      </div>
    </li>
  );
}