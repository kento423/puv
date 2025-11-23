"use client";
import CandidateCard from "@/components/CandidateCard";
import { getUserId } from "@/lib/userId";

interface Counter {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  reason: string;
  upvotes: number;
  downvotes: number;
  slug: string; // 追加: slugプロパティをCounterインターフェースに追加
}

interface CandidateCardListProps {
  counters: Counter[];
  targetPokemonId: number;
  locale: string;
  onVoted?: () => void;
}

export default function CandidateCardList({ counters, targetPokemonId, locale, onVoted }: CandidateCardListProps) {
  const handleVote = async (counterId: number, voteType: "upvote" | "downvote"): Promise<void> => {
    const userId = getUserId();
    const res = await fetch("/api/pokemon/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetPokemonId,
        counterPokemonId: counterId,
        voteType,
        userId,
      }),
    });
    
    if (!res.ok) {
      const error = await res.json();
      if (res.status === 409) {
        alert("このカウンターには既に投票済みです");
      } else {
        alert("投票に失敗しました");
      }
      throw new Error("投票に失敗しました");
    }
    
    if (onVoted) onVoted();
  };

  return (
    <ul className="space-y-4">
      {counters.map((counter) => (
        <CandidateCard
          key={counter.id}
          name={locale === "ja" ? counter.nameJa : counter.nameEn}
          imageUrl={counter.imageUrl}
          reason={counter.reason}
          upvotes={counter.upvotes}
          downvotes={counter.downvotes}
          onVote={(voteType: "upvote" | "downvote") => handleVote(counter.id, voteType)}
          slug={counter.slug} // 追加: カウンターポケモンのslugを渡す
        />
      ))}
    </ul>
  );
}
