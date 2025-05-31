import Image from "next/image";

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
      <select
        value={newCounter.selectedPokemonId}
        onChange={(e) =>
          setNewCounter({ ...newCounter, selectedPokemonId: e.target.value })
        }
        className="w-full p-2 border rounded"
      >
        <option value="">ポケモンを選択してください</option>
        {pokemonMaster.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.id}>
            {locale === "ja" ? pokemon.nameJa : pokemon.nameEn}
          </option>
        ))}
      </select>
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