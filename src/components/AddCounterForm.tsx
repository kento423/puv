"use client";
import { useState, useEffect } from "react";
import InputCandidateCard from "@/components/InputCandidateCard";

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
}

export default function AddCounterForm({ slug, locale }: AddCounterFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [pokemonMaster, setPokemonMaster] = useState<PokemonMaster[]>([]);
  const [newCounter, setNewCounter] = useState({ selectedPokemonId: "", reason: "" });

  useEffect(() => {
    if (!showForm) return;
    async function fetchPokemonMaster() {
      const res = await fetch(`/api/pokemon?excludeSlug=${slug}`);
      if (res.ok) {
        setPokemonMaster(await res.json());
      }
    }
    fetchPokemonMaster();
  }, [slug, showForm]);

  const handleAddCounter = async () => {
    const selectedPokemon = pokemonMaster.find(
      (pokemon) => pokemon.id.toString() === newCounter.selectedPokemonId
    );
    if (!selectedPokemon) return;
    await fetch(`/api/pokemon/${slug}/counters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedPokemonId: newCounter.selectedPokemonId,
        reason: newCounter.reason,
      }),
    });
    setNewCounter({ selectedPokemonId: "", reason: "" });
    setShowForm(false);
  };

  const handleCancel = () => {
    setNewCounter({ selectedPokemonId: "", reason: "" });
    setShowForm(false);
  };

  return !showForm ? (
    <button
      onClick={() => setShowForm(true)}
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
  );
}
