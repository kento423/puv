"use client";
import { Combobox } from "@/components/Combobox";

interface InputCandidateCardProps {
  pokemonMaster: {
    id: number;
    nameJa: string;
    nameEn: string;
    imageUrl: string;
  }[];
  newCounter: {
    selectedPokemonId: string;
    reason: string;
  };
  setNewCounter: (value: { selectedPokemonId: string; reason: string }) => void;
  handleAddCounter: () => void;
  handleCancel: () => void;
  locale: string;
}

export default function InputCandidateCard({
  pokemonMaster,
  newCounter,
  setNewCounter,
  handleAddCounter,
  handleCancel,
  locale,
}: InputCandidateCardProps) {
  return (
    <div className="flex flex-col p-4 border rounded space-y-4 dark:border-gray-600 dark:bg-gray-800">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          ポケモンを選択
        </label>
        <Combobox
          items={pokemonMaster}
          selectedValue={newCounter.selectedPokemonId}
          onSelect={(value) =>
            setNewCounter({ ...newCounter, selectedPokemonId: value })
          }
          placeholder="ポケモンを選択してください"
          itemLabel={(item) => (locale === "ja" ? item.nameJa : item.nameEn)}
          itemValue={(item) => item.id.toString()}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          理由（対策方法など）
        </label>
        <textarea
          placeholder="このポケモンが有効な理由や対策方法を入力してください"
          value={newCounter.reason}
          onChange={(e) =>
            setNewCounter({ ...newCounter, reason: e.target.value })
          }
          className="w-full p-2 border rounded min-h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-600"
        />
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={handleAddCounter}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
        >
          追加
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 transition"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
