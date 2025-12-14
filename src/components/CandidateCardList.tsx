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
  slug: string;
}

interface CandidateCardListProps {
  counters: Counter[];
  locale: string;
  onVote: (counterId: number, voteType: "upvote" | "downvote") => Promise<void>;
  onEditReason: (counterId: number, newReason: string) => Promise<void>;
}

export default function CandidateCardList({ 
  counters, 
  locale, 
  onVote, 
  onEditReason 
}: CandidateCardListProps) {
  return (
    <ul className="space-y-3 md:space-y-4">
      {counters.map((counter) => (
        <CandidateCard
          key={counter.id}
          name={locale === "ja" ? counter.nameJa : counter.nameEn}
          imageUrl={counter.imageUrl}
          reason={counter.reason}
          upvotes={counter.upvotes}
          downvotes={counter.downvotes}
          slug={counter.slug}
          onVote={(voteType: "upvote" | "downvote") => onVote(counter.id, voteType)}
          onEditReason={(newReason: string) => onEditReason(counter.id, newReason)}
        />
      ))}
    </ul>
  );
}
