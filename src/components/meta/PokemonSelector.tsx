"use client";
import { Combobox } from "@/components/Combobox";
import { useState, useMemo } from "react";
import { getBattleStyleShortLabel, getBattleStyleColor } from "@/lib/pokemon-utils";

interface PokemonSelectorProps {
  pokemons: {
    id: number;
    nameJa: string;
    nameEn: string;
    imageUrl: string | null;
    battleStyle: string;
  }[];
  selectedId: string;
  onSelect: (id: string) => void;
  label?: string;
  required?: boolean;
}

export default function PokemonSelector({
  pokemons,
  selectedId,
  onSelect,
  label = "ポケモン",
  required = false
}: PokemonSelectorProps) {
  const [selectedBattleStyle, setSelectedBattleStyle] = useState<string>("all");

  const filteredPokemons = useMemo(() => {
    if (selectedBattleStyle === "all") return pokemons;
    return pokemons.filter((p) => p.battleStyle === selectedBattleStyle);
  }, [pokemons, selectedBattleStyle]);

  const availableStyles = useMemo(() => {
    return Array.from(new Set(pokemons.map((p) => p.battleStyle))).sort();
  }, [pokemons]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          型で絞り込み (任意)
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedBattleStyle("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              selectedBattleStyle === "all"
                ? "bg-gray-800 text-white border-gray-800 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-200"
                : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            }`}
          >
            すべて
          </button>
          {availableStyles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setSelectedBattleStyle(style)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${getBattleStyleColor(style, selectedBattleStyle === style)}`}
            >
              {getBattleStyleShortLabel(style)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Combobox
          items={filteredPokemons}
          selectedValue={selectedId}
          onSelect={onSelect}
          placeholder="ポケモンを選択..."
          itemLabel={(item) => item.nameJa}
          itemValue={(item) => item.id.toString()}
          className="w-full"
        />
      </div>
    </div>
  );
}
