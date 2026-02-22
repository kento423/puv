"use client";
import { useEffect, useState, useCallback } from "react";
import CandidateCardList from "@/components/CandidateCardList";
import AddCounterForm from "./components/AddCounterForm";
import PokemonTabs from "./components/PokemonTabs";
import ReverseCounterList from "./components/ReverseCounterList";
import StatRadarChartTab from "./components/StatRadarChartTab";
import { getUserId } from "@/lib/userId";

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
}

export default function PokemonPageClient({ pokemonId, slug, pokemonName, initialCounters }: { pokemonId: number, slug: string, pokemonName: string, initialCounters: Counter[] }) {
  const [counters, setCounters] = useState<Counter[]>(initialCounters);
  const locale = "ja";

  // カウンター一覧を取得
  const fetchCounters = useCallback(async () => {
    try {
      const res = await fetch(`/api/pokemon/${slug}/counters`);
      if (res.ok) {
        setCounters(await res.json());
      }
    } catch (error) {
      console.error("Error fetching counters:", error);
    }
  }, [slug]);

  // 投票処理
  const handleVote = async (counterId: number, voteType: "upvote" | "downvote"): Promise<void> => {
    const userId = getUserId();
    const res = await fetch("/api/pokemon/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetPokemonId: pokemonId,
        counterPokemonId: counterId,
        voteType,
        userId,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      if (res.status === 409) {
        throw new Error("このカウンターには既に投票済みです");
      }
      throw new Error("投票に失敗しました");
    }

    await fetchCounters();
  };

  // reason・counterType編集処理
  const handleEditReason = async (counterId: number, newReason: string, newCounterType?: "hard" | "soft" | null): Promise<void> => {
    const res = await fetch("/api/pokemon/counter", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        counterId,
        reason: newReason,
        counterType: newCounterType,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`編集に失敗しました: ${error.error}`);
    }

    await fetchCounters();
  };

  useEffect(() => {
    fetchCounters();
  }, [fetchCounters]);

  const sortedCounters = [...counters].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));

  return (
    <PokemonTabs
      pokemonId={pokemonId}
      slug={slug}
      pokemonName={pokemonName}
      children={{
        counters: (
          <>
            <div className="mb-6 md:mb-8">
              <CandidateCardList
                counters={sortedCounters}
                locale={locale}
                onVote={handleVote}
                onEditReason={handleEditReason}
              />
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <AddCounterForm slug={slug} locale={locale} onAdded={fetchCounters} />
            </div>
          </>
        ),
        counteredBy: <ReverseCounterList slug={slug} />,
        stats: <StatRadarChartTab slug={slug} />,
      }}
    />
  );
}
