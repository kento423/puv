"use client";
import { useState } from "react";
import Image from "next/image";
import { getUserId } from "@/lib/userId";
import PokemonSelector from "./PokemonSelector";

interface MetaPostFormProps {
  pokemons: { id: number; nameJa: string; nameEn: string; imageUrl: string | null; battleStyle: string }[];
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function MetaPostForm({ pokemons, onSuccess, onCancel }: MetaPostFormProps) {
  const [pokemonId, setPokemonId] = useState("");
  const [tier, setTier] = useState("op");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pokemonId) return alert("ポケモンを選択してください");
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pokemonId,
          tier,
          reason,
          guestId: getUserId(),
        }),
      });

      if (!res.ok) throw new Error("Post failed");
      if (onSuccess) onSuccess();
      setPokemonId("");
      setReason("");
      setTier("op");
    } catch (err) {
      alert("投稿に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPokemon = pokemons.find(p => p.id.toString() === pokemonId);

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold mb-4 dark:text-white text-gray-900 border-b pb-2 dark:border-gray-700">
        環境での強いポケモンを共有
      </h3>
      
      <div className="space-y-4">
        <PokemonSelector 
          pokemons={pokemons}
          selectedId={pokemonId}
          onSelect={(id) => setPokemonId(id)}
          required
        />

        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            評価（ティア）
          </label>
          <div className="flex gap-2">
            {[
              { id: 'op', label: 'OP (覇権)', color: 'red' },
              { id: 'strong', label: '強い', color: 'orange' },
              { id: 'rising', label: '注目枠', color: 'yellow' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                className={`flex-1 py-2 px-2 text-sm font-bold rounded-lg border transition-all ${
                  tier === t.id
                    ? `bg-${t.color}-100 border-${t.color}-500 text-${t.color}-800 dark:bg-${t.color}-900/40 dark:text-${t.color}-200`
                    : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            理由（任意）
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary min-h-[80px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="どう強いのか、どんな構成で活きるか等"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-brand-primary text-white font-bold py-2.5 rounded-lg hover:bg-purple-700 active:scale-95 transition-all shadow-sm"
        >
          {isSubmitting ? "投稿中..." : "投稿する"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
}
