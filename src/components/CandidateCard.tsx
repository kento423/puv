import Image from "next/image";

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
}: CandidateCardProps) {
  return (
    <li className="flex gap-4 items-center p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900">
      <Image
        src={imageUrl}
        alt={name}
        width={64}
        height={64}
        className="rounded-full"
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{reason}</p>
      </div>
      <div className="text-sm text-zinc-500">
        <button
          onClick={() => onVote("upvote")}
          className="mr-2 text-green-500 hover:text-green-700"
        >
          👍 {upvotes}
        </button>
        <button
          onClick={() => onVote("downvote")}
          className="text-red-500 hover:text-red-700"
        >
          👎 {downvotes}
        </button>
      </div>
    </li>
  );
}