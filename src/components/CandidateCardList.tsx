"use client";
import CandidateCard from "@/components/CandidateCard";

interface Counter {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  reason: string;
  upvotes: number;
  downvotes: number;
}

interface CandidateCardListProps {
  counters: Counter[];
  targetPokemonId: number;
  locale: string;
  onVoted?: () => void;
}

export default function CandidateCardList({ counters, targetPokemonId, locale, onVoted }: CandidateCardListProps) {
  const handleVote = async (counterId: number, voteType: "upvote" | "downvote") => {
    const res = await fetch("/api/pokemon/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetPokemonId,
        counterPokemonId: counterId,
        voteType,
      }),
    });
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
        />
      ))}
    </ul>
  );
}
