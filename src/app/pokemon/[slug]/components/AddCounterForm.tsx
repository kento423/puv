"use client";
import { useState, useEffect } from "react";
import InputCandidateCard from "./InputCandidateCard";

interface PokemonMaster {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
}

interface AddCounterFormProps {
  slug: string;
  locale: string;
  onAdded?: () => void;
}

export default function AddCounterForm({ slug, locale, onAdded }: AddCounterFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [pokemonMaster, setPokemonMaster] = useState<PokemonMaster[]>([]);
  const [newCounter, setNewCounter] = useState({ selectedPokemonId: "", reason: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!showForm) return;
    
    async function fetchPokemonMaster() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/pokemon?excludeSlug=${slug}`);
        if (res.ok) {
          setPokemonMaster(await res.json());
        } else {
          setError("ポケモン一覧の取得に失敗しました");
        }
      } catch (err) {
        console.error("Failed to fetch pokemon master:", err);
        setError("ポケモン一覧の取得中にエラーが発生しました");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPokemonMaster();
  }, [slug, showForm]);

  const handleAddCounter = async () => {
    const selectedPokemon = pokemonMaster.find(
      (pokemon) => pokemon.id.toString() === newCounter.selectedPokemonId
    );
    if (!selectedPokemon) {
      setError("ポケモンを選択してください");
      return;
    }

    if (!newCounter.reason.trim()) {
      setError("理由を入力してください");
      return;
    }

    try {
      const res = await fetch(`/api/pokemon/${slug}/counters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedPokemonId: newCounter.selectedPokemonId,
          reason: newCounter.reason,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "カウンターの追加に失敗しました");
      }

      setNewCounter({ selectedPokemonId: "", reason: "" });
      setShowForm(false);
      setError(null);
      if (onAdded) onAdded();
    } catch (err) {
      const message = err instanceof Error ? err.message : "エラーが発生しました";
      console.error("Failed to add counter:", err);
      setError(message);
    }
  };

  const handleCancel = () => {
    setNewCounter({ selectedPokemonId: "", reason: "" });
    setShowForm(false);
    setError(null);
  };

  return !showForm ? (
    <button
      onClick={() => setShowForm(true)}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
    >
      ＋ カウンターを追加する
    </button>
  ) : (
    <>
      {error && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded dark:bg-red-900 dark:text-red-100">
          {error}
        </div>
      )}
      {isLoading ? (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          読み込み中...
        </div>
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
    </>
  );
}
