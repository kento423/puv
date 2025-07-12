import Image from "next/image";
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
    <div className="flex flex-col p-4 border rounded space-y-4">
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
      <textarea
        placeholder="理由"
        value={newCounter.reason}
        onChange={(e) =>
          setNewCounter({ ...newCounter, reason: e.target.value })
        }
        className="w-full p-2 border rounded"
      />
      <div className="flex justify-between">
        <button
          onClick={handleAddCounter}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          追加
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}