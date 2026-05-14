"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts";
import { Plus, X, Info, BarChart3 } from "lucide-react";
import PokemonSelector from "@/components/meta/PokemonSelector";

const MAX_COMPARE_COUNT = 3;
const CHART_COLORS = ["#9333ea", "#f97316", "#3b82f6"]; // Purple, Orange, Blue
const RADAR_STAT_ORDER = ["hp", "atk", "spdef", "speed", "def", "spatk"];

interface StatDef {
  id: number;
  key: string;
  name: string;
  sortOrder: number;
  unit: string;
}

interface PokemonStatRow {
  id: number;
  slug: string;
  nameJa: string;
  stats: {
    statId: number;
    statKey: string;
    value: number;
  }[];
}

interface PokemonBase {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string | null;
  battleStyle: string;
}

interface Props {
  allPokemons: PokemonBase[];
  statDefs: StatDef[];
  pokemonStats: PokemonStatRow[];
  minMax: Record<string, { min: number; max: number }>;
  initialLevel: number;
}

// ツールチップのカスタマイズ
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload.originalValues;
  const label = payload[0].payload.label;
  const unit = payload[0].payload.unit;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-900 dark:text-white mb-2">
        {label}
      </p>
      {payload.map((entry: any, index: number) => {
        const val = data ? data[entry.dataKey] : null;
        return (
          <div key={index} className="flex items-center justify-between gap-4 text-sm">
            <span style={{ color: entry.color }} className="font-medium">
              {/* entry.name はポケモンの名前 */}
              {entry.name}:
            </span>
            <span className="font-bold text-gray-900 dark:text-white">
              {val !== null && val !== undefined ? `${val}${unit}` : "N/A"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function StatsCompareClient({
  allPokemons,
  statDefs,
  pokemonStats,
  minMax,
  initialLevel,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pParam = searchParams.get("p");

  const [level, setLevel] = useState(initialLevel);
  const [activeRadarStats, setActiveRadarStats] = useState<string[]>(RADAR_STAT_ORDER);
  const [selectingSlot, setSelectingSlot] = useState<number | null>(null);

  // URLパラメータから選択されたポケモンの slug リストを取得
  const selectedSlugs = useMemo(() => {
    if (!pParam) return [];
    return pParam.split(",").filter((s) => s.trim() !== "");
  }, [pParam]);

  // slug から完全なポケモンオブジェクトのリストを取得
  const selectedPokemons = useMemo(() => {
    return selectedSlugs
      .map((slug) => allPokemons.find((p) => p.slug === slug))
      .filter((p): p is PokemonBase => p !== undefined)
      .slice(0, MAX_COMPARE_COUNT);
  }, [selectedSlugs, allPokemons]);

  // URLを更新するユーティリティ
  const updateUrl = (newSlugs: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSlugs.length > 0) {
      params.set("p", newSlugs.join(","));
    } else {
      params.delete("p");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleAddPokemon = (pokemonId: string) => {
    const target = allPokemons.find((p) => p.id.toString() === pokemonId);
    if (!target) return;

    if (!selectedSlugs.includes(target.slug) && selectedSlugs.length < MAX_COMPARE_COUNT) {
      updateUrl([...selectedSlugs, target.slug]);
    }
    setSelectingSlot(null);
  };

  const handleRemovePokemon = (slug: string) => {
    updateUrl(selectedSlugs.filter((s) => s !== slug));
  };

  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
    const params = new URLSearchParams(searchParams.toString());
    params.set("level", newLevel.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // -------------------------
  // レーダーチャートデータの構築
  // -------------------------
  const radarData = useMemo(() => {
    return activeRadarStats.map((statKey) => {
      const def = statDefs.find((d) => d.key === statKey);
      const range = minMax[statKey];

      // 各軸のベースオブジェクト
      const dataPoint: any = {
        label: def?.name ?? statKey,
        unit: def?.unit ?? "",
        originalValues: {},
      };

      // 選択されたポケモンそれぞれの正規化値を計算
      selectedPokemons.forEach((pokemon) => {
        const pStats = pokemonStats.find((s) => s.id === pokemon.id);
        const statValue = pStats?.stats.find((s) => s.statKey === statKey)?.value;

        let normalizedValue = 0;
        dataPoint.originalValues[pokemon.nameJa] = statValue ?? null;

        if (statValue !== undefined && statValue !== null) {
          if (range && range.max > range.min) {
            const MIN_CHART_VALUE = 25;
            const normalizedRatio = (statValue - range.min) / (range.max - range.min);
            normalizedValue = MIN_CHART_VALUE + normalizedRatio * (100 - MIN_CHART_VALUE);
          } else {
            normalizedValue = 50;
          }
        }
        dataPoint[pokemon.nameJa] = Math.max(0, Math.round(normalizedValue));
      });

      return dataPoint;
    });
  }, [activeRadarStats, statDefs, minMax, selectedPokemons, pokemonStats]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* リンクと一括レベル変更ヘッダー */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <Link
          href="/stats"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors group"
        >
          <BarChart3 className="w-4 h-4" />
          全ポケモンのステータス一覧（図鑑）を開く
        </Link>
        <div className="flex items-center gap-2">
          <label htmlFor="compare-level" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            一括レベル切替
          </label>
          <select
            id="compare-level"
            value={level}
            onChange={(e) => handleLevelChange(parseInt(e.target.value, 10))}
            className="px-3 py-1.5 text-sm font-bold border border-purple-300 dark:border-purple-600 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            {Array.from({ length: 15 }, (_, i) => i + 1).map((lv) => (
              <option key={lv} value={lv}>Lv.{lv}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 選択エリア (Slot UI) - モバイルでは横スクロール */}
      <div className="flex overflow-x-auto pb-4 gap-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {Array.from({ length: MAX_COMPARE_COUNT }).map((_, index) => {
          const pokemon = selectedPokemons[index];
          const isSelecting = selectingSlot === index;

          if (isSelecting) {
            return (
              <div
                key={`slot-${index}`}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-purple-500 shadow-sm relative z-10 min-w-[280px] md:min-w-0 flex-1 flex-shrink-0 snap-start"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    ポケモンを選択
                  </span>
                  <button
                    onClick={() => setSelectingSlot(null)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <PokemonSelector
                  pokemons={allPokemons}
                  selectedId=""
                  onSelect={handleAddPokemon}
                  label=""
                />
              </div>
            );
          }

          if (pokemon) {
            return (
              <div
                key={pokemon.slug}
                className="relative bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 group min-w-[280px] md:min-w-0 flex-1 flex-shrink-0 snap-start"
              >
                <div
                  className="absolute inset-y-0 left-0 w-1.5 rounded-l-xl"
                  style={{ backgroundColor: CHART_COLORS[index] }}
                />
                <Image
                  src={pokemon.imageUrl || ""}
                  alt={pokemon.nameJa}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {pokemon.nameJa}
                  </h3>
                  <Link
                    href={`/pokemon/${pokemon.slug}?tab=stats`}
                    className="text-xs text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    詳細を見る
                  </Link>
                </div>
                <button
                  onClick={() => handleRemovePokemon(pokemon.slug)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="削除"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          }

          // 空きスロット
          return (
            <button
              key={`empty-${index}`}
              onClick={() => setSelectingSlot(index)}
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 transition-colors group min-w-[280px] md:min-w-0 flex-1 flex-shrink-0 snap-start"
            >
              <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5 text-purple-500" />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                ポケモンを追加
              </span>
            </button>
          );
        })}
      </div>

      {selectedPokemons.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* レーダーチャート領域 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 flex flex-col">
            <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-4">
              ステータスバランス (Lv.{level})
            </h3>
            
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="rgba(156, 163, 175, 0.3)" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: "rgba(107, 114, 128, 1)" }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  {selectedPokemons.map((pokemon, idx) => (
                    <Radar
                      key={pokemon.id}
                      name={pokemon.nameJa}
                      dataKey={pokemon.nameJa}
                      stroke={CHART_COLORS[idx]}
                      fill={CHART_COLORS[idx]}
                      fillOpacity={0.2}
                      strokeWidth={2}
                      isAnimationActive={true}
                    />
                  ))}
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                    iconType="circle" 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* 表示項目のカスタマイズUI */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center gap-1.5 mb-2">
                <p className="text-xs text-gray-500 font-medium">表示項目のカスタマイズ（3つ以上選択）</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {statDefs.map((def) => {
                  const isActive = activeRadarStats.includes(def.key);
                  const isDisableClick = isActive && activeRadarStats.length <= 3;
                  return (
                    <button
                      key={def.key}
                      onClick={() => {
                        if (isDisableClick) return;
                        setActiveRadarStats((prev) =>
                          isActive
                            ? prev.filter((k) => k !== def.key)
                            : [...prev, def.key]
                        );
                      }}
                      disabled={isDisableClick}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        isActive
                          ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700"
                      } ${isDisableClick ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {def.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 比較テーブル領域 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col relative">
            <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                詳細数値の比較
              </h3>
              <div className="group relative cursor-help py-1">
                <Info className="w-4 h-4 text-gray-400" />
                <div className="absolute left-0 bottom-full mb-2 w-56 p-3 bg-gray-900/95 backdrop-blur-sm text-white text-[11px] leading-relaxed rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-active:opacity-100 group-active:visible transition-all duration-200 z-50 pointer-events-none border border-white/10">
                  <p className="font-bold mb-1 text-purple-300">数値ハイライトについて</p>
                  各行の中で最も数値が高いポケモンが、緑色の太字で自動的にハイライトされます。
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-right table-fixed min-w-[400px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700/50">
                    <th className="py-3 px-2 text-left font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 sticky left-0 z-10 w-24 md:w-36 whitespace-nowrap">
                      ステータス
                    </th>
                    {selectedPokemons.map((pokemon, idx) => (
                      <th
                        key={pokemon.id}
                        className="py-2 px-4"
                      >
                        <div className="flex justify-end">
                          <div className="relative group/icon" title={pokemon.nameJa}>
                            <Image
                              src={pokemon.imageUrl || ""}
                              alt={pokemon.nameJa}
                              width={32}
                              height={32}
                              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 shadow-sm transition-transform group-hover/icon:scale-110"
                              style={{ borderColor: CHART_COLORS[idx] }}
                            />
                            <div 
                              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"
                              style={{ backgroundColor: CHART_COLORS[idx] }}
                            />
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {statDefs.slice().map((def) => {
                    // この行の各ポケモンの値を抽出
                    const rowValues = selectedPokemons.map((pokemon) => {
                      const pStats = pokemonStats.find((s) => s.id === pokemon.id);
                      return pStats?.stats.find((s) => s.statKey === def.key)?.value ?? -Infinity;
                    });
                    // 最大値を計算
                    const maxVal = Math.max(...rowValues);

                    return (
                      <tr
                        key={def.key}
                        className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group/row"
                      >
                        <td className="py-2.5 px-2 text-left font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 group-hover/row:bg-gray-50 dark:group-hover/row:bg-gray-750 sticky left-0 z-10 w-24 md:w-36 border-r border-gray-100 dark:border-gray-700/50 whitespace-nowrap transition-colors text-[10px] md:text-sm">
                          {def.name}
                          {def.unit && (
                            <span className="text-[10px] text-gray-400 ml-1">
                              ({def.unit})
                            </span>
                          )}
                        </td>
                        {selectedPokemons.map((pokemon, idx) => {
                          const val = rowValues[idx];
                          const isMax = val === maxVal && val !== -Infinity && selectedPokemons.length > 1;

                          return (
                            <td
                              key={`${def.key}-${pokemon.id}`}
                              className={`py-2.5 px-4 transition-colors ${
                                isMax
                                  ? "font-bold bg-green-50/50 dark:bg-green-900/10 text-green-700 dark:text-green-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {val !== -Infinity ? val.toLocaleString() : "-"}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
