"use client";
import CandidateCard from "@/components/CandidateCard";

interface Counter {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  reason: string;
  counterType?: "hard" | "soft" | null;
  upvotes: number;
  downvotes: number;
  slug: string;
  userId: string | null;
  guestId: string | null;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
}

interface CandidateCardListProps {
  counters: Counter[];
  locale: string;
  onVote: (counterId: number, voteType: "upvote" | "downvote") => Promise<void>;
  onEditReason: (counterId: number, newReason: string, newCounterType?: "hard" | "soft" | null) => Promise<void>;
  onDelete?: (counterId: number) => Promise<void> | void;
}

export default function CandidateCardList({
  counters,
  locale,
  onVote,
  onEditReason,
  onDelete
}: CandidateCardListProps) {
  return (
    <ul className="space-y-3 md:space-y-4">
      {counters.map((counter) => (
        <CandidateCard
          key={counter.id}
          name={locale === "ja" ? counter.nameJa : counter.nameEn}
          imageUrl={counter.imageUrl}
          reason={counter.reason}
          counterType={counter.counterType}
          upvotes={counter.upvotes}
          downvotes={counter.downvotes}
          slug={counter.slug}
          userId={counter.userId}
          guestId={counter.guestId}
          user={counter.user}
          onVote={(voteType: "upvote" | "downvote") => onVote(counter.id, voteType)}
          onEditReason={(newReason: string, newCounterType?: "hard" | "soft" | null) => onEditReason(counter.id, newReason, newCounterType)}
          onDelete={() => onDelete ? onDelete(counter.id) : undefined}
        />
      ))}
    </ul>
  );
}
