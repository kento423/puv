"use client";
import { useState } from "react";
import Image from "next/image";
import { getUserId } from "@/lib/userId";
import { Shield, Target } from "lucide-react";
import PokemonSelector from "./PokemonSelector";

interface BanPickFormProps {
  pokemons: { id: number; nameJa: string; nameEn: string; imageUrl: string | null; battleStyle: string }[];
  onSuccess?: () => void;
  onCancel?: () => void;
  defaultSide?: string;
}

export default function BanPickForm({ pokemons, onSuccess, onCancel, defaultSide = "first" }: BanPickFormProps) {
  const [pokemonId, setPokemonId] = useState("");
  const [side, setSide] = useState(defaultSide);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pokemonId) return alert("ポケモンを選択してください");
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/ban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pokemonId,
          side,
          reason,
          guestId: getUserId(),
        }),
      });

      if (!res.ok) throw new Error("Post failed");
      if (onSuccess) onSuccess();
      setPokemonId("");
      setReason("");
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
        BAN候補を提案
      </h3>
      
      <div className="space-y-4">
        <div className="flex border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900/50">
          <button
            type="button"
            onClick={() => setSide("first")}
            className={`flex-1 py-3 text-sm flex items-center justify-center gap-2 font-bold transition-colors ${
              side === "first" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Shield size={16} />先攻BAN
          </button>
          <button
            type="button"
            onClick={() => setSide("second")}
            className={`flex-1 py-3 text-sm flex items-center justify-center gap-2 font-bold transition-colors ${
              side === "second" ? "bg-red-600 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Target size={16} />後攻BAN
          </button>
        </div>

        <PokemonSelector 
          pokemons={pokemons}
          selectedId={pokemonId}
          onSelect={(id) => setPokemonId(id)}
          required
        />

        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            理由（任意）
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[80px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="なぜBANすべきか"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-purple-600 text-white font-bold py-2.5 rounded-lg hover:bg-purple-700 active:scale-95 transition-all shadow-sm"
        >
          {isSubmitting ? "提案中..." : "提案する"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
}
