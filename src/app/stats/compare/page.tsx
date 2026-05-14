import { getStatDefinitions, getAllPokemonStatsForLevel, getStatMinMax } from "@/app/actions/pokemon";
import StatsCompareClient from "./StatsCompareClient";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export const metadata = {
  title: "ステータス比較 | Unite Community",
  description:
    "複数のポケモンを並べてステータスをレーダーチャートとテーブルで徹底比較。構成検討や対策に役立ちます。",
};

export default async function StatsComparePage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const params = await searchParams;
  const level = parseInt(params.level || "15", 10);
  const clampedLevel = Math.max(1, Math.min(15, level));

  // 並行してデータ取得
  const [statDefs, pokemonStats, minMax, allPokemons] = await Promise.all([
    getStatDefinitions(),
    getAllPokemonStatsForLevel(clampedLevel),
    getStatMinMax(),
    // セレクター用に軽量なポケモン一覧を取得
    prisma.pokemon.findMany({
      select: {
        id: true,
        slug: true,
        nameJa: true,
        nameEn: true,
        imageUrl: true,
        battleStyle: true,
      },
      orderBy: { id: "asc" },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-10 px-4">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ステータス比較
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          最大3体までのポケモンを選択して、ステータスをレーダーチャートと詳細テーブルで比較できます。
        </p>
      </div>

      <StatsCompareClient
        allPokemons={allPokemons}
        statDefs={statDefs}
        pokemonStats={pokemonStats}
        minMax={minMax}
        initialLevel={clampedLevel}
      />
    </div>
  );
}
