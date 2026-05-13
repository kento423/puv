"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { BarChart3, ExternalLink, RefreshCw } from "lucide-react";
import StatEditCell from "@/components/StatEditCell";
import Link from "next/link";

interface StatDefinition {
  id: number;
  key: string;
  name: string;
  sortOrder: number;
  unit: string;
}

interface PokemonStatItem {
  statId: number;
  statKey: string;
  statName: string;
  unit: string;
  level: number;
  value: number;
  guestId: string | null;
  updatedAt: string;
}

interface StatRadarChartTabProps {
  slug: string;
  pokemonId: number;
}

// レーダーチャートのデフォルト6軸 — 対角線配置
// HP / 移動速度、攻撃 / 特攻、防御 / 特防
const RADAR_STAT_ORDER = ["hp", "atk", "spdef", "speed", "def", "spatk"];

// ツールチップのカスタムコンテンツ
function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { label: string; originalValue: number | null; unit: string } }> }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-900 dark:text-white">
        {data.label}
      </p>
      <p className="text-sm font-bold text-purple-600 dark:text-purple-400">
        {data.originalValue !== null
          ? `${data.originalValue}${data.unit}`
          : "N/A"}
      </p>
    </div>
  );
}

export default function StatRadarChartTab({
  slug,
  pokemonId,
}: StatRadarChartTabProps) {
  const [level, setLevel] = useState(15);
  const [activeRadarStats, setActiveRadarStats] = useState<string[]>(RADAR_STAT_ORDER);
  const [statDefs, setStatDefs] = useState<StatDefinition[]>([]);
  const [stats, setStats] = useState<PokemonStatItem[]>([]);
  const [minMax, setMinMax] = useState<Record<string, { min: number; max: number }>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // データ取得
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [statsRes, defsRes] = await Promise.all([
        fetch(`/api/stats?pokemonId=${pokemonId}&level=${level}`),
        // Stat定義は初回のみ取得可能だが、毎回取得してもキャッシュされるので問題ない
        fetch(`/api/stats/definitions`),
      ]);

      if (statsRes.ok) {
        const statsData: PokemonStatItem[] = await statsRes.json();
        setStats(statsData);

        // 最終更新日を算出
        if (statsData.length > 0) {
          const latest = statsData.reduce((a, b) =>
            new Date(a.updatedAt) > new Date(b.updatedAt) ? a : b
          );
          setLastUpdated(latest.updatedAt);
        } else {
          setLastUpdated(null);
        }
      }

      if (defsRes.ok) {
        setStatDefs(await defsRes.json());
      }
    } catch (error) {
      console.error("Failed to fetch stat data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [pokemonId, level]);

  // min/max 取得（レベルが変わるたびに再取得して正規化の基準を合わせる）
  useEffect(() => {
    fetch(`/api/stats/minmax?level=${level}`)
      .then((res) => (res.ok ? res.json() : {}))
      .then(setMinMax)
      .catch(() => setMinMax({}));
  }, [level]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // レーダーチャート用データの正規化
  const radarData = activeRadarStats.map((key) => {
    const def = statDefs.find((d) => d.key === key);
    const stat = stats.find((s) => s.statKey === key);
    const range = minMax[key];
    const label = def?.name ?? key;

    let normalizedValue = 0;
    let originalValue: number | null = null;

    if (stat) {
      originalValue = stat.value;
      if (range && range.max > range.min) {
        // 視認性向上のため、最低値を25%、最高値を100%としてマッピング
        // 25%はRechartsのデフォルト4分割グリッド（0, 25, 50, 75, 100）の1つ目の線と一致します。
        const MIN_CHART_VALUE = 25;
        const normalizedRatio = (stat.value - range.min) / (range.max - range.min);
        normalizedValue = MIN_CHART_VALUE + (normalizedRatio * (100 - MIN_CHART_VALUE));
      } else {
        normalizedValue = 50; // min/max がない場合はデフォルト
      }
    }

    return {
      label,
      value: Math.round(normalizedValue),
      originalValue,
      unit: def?.unit ?? "",
    };
  });

  const hasAnyData = stats.length > 0;

  // 現在のレベルのステータスをStat定義順に取得（テーブル用）
  const tableData = statDefs
    .slice() // sortOrder順（Server側でソート済み）
    .map((def) => {
      const stat = stats.find((s) => s.statKey === def.key);
      return {
        ...def,
        value: stat?.value ?? null,
        updatedAt: stat?.updatedAt ?? null,
      };
    });

  return (
    <div className="w-full space-y-4">
      {/* ヘッダー: レベルセレクター + 全ポケモン一覧リンク */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <label
            htmlFor="stat-level-select"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            レベル
          </label>
          <select
            id="stat-level-select"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value, 10))}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            {Array.from({ length: 15 }, (_, i) => i + 1).map((lv) => (
              <option key={lv} value={lv}>
                Lv.{lv}
              </option>
            ))}
          </select>
        </div>

        <Link
          href="/stats"
          className="inline-flex items-center gap-1.5 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium"
        >
          <BarChart3 className="w-4 h-4" />
          全ポケモンステータス表
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* レーダーチャート */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
            ステータス（Lv.{level}）
          </h3>
          {lastUpdated && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              最終更新: {new Date(lastUpdated).toLocaleDateString("ja-JP")}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <RefreshCw className="w-6 h-6 text-purple-500 animate-spin" />
          </div>
        ) : !hasAnyData ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <BarChart3 className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              ステータスデータがまだ登録されていません
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              下のテーブルからデータを入力して貢献しよう！
            </p>
          </div>
        ) : (
          <div
            className="flex justify-center"
            style={{ width: "100%", height: "300px" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid
                  stroke="rgba(156, 163, 175, 0.3)"
                  strokeDasharray="3 3"
                />
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
                <Radar
                  name="ステータス"
                  dataKey="value"
                  stroke="rgb(147, 51, 234)"
                  fill="rgb(147, 51, 234)"
                  fillOpacity={0.25}
                  strokeWidth={2}
                  isAnimationActive={true}
                  dot={{
                    r: 4,
                    fill: "rgb(147, 51, 234)",
                    stroke: "#fff",
                    strokeWidth: 1,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* 表示項目のカスタマイズUI */}
        {hasAnyData && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/50">
            <p className="text-xs text-gray-500 mb-2 font-medium">表示項目のカスタマイズ（3つ以上選択）</p>
            <div className="flex flex-wrap gap-2">
              {statDefs.map((def) => {
                const isActive = activeRadarStats.includes(def.key);
                // レーダーチャートの形状を保つため、3項目以下になるようなOFF操作を禁止する
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
                    title={isDisableClick ? "レーダーチャートには最低3つの項目が必要です" : ""}
                  >
                    {def.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ステータス詳細テーブル */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              ステータス詳細（Lv.{level}）
            </h4>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              セルをクリックして編集
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                <th className="text-left py-2.5 px-4 text-gray-600 dark:text-gray-400 font-medium text-xs uppercase tracking-wider">
                  ステータス
                </th>
                <th className="text-right py-2.5 px-4 text-gray-600 dark:text-gray-400 font-medium text-xs uppercase tracking-wider">
                  Lv.{level}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {tableData.map((row) => (
                <tr
                  key={row.key}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-2.5 px-4 text-gray-700 dark:text-gray-300 font-medium">
                    {row.name}
                    {row.unit && (
                      <span className="text-xs text-gray-400 ml-0.5">
                        ({row.unit})
                      </span>
                    )}
                  </td>
                  <td className="text-right py-2.5 px-4">
                    <StatEditCell
                      pokemonId={pokemonId}
                      statId={row.id}
                      level={level}
                      currentValue={row.value}
                      unit={row.unit}
                      onSaved={fetchData}
                    />
                  </td>
                </tr>
              ))}
              {tableData.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan={2}
                    className="py-8 text-center text-gray-400 dark:text-gray-500 text-sm"
                  >
                    ステータス定義を読み込み中...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
