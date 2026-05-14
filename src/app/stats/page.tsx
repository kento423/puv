import { getStatDefinitions, getAllPokemonStatsForLevel, getStatMinMax } from "@/app/actions/pokemon";
import StatsTableClient from "./StatsTableClient";
import Link from "next/link";
import { Scale } from "lucide-react";

export const revalidate = 60;

export const metadata = {
  title: "ステータス図鑑 | Unite Community",
  description:
    "ポケモンユナイトの全ポケモンのステータスをレベル別に比較。HP、攻撃、防御、特攻、特防、移動速度などを一覧表で確認できます。",
};

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const params = await searchParams;
  const level = parseInt(params.level || "15", 10);
  const clampedLevel = Math.max(1, Math.min(15, level));

  const [statDefs, pokemonStats, minMax] = await Promise.all([
    getStatDefinitions(),
    getAllPokemonStatsForLevel(clampedLevel),
    getStatMinMax(),
  ]);

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ステータス図鑑
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            全ポケモンのステータスをレベル別に比較。セルをクリックして値を更新できます。
          </p>
        </div>
        <Link
          href="/stats/compare"
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
        >
          <Scale className="w-4 h-4" />
          比較モードを開く
        </Link>
      </div>

      <StatsTableClient
        statDefs={statDefs}
        initialPokemonStats={pokemonStats}
        initialLevel={clampedLevel}
        minMax={minMax}
      />
    </div>
  );
}
