"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CandidateCard from "@/components/CandidateCard";
import InputCandidateCard from "@/components/InputCandidateCard";
import { useEffect, useState } from "react";

interface Counter {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  reason: string;
  upvotes: number;
  downvotes: number;
}

interface PokemonData {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  counters: Counter[];
}

interface PokemonMaster {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
}

export default function PokemonPage() {
  const params = useParams();
  const { slug } = params;

  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [pokemonMaster, setPokemonMaster] = useState<PokemonMaster[]>([]);
  const [newCounter, setNewCounter] = useState({
    selectedPokemonId: "",
    reason: "",
  });
  const [showForm, setShowForm] = useState(false); // フォームの表示状態
  const locale = "ja";

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch(`/api/pokemon/${slug}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPokemonData(data);
      }
    }
    fetchPokemon();
  }, [slug]);

  useEffect(() => {
    async function fetchCounters() {
      const res = await fetch(`/api/pokemon/${slug}/counters`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setCounters(data);
      }
    }
    fetchCounters();
  }, [slug]);

  useEffect(() => {
    async function fetchPokemonMaster() {
      const res = await fetch(`/api/pokemon?excludeSlug=${slug}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPokemonMaster(data);
      }
    }

    // 初回ロード時には呼び出さない
    if (showForm) {
      fetchPokemonMaster();
    }
  }, [slug, showForm]);

  const handleAddCounter = async () => {
    const selectedPokemon = pokemonMaster.find(
      (pokemon) => pokemon.id.toString() === newCounter.selectedPokemonId
    );

    if (!selectedPokemon) return;

    const newCounterData = {
      selectedPokemonId: newCounter.selectedPokemonId,
      reason: newCounter.reason,
    };

    // ローカルステートを更新
    setCounters([
      ...counters,
      {
      id: parseInt(newCounter.selectedPokemonId, 10), // セレクトボックスで選択されたポケモンのidを設定
      nameJa: selectedPokemon.nameJa,
      nameEn: selectedPokemon.nameEn,
      imageUrl: selectedPokemon.imageUrl,
      reason: newCounter.reason,
      upvotes: 0,
      downvotes: 0,
      },
    ]);
    setNewCounter({ selectedPokemonId: "", reason: "" });
    setShowForm(false);

    // API にデータを送信
    await fetch(`/api/pokemon/${slug}/counters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCounterData),
    });
  };

  const handleCancel = () => {
    setNewCounter({ selectedPokemonId: "", reason: "" });
    setShowForm(false);
  };

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Image
          src={pokemonData.imageUrl}
          alt={locale === "ja" ? pokemonData.nameJa : pokemonData.nameEn}
          width={120}
          height={120}
          className="mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {locale === "ja" ? pokemonData.nameJa : pokemonData.nameEn}
          </h1>
          <p className="text-gray-600">このポケモンのカウンターは……</p>
        </div>
      </div>

      <ul className="space-y-4">
        {counters.map((counter) => (
          <CandidateCard
            key={counter.id}
            name={locale === "ja" ? counter.nameJa : counter.nameEn}
            imageUrl={counter.imageUrl}
            reason={counter.reason}
            upvotes={counter.upvotes}
            downvotes={counter.downvotes}
            onVote={async (voteType) => {
              const res = await fetch(`/api/pokemon/vote`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  targetPokemonId: pokemonData?.id,
                  counterPokemonId: counter.id,
                  voteType,
                }),
              });

              if (res.ok) {
                const updatedCounter = await res.json();
                setCounters((prevCounters) =>
                  prevCounters.map((c) =>
                    c.id === counter.id
                      ? { ...c, upvotes: updatedCounter.upvotes, downvotes: updatedCounter.downvotes }
                      : c
                  )
                );
              }
            }}
          />
        ))}
      </ul>

      <div className="mt-8">
        {!showForm ? (
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ＋ カウンターを追加する
          </button>
        ) : (
          <InputCandidateCard
            pokemonMaster={pokemonMaster}
            newCounter={newCounter}
            setNewCounter={setNewCounter}
            handleAddCounter={handleAddCounter}
            handleCancel={handleCancel}
            locale={locale}
          />
        )}
      </div>

      <div className="mt-8">
        <Link
          href="/pokemon"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 一覧に戻る
        </Link>
      </div>
    </div>
  );
}
