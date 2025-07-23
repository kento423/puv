import Image from "next/image";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import Link from "next/link";

interface CandidateCardProps {
  name: string;
  imageUrl: string;
  reason: string;
  upvotes: number;
  downvotes: number;
  onVote: (voteType: "upvote" | "downvote") => void; // 親から渡される投票処理
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
      <div className="text-sm text-zinc-500 flex items-center gap-2">
        <button
          onClick={() => onVote("upvote")}
          className="mr-2 text-green-500 hover:text-green-700 flex items-center gap-1"
          aria-label="いいね"
        >
          <ThumbsUp size={20} /> {upvotes}
        </button>
        <button
          onClick={() => onVote("downvote")}
          className="text-red-500 hover:text-red-700 flex items-center gap-1"
          aria-label="よくないね"
        >
          <ThumbsDown size={20} /> {downvotes}
        </button>
      </div>
    </li>
  );
}