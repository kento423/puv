"use client";
import { useEffect, useState, useCallback } from "react";
import CandidateCardList from "@/components/CandidateCardList";
import AddCounterForm from "./components/AddCounterForm";
import PokemonTabs from "./components/PokemonTabs";
import ReverseCounterList from "./components/ReverseCounterList";
import StatRadarChartTab from "./components/StatRadarChartTab";
import { getUserId } from "@/lib/userId";
import { Swords } from "lucide-react";

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
        guestId: getUserId(),
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`編集に失敗しました: ${error.error}`);
    }

    await fetchCounters();
  };

  // カウンター削除処理
  const handleDeleteCounter = async (counterId: number): Promise<void> => {
    if (!confirm("本当にこの対策を削除しますか？")) return;
    
    const guestId = getUserId();
    const res = await fetch(`/api/pokemon/counter?counterId=${counterId}&guestId=${guestId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const error = await res.json();
      alert(`削除に失敗しました: ${error.error}`);
      return;
    }

    await fetchCounters();
  };

  useEffect(() => {
    // 初期表示はサーバーから渡された initialCounters を使用するため、
    // マウント時の fetchCounters は冗長につき削除
  }, []);

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
              {sortedCounters.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-10 md:p-14 text-center bg-white/50 dark:bg-gray-800/40 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-sm">
                  <div className="w-16 h-16 mb-5 rounded-2xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center shadow-inner">
                    <Swords className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    まだ対策が投稿されていません
                  </h3>
                  <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-sm">
                    最初の対策を投稿して、コミュニティにあなたの知見を共有しましょう！
                  </p>
                </div>
              ) : (
                <CandidateCardList
                  counters={sortedCounters}
                  locale={locale}
                  onVote={handleVote}
                  onEditReason={handleEditReason}
                  onDelete={handleDeleteCounter}
                />
              )}
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
