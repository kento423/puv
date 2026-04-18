"use client";
import { useState } from "react";
import { getUserId } from "@/lib/userId";
import PokemonSelector from "./PokemonSelector";

interface BugReportFormProps {
  pokemons: { id: number; nameJa: string; nameEn: string; imageUrl: string | null; battleStyle: string }[];
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function BugReportForm({ pokemons, onSuccess, onCancel }: BugReportFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("system"); // system, pokemon, item, other
  const [pokemonId, setPokemonId] = useState("");
  const [severity, setSeverity] = useState("normal"); // critical, normal, minor
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("タイトルを入力してください");
    if (category === "pokemon" && !pokemonId) return alert("ポケモン関連の場合はポケモンを選択してください");
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          pokemonId: pokemonId || null,
          severity,
          guestId: getUserId(),
        }),
      });

      if (!res.ok) throw new Error("Post failed");
      if (onSuccess) onSuccess();
      
      // reset
      setTitle("");
      setDescription("");
      setCategory("system");
      setPokemonId("");
      setSeverity("normal");
    } catch (err) {
      alert("投稿に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg font-bold mb-4 dark:text-white text-gray-900 border-b pb-2 dark:border-gray-700">
        バグ・不具合を報告
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
            placeholder="例) 〇〇の技のダメージが反映されない"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              カテゴリ <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={e => {
                setCategory(e.target.value);
                if (e.target.value !== "pokemon") setPokemonId("");
              }}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
            >
              <option value="system">システム (切断, 表示バグ等)</option>
              <option value="pokemon">ポケモン (技, 通常攻撃等)</option>
              <option value="item">もちもの/バトルアイテム</option>
              <option value="other">その他</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              深刻度
            </label>
            <select
              value={severity}
              onChange={e => setSeverity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
            >
              <option value="normal">通常 (ゲームプレイは可能)</option>
              <option value="critical">致命的 (進行不能, クラッシュ)</option>
              <option value="minor">軽微 (UIズレなど)</option>
            </select>
          </div>
        </div>

        {category === "pokemon" && (
          <PokemonSelector 
            pokemons={pokemons}
            selectedId={pokemonId}
            onSelect={(id) => setPokemonId(id)}
            label="対象のポケモン"
            required
          />
        )}

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            詳細
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[100px] dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
            placeholder="発生条件、環境(Switch/スマホ)などを詳しく"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button type="submit" disabled={isSubmitting} className="flex-1 bg-purple-600 text-white font-bold py-2.5 rounded-lg hover:bg-purple-700 active:scale-95 transition-all">
          {isSubmitting ? "送信中..." : "報告する"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200">
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
}
