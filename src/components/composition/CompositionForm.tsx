"use client";
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Plus, X, MapPin, AlertCircle, Check } from "lucide-react";
import { getUserId } from "@/lib/userId";
import { getBattleStyleShortLabel, getBattleStyleColor } from "@/lib/pokemon-utils";
import { Combobox } from "@/components/Combobox";

interface PokemonOption {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string | null;
  battleStyle: string;
}

interface SlotData {
  pokemonId: string;
  lane: string;
}

interface CompositionFormProps {
  pokemons: PokemonOption[];
  onSuccess?: () => void;
  onCancel?: () => void;
  /** 編集モード用: 初期値 */
  initialTitle?: string;
  initialDescription?: string;
  initialSlots?: SlotData[];
  compositionId?: number;
  submitLabel?: string;
}

const LANES = [
  { id: "top", label: "上ルート", limit: 2 },
  { id: "center", label: "中央エリア", limit: 1 },
  { id: "bottom", label: "下ルート", limit: 2 },
] as const;

const LANE_LIMITS: Record<string, number> = { top: 2, center: 1, bottom: 2 };

const DEFAULT_LANES = ["top", "top", "center", "bottom", "bottom"];

export default function CompositionForm({
  pokemons,
  onSuccess,
  onCancel,
  initialTitle = "",
  initialDescription = "",
  initialSlots,
  compositionId,
  submitLabel,
}: CompositionFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [slots, setSlots] = useState<SlotData[]>(
    initialSlots || DEFAULT_LANES.map((lane) => ({ pokemonId: "", lane }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [battleStyleFilter, setBattleStyleFilter] = useState<string>("all");

  const isEditMode = !!compositionId;

  const selectedPokemonIds = useMemo(
    () => new Set(slots.map((s) => s.pokemonId).filter(Boolean)),
    [slots]
  );

  const availableStyles = useMemo(
    () => Array.from(new Set(pokemons.map((p) => p.battleStyle))).sort(),
    [pokemons]
  );

  // ルートごとの現在の割り当て数
  const laneCounts = useMemo(() => {
    const counts: Record<string, number> = { top: 0, center: 0, bottom: 0 };
    for (const slot of slots) {
      counts[slot.lane] = (counts[slot.lane] || 0) + 1;
    }
    return counts;
  }, [slots]);

  // ルート制約のバリデーション結果
  const laneErrors = useMemo(() => {
    const errors: string[] = [];
    for (const lane of LANES) {
      if (laneCounts[lane.id] !== lane.limit) {
        errors.push(
          `${lane.label}: ${laneCounts[lane.id]}/${lane.limit}体`
        );
      }
    }
    return errors;
  }, [laneCounts]);

  const isLaneValid = laneErrors.length === 0;

  const getFilteredPokemons = useCallback(
    (currentSlotPokemonId: string) => {
      return pokemons.filter((p) => {
        // 1. 他のスロットで選択済みのポケモンを除外（このスロット自身の値は除外しない）
        const isSelectedElsewhere =
          selectedPokemonIds.has(p.id.toString()) &&
          p.id.toString() !== currentSlotPokemonId;
        if (isSelectedElsewhere) return false;

        // 2. フィルターが「すべて」なら通す
        if (battleStyleFilter === "all") return true;

        // 3. 現在このスロットで選ばれているポケモンなら、フィルターに関わらず通す
        if (p.id.toString() === currentSlotPokemonId) return true;

        // 4. それ以外はバトルスタイルが一致するもののみ
        return p.battleStyle === battleStyleFilter;
      });
    },
    [pokemons, selectedPokemonIds, battleStyleFilter]
  );

  const updateSlot = (index: number, field: keyof SlotData, value: string) => {
    setSlots((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot))
    );
  };

  const filledCount = slots.filter((s) => s.pokemonId).length;
  const canSubmit = filledCount === 5 && isLaneValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (filledCount !== 5) {
      alert("5体すべてのポケモンを選択してください");
      return;
    }

    if (!isLaneValid) {
      alert("ルート配置が正しくありません（上2/中央1/下2）");
      return;
    }

    setIsSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        title: title.trim() || null,
        description: description.trim() || null,
        guestId: getUserId(),
        slots: slots.map((slot) => ({
          pokemonId: parseInt(slot.pokemonId, 10),
          lane: slot.lane,
        })),
      };

      if (isEditMode) {
        body.compositionId = compositionId;
      }

      const res = await fetch("/api/compositions", {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "投稿に失敗しました");
      }

      if (onSuccess) onSuccess();

      if (!isEditMode) {
        setTitle("");
        setDescription("");
        setSlots(DEFAULT_LANES.map((lane) => ({ pokemonId: "", lane })));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "投稿に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const findPokemon = (id: string) =>
    pokemons.find((p) => p.id.toString() === id);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <h3 className="text-lg font-bold mb-4 dark:text-white text-gray-900 border-b pb-2 dark:border-gray-700">
        {isEditMode ? "構成を編集" : "チーム構成を作成"}
      </h3>

      <div className="space-y-5">
        {/* タイトル */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            構成タイトル（任意）
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="例: 上レーン重視構成"
            maxLength={50}
          />
        </div>

        {/* 固定エリア: フィルター & ルートステータス */}
        <div className="sticky top-[57px] md:top-[64px] z-30 -mx-4 px-4 md:-mx-6 md:px-6 py-3 bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 space-y-3 transition-all">
          {/* バトルスタイルフィルター */}
          <div>
            <label className="block text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 text-gray-500 dark:text-gray-400">
              型で絞り込み
            </label>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              <button
                type="button"
                onClick={() => setBattleStyleFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  battleStyleFilter === "all"
                    ? "bg-gray-900 text-white border-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-100 shadow-md scale-105"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                }`}
              >
                すべて
              </button>
              {availableStyles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setBattleStyleFilter(style)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm border ${getBattleStyleColor(
                    style,
                    battleStyleFilter === style
                  )} ${battleStyleFilter === style ? "scale-105 shadow-md" : ""}`}
                >
                  {getBattleStyleShortLabel(style)}
                </button>
              ))}
            </div>
          </div>

          {/* ルート配置ステータス */}
          <div className="flex flex-wrap gap-2 items-center">
            {LANES.map((lane) => {
              const count = laneCounts[lane.id];
              const isOk = count === lane.limit;
              return (
                <div
                  key={lane.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-bold border transition-all ${
                    isOk
                      ? "bg-purple-50 text-purple-700 border-purple-200 shadow-sm dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                      : "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800"
                  }`}
                >
                  {isOk ? <Check size={12} /> : <AlertCircle size={12} />}
                  <span className="opacity-80">{lane.label}:</span>
                  <span>{count}/{lane.limit}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5スロット */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            ポケモン（5体） <span className="text-red-500">*</span>
            <span className="ml-2 text-xs text-gray-400 font-normal">
              {filledCount}/5体選択済み
            </span>
          </label>

          {slots.map((slot, index) => {
            const pokemon = findPokemon(slot.pokemonId);
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                {/* スロット番号 & ポケモンアイコン */}
                <div className="flex items-center gap-2 sm:w-10 flex-shrink-0">
                  <span className="text-xs font-bold text-gray-400 w-4">
                    {index + 1}
                  </span>
                  {pokemon?.imageUrl ? (
                    <Image
                      src={pokemon.imageUrl}
                      alt={pokemon.nameJa}
                      width={32}
                      height={32}
                      className="rounded-full bg-gray-100 dark:bg-gray-600 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <Plus size={14} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* ポケモン選択 */}
                <div className="flex-1 min-w-0">
                  <Combobox
                    items={getFilteredPokemons(slot.pokemonId)}
                    selectedValue={slot.pokemonId}
                    onSelect={(value) => updateSlot(index, "pokemonId", value)}
                    placeholder="ポケモンを選択..."
                    itemLabel={(item) => item.nameJa}
                    itemValue={(item) => item.id.toString()}
                    className="w-full"
                  />
                </div>

                {/* ルート選択 */}
                <div className="flex gap-1 sm:flex-shrink-0">
                  {LANES.map((lane) => (
                    <button
                      key={lane.id}
                      type="button"
                      onClick={() => updateSlot(index, "lane", lane.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        slot.lane === lane.id
                          ? "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/40 dark:text-purple-200 dark:border-purple-700"
                          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                      }`}
                    >
                      <MapPin size={10} />
                      {lane.label}
                    </button>
                  ))}
                </div>

                {/* クリアボタン */}
                {slot.pokemonId && (
                  <button
                    type="button"
                    onClick={() => updateSlot(index, "pokemonId", "")}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors self-center flex-shrink-0"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* 解説 */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            解説（任意）
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent min-h-[80px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="構成のポイントやレーン配置の意図など"
            maxLength={500}
          />
        </div>
      </div>

      {/* 送信ボタン */}
      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !canSubmit}
          className="flex-1 bg-brand-primary text-white font-bold py-2.5 rounded-lg hover:bg-purple-700 active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? (isEditMode ? "保存中..." : "投稿中...")
            : (submitLabel || (isEditMode ? "保存する" : "構成を投稿する"))}
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
