"use client";

import { useEffect, useState, useCallback } from "react";
import CandidateCardList from "@/components/CandidateCardList";
import { getUserId } from "@/lib/userId";
import { Target, AlertCircle } from "lucide-react";

interface ReverseCounter {
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

  // reasonとcounterType編集処理
  const handleEditReason = async (
    counterId: number,
    newReason: string,
    newCounterType?: "hard" | "soft" | null
  ): Promise<void> => {
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
      <div className="flex flex-col items-center justify-center p-10 md:p-14 text-center bg-red-50/50 dark:bg-red-900/10 rounded-3xl border border-dashed border-red-200 dark:border-red-800/30">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
          データの読み込みに失敗しました
        </h3>
        <p className="text-sm text-red-500 dark:text-red-400 max-w-sm">
          システムエラーが発生したか、通信状況が不安定な可能性があります。時間をおいて再度お試しください。
        </p>
      </div>
    );
  }

  if (counters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 md:p-14 text-center bg-white/50 dark:bg-gray-800/40 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-sm">
        <div className="w-16 h-16 mb-5 rounded-2xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center shadow-inner">
          <Target className="w-8 h-8 text-purple-500 dark:text-purple-400" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          有利な対面データがありません
        </h3>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-sm">
          このポケモンが有利に戦える相手の情報はまだ投稿されていません。
        </p>
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
