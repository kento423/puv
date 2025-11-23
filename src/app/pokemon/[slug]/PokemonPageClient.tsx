"use client";
import { useEffect, useState } from "react";
import CandidateCardList from "@/components/CandidateCardList";
import AddCounterForm from "@/components/AddCounterForm";

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

export default function PokemonPageClient({ pokemonId, slug }: { pokemonId: number, slug: string }) {
  const [counters, setCounters] = useState<Counter[]>([]);
  const locale = "ja";

  useEffect(() => {
    async function fetchCounters() {
      const res = await fetch(`/api/pokemon/${slug}/counters`);
      if (res.ok) setCounters(await res.json());
    }
    fetchCounters();
  }, [slug]);

  const sortedCounters = [...counters].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));

  const handleVoted = async () => {
    const res = await fetch(`/api/pokemon/${slug}/counters`);
    if (res.ok) setCounters(await res.json());
  };

  return (
    <>
      <CandidateCardList
        counters={sortedCounters}
        targetPokemonId={pokemonId}
        locale={locale}
        onVoted={handleVoted}
      />
      <div className="mt-8">
        <AddCounterForm slug={slug} locale={locale} />
      </div>
    </>
  );
}
