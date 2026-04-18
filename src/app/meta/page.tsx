import { getMetaPosts, getBanPicks, getBugReports, getActivePatch, getAllPatches } from "@/app/actions/meta";
import { getPokemonList } from "@/app/actions/pokemon";
import MetaBoardClient from "./MetaBoardClient";
import React, { Suspense } from "react";

export const revalidate = 60; // 1分キャッシュ

export default async function MetaBoardPage({ searchParams }: { searchParams: Promise<{ patchId?: string }> }) {
  const params = await searchParams;
  const [activePatch, allPatches] = await Promise.all([
    getActivePatch(),
    getAllPatches(),
  ]);
  
  let targetPatch = activePatch;
  if (params.patchId) {
    const requestedId = parseInt(params.patchId, 10);
    const found = allPatches.find((p: any) => p.id === requestedId);
    if (found) targetPatch = found;
  }

  const patchId = targetPatch?.id || 0;

  const [metaPosts, banPicks, bugReports, pokemonData] = await Promise.all([
    patchId ? getMetaPosts(patchId) : Promise.resolve([]),
    patchId ? getBanPicks(patchId) : Promise.resolve([]),
    patchId ? getBugReports(patchId) : Promise.resolve([]),
    getPokemonList(),
  ]);

  const pokemons = pokemonData.pokemons.map(p => ({
    id: p.id,
    nameJa: p.nameJa,
    nameEn: p.nameEn,
    imageUrl: p.imageUrl,
    slug: p.slug,
    battleStyle: p.battleStyle
  }));

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          アプデ後情報掲示板
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          環境ポケモンやBAN候補、最新のバグ情報をリアルタイムで共有しよう。
        </p>
      </div>

      {/* APIの実装ではVoteAPIで "postId" や "banPickId" 等のフィールド名を期待しているため、Clientに渡す際にエイリアスを設定しないと型が合わない。ここでは生のプロパティ名は一致しているはずなのでそのまま。APIに合わせるよう注意 */}
      <Suspense fallback={<div>読み込み中...</div>}>
        <MetaBoardClient 
          pokemons={pokemons}
          metaPosts={patchId ? metaPosts : []}
          banPicks={patchId ? banPicks : []}
          bugReports={patchId ? bugReports : []}
          activePatch={targetPatch}
          allPatches={allPatches}
        />
      </Suspense>
    </div>
  );
}
