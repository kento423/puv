"use client";
import { Combobox } from "@/components/Combobox";
import { useEffect, useRef, useState, useMemo } from "react";
import { Swords, Target } from "lucide-react";
import { getBattleStyleShortLabel, getBattleStyleColor } from "@/lib/pokemon-utils";

interface InputCandidateCardProps {
  pokemonMaster: {
    id: number;
    nameJa: string;
    nameEn: string;
    imageUrl: string;
    battleStyle: string;
  }[];
  newCounter: {
    selectedPokemonId: string;
    reason: string;
    counterType?: "hard" | "soft" | null;
  };
  setNewCounter: (value: { selectedPokemonId: string; reason: string; counterType?: "hard" | "soft" | null }) => void;
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedBattleStyle, setSelectedBattleStyle] = useState<string>("all");

  // selectedBattleStyle に基づいて、Combobox に渡す候補をフィルタリング
  const filteredPokemonMaster = useMemo(() => {
    if (selectedBattleStyle === "all") return pokemonMaster;
    return pokemonMaster.filter((p) => p.battleStyle === selectedBattleStyle);
  }, [pokemonMaster, selectedBattleStyle]);

  // マスターデータから利用可能なバトルスタイルのリストを抽出
  const availableBattleStyles = useMemo(() => {
    return Array.from(new Set(pokemonMaster.map((p) => p.battleStyle))).sort();
  }, [pokemonMaster]);



  // ビューポートをリセット（モバイルのキーボードズーム＆スクロール位置対策）
  const resetViewport = () => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        // Zoom level をリセット
        document.documentElement.style.zoom = "1";
        // スクロール位置をリセット
        window.scrollTo({ top: 0, behavior: "smooth" });
        // 入力フォーカスを外す（iOS で UI が再計算される）
        textareaRef.current?.blur();
      }, 50);
    }
  };

  // フォーム送信時にスクロール位置をリセット
  const handleSubmit = () => {
    handleAddCounter();
    resetViewport();
  };

  // キャンセル時にスクロール位置をリセット
  const handleCancelWithReset = () => {
    handleCancel();
    resetViewport();
  };

  // Escapeキーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCancelWithReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCancel]);

  return (
    <div className="flex flex-col p-4 md:p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4 dark:bg-gray-800 bg-white shadow-sm">
      <div className="space-y-4">
        {/* バトルスタイル絞り込み */}
        <div className="space-y-2">
          <label className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
            型で絞り込み (任意)
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedBattleStyle("all")}
              className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors border ${selectedBattleStyle === "all"
                ? "bg-gray-800 text-white border-gray-800 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-200"
                : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                }`}
            >
              すべて
            </button>
            {availableBattleStyles.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedBattleStyle(style)}
                className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors border ${getBattleStyleColor(style, selectedBattleStyle === style)}`}
              >
                {getBattleStyleShortLabel(style)}
              </button>
            ))}
          </div>
        </div>

        {/* ポケモン選択 */}
        <div className="space-y-2">
          <label className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
            ポケモンを選択 <span className="text-red-500">*</span>
          </label>
          <Combobox
            items={filteredPokemonMaster}
            selectedValue={newCounter.selectedPokemonId}
            onSelect={(value) =>
              setNewCounter({ ...newCounter, selectedPokemonId: value })
            }
            placeholder="ポケモンを選択..."
            itemLabel={(item) => (locale === "ja" ? item.nameJa : item.nameEn)}
            itemValue={(item) => item.id.toString()}
            className="w-full"
          />
        </div>
      </div>

      {/* カウンタータイプ選択 */}
      <div className="space-y-2">
        <label className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
          カウンターの種類 (任意)
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setNewCounter({ ...newCounter, counterType: newCounter.counterType === "hard" ? null : "hard" })}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors border ${newCounter.counterType === "hard"
              ? "bg-brand-accent text-white border-brand-accent dark:bg-orange-600 dark:border-orange-600"
              : "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/50 dark:hover:bg-orange-900/40"
              }`}
          >
            <Swords size={16} /> ハードカウンター
          </button>
          <button
            onClick={() => setNewCounter({ ...newCounter, counterType: newCounter.counterType === "soft" ? null : "soft" })}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors border ${newCounter.counterType === "soft"
              ? "bg-brand-primary text-white border-brand-primary dark:bg-brand-primary dark:border-brand-primary"
              : "bg-purple-50 text-brand-primary border-purple-200 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/50 dark:hover:bg-purple-900/40"
              }`}
          >
            <Target size={16} /> ソフトカウンター
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
          理由（対策方法など） (任意)
        </label>
        <textarea
          ref={textareaRef}
          placeholder="このポケモンが有効な理由や対策方法を入力してください"
          value={newCounter.reason}
          onChange={(e) =>
            setNewCounter({ ...newCounter, reason: e.target.value })
          }
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleCancelWithReset();
            }
          }}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg min-h-24 focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-primary text-sm md:text-base"
        />
      </div>

      <div className="flex gap-2 flex-col-reverse md:flex-row pt-2">
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-2.5 md:py-2 bg-brand-primary text-white rounded-lg hover:opacity-90 active:scale-95 transition-all font-medium text-sm md:text-base"
        >
          追加
        </button>
        <button
          onClick={handleCancelWithReset}
          className="flex-1 px-4 py-2.5 md:py-2 bg-gray-400 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700 active:scale-95 transition-all font-medium text-sm md:text-base"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
