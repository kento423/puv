import { getCompositions } from "@/app/actions/composition";
import { getPokemonList } from "@/app/actions/pokemon";
import CompositionsClient from "./CompositionsClient";
import { Suspense } from "react";

export const revalidate = 60;

export const metadata = {
  title: "構成メーカー - Unite Community",
  description:
    "ポケモンユナイトの5人チーム構成を作成・共有。上ルート・中央エリア・下ルートの最適な配置を見つけよう。",
};

export default async function CompositionsPage() {
  const [compositions, pokemonData] = await Promise.all([
    getCompositions(),
    getPokemonList(),
  ]);

  const pokemons = pokemonData.pokemons.map((p) => ({
    id: p.id,
    nameJa: p.nameJa,
    nameEn: p.nameEn,
    imageUrl: p.imageUrl,
    battleStyle: p.battleStyle,
  }));

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          構成メーカー
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          チーム構成を作成して、コミュニティと共有しよう。上ルート2/中央エリア1/下ルート2の配置で構成を組み立てられます。
        </p>
      </div>

      <Suspense fallback={<div>読み込み中...</div>}>
        <CompositionsClient
          pokemons={pokemons}
          compositions={compositions}
        />
      </Suspense>
    </div>
  );
}
