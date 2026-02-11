"use client";

import { useEffect, useState, useCallback } from "react";
import CandidateCardList from "@/components/CandidateCardList";
import { getUserId } from "@/lib/userId";

interface ReverseCounter {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  reason: string;
  upvotes: number;
  downvotes: number;
  slug: string;
}

interface ReverseCounterListProps {
  slug: string;
}

export default function ReverseCounterList({ slug }: ReverseCounterListProps) {
  const [counters, setCounters] = useState<ReverseCounter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = "ja";

  // 逆向きカウンター一覧を取得
  const fetchReverseCounters = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/pokemon/${slug}/reverse-counters`);
      if (res.ok) {
        setCounters(await res.json());
      } else {
        setError("逆向きカウンターの取得に失敗しました");
      }
    } catch (error) {
      console.error("Error fetching reverse counters:", error);
      setError("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  // 投票処理
  const handleVote = async (
    counterId: number,
    voteType: "upvote" | "downvote"
  ): Promise<void> => {
    const userId = getUserId();
    const targetCounterData = counters.find((c) => c.id === counterId);
    if (!targetCounterData) return;

    // targetPokemonId と counterPokemonId を逆にしてクエリする
    // 逆向きカウンターなので、元のcounterPokemonIdが対象ポケモンになる
    const counterSlug = slug; // 現在のポケモン（対象）
    const targetCounterSlug = targetCounterData.slug; // このポケモンを対策するポケモン

    const targetPokemon = await (
      await fetch(`/api/pokemon/${targetCounterSlug}`)
    ).json();
    const responsePokemon = await (
      await fetch(`/api/pokemon/${counterSlug}`)
    ).json();

    const res = await fetch("/api/pokemon/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetPokemonId: targetPokemon.id,
        counterPokemonId: responsePokemon.id,
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

    await fetchReverseCounters();
  };

  // reason編集処理
  const handleEditReason = async (
    counterId: number,
    newReason: string
  ): Promise<void> => {
    const res = await fetch("/api/pokemon/counter", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        counterId,
        reason: newReason,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`reason編集に失敗しました: ${error.error}`);
    }

    await fetchReverseCounters();
  };

  useEffect(() => {
    fetchReverseCounters();
  }, [fetchReverseCounters]);

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        読み込み中...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (counters.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        対策できる相手がいません
      </div>
    );
  }

  const sortedCounters = [...counters].sort(
    (a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
  );

  return (
    <CandidateCardList
      counters={sortedCounters}
      locale={locale}
      onVote={handleVote}
      onEditReason={handleEditReason}
    />
  );
}
