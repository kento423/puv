"use client";
import Image from "next/image";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CandidateCardProps {
  name: string;
  imageUrl: string;
  reason: string;
  upvotes: number;
  downvotes: number;
  onVote: (voteType: "upvote" | "downvote") => Promise<void>; // 親から渡される投票処理（非同期）
}

export default function CandidateCard({
  name,
  imageUrl,
  reason,
  upvotes,
  downvotes,
  onVote,
  slug, // 新規追加: カウンターポケモンのslug
}: CandidateCardProps & { slug: string }) {
  const [activeVote, setActiveVote] = useState<"upvote" | "downvote" | null>(null);
  const [displayUpvotes, setDisplayUpvotes] = useState(upvotes);
  const [displayDownvotes, setDisplayDownvotes] = useState(downvotes);
  const [isVoting, setIsVoting] = useState(false);

  const isUpvoted = activeVote === "upvote";
  const isDownvoted = activeVote === "downvote";
  const hasVoted = activeVote !== null;

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (isVoting || hasVoted) return;
    
    setIsVoting(true);
    setActiveVote(voteType);
    // ローカルで投票数を増やす
    if (voteType === "upvote") {
      setDisplayUpvotes(displayUpvotes + 1);
    } else {
      setDisplayDownvotes(displayDownvotes + 1);
    }
    
    try {
      await onVote(voteType);
    } catch (error) {
      // エラー時はローカル状態を戻す
      setActiveVote(null);
      if (voteType === "upvote") {
        setDisplayUpvotes(displayUpvotes);
      } else {
        setDisplayDownvotes(displayDownvotes);
      }
    } finally {
      setIsVoting(false);
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
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{reason}</p>
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