"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpDown, ArrowUp, ArrowDown, Filter, RotateCcw } from "lucide-react";
import StatEditCell from "@/components/StatEditCell";
import SearchInput from "@/components/ui/SearchInput";
import FilterPills from "@/components/ui/FilterPills";
import { getBattleStyleColor } from "@/lib/pokemon-utils";

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
  nameEn: string;
  imageUrl: string;
  battleStyle: string;
  stats: {
    statId: number;
    statKey: string;
    statName: string;
    unit: string;
    value: number;
    updatedAt: string;
  }[];
}

interface Props {
  statDefs: StatDef[];
  initialPokemonStats: PokemonStatRow[];
  initialLevel: number;
  minMax: Record<string, { min: number; max: number }>;
}

type SortKey = "name" | string; // "name" or stat key
type SortDir = "asc" | "desc";

const BATTLE_STYLE_LABELS: Record<string, string> = {
  attacker: "アタック型",
  "all-rounder": "バランス型",
  defender: "ディフェンス型",
  speedster: "スピード型",
  supporter: "サポート型",
};

export default function StatsTableClient({
  statDefs,
  initialPokemonStats,
  initialLevel,
}: Props) {
  const [level, setLevel] = useState(initialLevel);
  const [pokemonStats, setPokemonStats] =
    useState<PokemonStatRow[]>(initialPokemonStats);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStyles, setFilterStyles] = useState<string[]>([]);
  const [isLoadingLevel, setIsLoadingLevel] = useState(false);

  const handleReset = () => {
    setSearchQuery("");
    setFilterStyles([]);
  };

  // レベル変更時にデータ再取得
  const handleLevelChange = useCallback(
    async (newLevel: number) => {
      setLevel(newLevel);
      setIsLoadingLevel(true);

      // URL のクエリパラメータを同期
      const url = new URL(window.location.href);
      url.searchParams.set("level", String(newLevel));
      window.history.replaceState({}, "", url.toString());

      try {
        const res = await fetch(`/api/stats/all?level=${newLevel}`);
        if (res.ok) {
          setPokemonStats(await res.json());
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoadingLevel(false);
      }
    },
    []
  );

  // ソート処理
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  // フィルタリング & ソート
  const filteredAndSorted = pokemonStats
    .filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.nameJa.includes(searchQuery) ||
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStyle = filterStyles.length === 0 || filterStyles.includes(p.battleStyle);
      return matchesSearch && matchesStyle;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") {
        cmp = a.nameJa.localeCompare(b.nameJa, "ja");
      } else {
        const aVal =
          a.stats.find((s) => s.statKey === sortKey)?.value ?? -Infinity;
        const bVal =
          b.stats.find((s) => s.statKey === sortKey)?.value ?? -Infinity;
        cmp = aVal - bVal;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) {
      return <ArrowUpDown className="w-3 h-3 text-gray-400" />;
    }
    return sortDir === "asc" ? (
      <ArrowUp className="w-3 h-3 text-purple-500" />
    ) : (
      <ArrowDown className="w-3 h-3 text-purple-500" />
    );
  };

  // データ再取得（インライン編集後）
  const handleStatSaved = useCallback(async () => {
    try {
      const res = await fetch(`/api/stats/all?level=${level}`);
      if (res.ok) {
        setPokemonStats(await res.json());
      }
    } catch (error) {
      console.error("Failed to refresh stats:", error);
    }
  }, [level]);

  return (
    <div className="space-y-4">
      {/* コントロールバー */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* レベルセレクター */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="stats-level"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            レベル
          </label>
          <select
            id="stats-level"
            value={level}
            onChange={(e) => handleLevelChange(parseInt(e.target.value, 10))}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            {Array.from({ length: 15 }, (_, i) => i + 1).map((lv) => (
              <option key={lv} value={lv}>
                Lv.{lv}
              </option>
            ))}
          </select>
        </div>

        {/* 検索 */}
        <SearchInput
          onSearchChange={setSearchQuery}
          value={searchQuery}
          placeholder="ポケモン名で検索..."
          className="flex-1 min-w-[200px] max-w-[300px]"
        />

        {/* バトルスタイルフィルター (統合タブスタイル) */}
        <div className="relative group flex-1 min-w-[300px]">
          {/* フィルタラベル・タブ */}
          <div className="absolute -top-3 left-4 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-md flex items-center gap-1.5 z-10">
            <Filter className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              フィルター
            </span>
            <button
              onClick={handleReset}
              className="ml-1 p-0.5 text-brand-accent hover:opacity-80 transition-opacity"
              title="リセット"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pt-4 shadow-sm h-full flex items-center">
            <FilterPills
              options={Object.entries(BATTLE_STYLE_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
              selectedValues={filterStyles}
              onToggle={(value) => {
                setFilterStyles((prev) =>
                  prev.includes(value)
                    ? prev.filter((v) => v !== value)
                    : [...prev, value]
                );
              }}
              getColor={(value, isSelected) => getBattleStyleColor(value, isSelected)}
            />
          </div>
        </div>
      </div>

      {/* テーブル */}
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-auto max-h-[75vh] scrollbar-thin ${
          isLoadingLevel ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                {/* ポケモン名 */}
                <th
                  className="sticky left-0 top-0 z-30 bg-gray-100 dark:bg-gray-900 text-left py-2.5 px-3 cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border-b border-gray-200 dark:border-gray-700"
                  onClick={() => handleSort("name")}
                >
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    ポケモン <SortIcon colKey="name" />
                  </span>
                </th>
                {/* ステータス列 */}
                {statDefs.map((def) => (
                  <th
                    key={def.key}
                    className="sticky top-0 z-20 bg-gray-100 dark:bg-gray-900 text-right py-2.5 px-3 cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors whitespace-nowrap border-b border-gray-200 dark:border-gray-700"
                    onClick={() => handleSort(def.key)}
                  >
                    <span className="inline-flex items-center justify-end gap-1 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      {def.name}
                      {def.unit && (
                        <span className="text-[10px] text-gray-400">
                          ({def.unit})
                        </span>
                      )}
                      <SortIcon colKey={def.key} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {filteredAndSorted.map((pokemon) => (
                <tr
                  key={pokemon.id}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group/row"
                >
                  {/* ポケモン名 */}
                  <td className="sticky left-0 z-10 py-2 px-3 border-r border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800 group-odd/row:bg-white group-even/row:bg-gray-50 dark:group-odd/row:bg-gray-800 dark:group-even/row:bg-gray-900 group-hover/row:bg-purple-50 dark:group-hover/row:bg-purple-900/40 transition-colors">
                    <Link
                      href={`/pokemon/${pokemon.slug}?tab=stats`}
                      className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                    >
                      <Image
                        src={pokemon.imageUrl}
                        alt={pokemon.nameJa}
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-md flex-shrink-0 group-hover:scale-110 transition-transform"
                      />
                      <span className="font-bold text-gray-900 dark:text-white text-sm truncate max-w-[80px] sm:max-w-none">
                        {pokemon.nameJa}
                      </span>
                    </Link>
                  </td>
                  {/* ステータスセル */}
                  {statDefs.map((def) => {
                    const stat = pokemon.stats.find(
                      (s) => s.statKey === def.key
                    );
                    return (
                      <td key={def.key} className="text-right py-2 px-3">
                        <StatEditCell
                          pokemonId={pokemon.id}
                          statId={def.id}
                          level={level}
                          currentValue={stat?.value ?? null}
                          unit={def.unit}
                          onSaved={handleStatSaved}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
              {filteredAndSorted.length === 0 && (
                <tr>
                  <td
                    colSpan={statDefs.length + 1}
                    className="py-12 text-center text-gray-400 dark:text-gray-500"
                  >
                    該当するポケモンが見つかりません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* フッター */}
      <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
        セルをクリックすると値を編集できます。コミュニティの力でデータを充実させましょう！
      </div>
    </div>
  );
}
