import { notFound } from "next/navigation";
import Breadcrumbs from "./Breadcrumbs";
import PokemonInfo from "./PokemonInfo";
import PokemonPageClient from "./PokemonPageClient";
import { getPokemonBySlug, getPokemonCounters, PokemonCounterItem, getPokemonList } from "@/app/actions/pokemon";

export const revalidate = 3600; // 1時間キャッシュ (ISR)

// ビルド時に全ポケモンのページを生成する
export async function generateStaticParams() {
  const { pokemons } = await getPokemonList();
  return pokemons.map((pokemon) => ({
    slug: pokemon.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Server Action経由でデータ取得 (unstable_cacheにより高速)
  const pokemonData = await getPokemonBySlug(slug);

  if (!pokemonData) notFound();

  // 日本語をデフォルトとする (ISRを有効にするため headers() を避ける)
  const locale = "ja"; 
  const name = pokemonData.nameJa;

  // カウンター一覧を取得 (キャッシュ済み)
  // pokemonData.targetOf にデータが含まれているが、既存の PokemonCounterItem 型へ変換するために Action を呼び出す
  const initialCounters: PokemonCounterItem[] = await getPokemonCounters(pokemonData.id);

  return (
    <div className="w-full">
      <Breadcrumbs name={name} />
      <PokemonInfo
        name={name}
        imageUrl={pokemonData.imageUrl ?? ""}
        damageClass={pokemonData.damageClass}
        rangeType={pokemonData.rangeType}
        battleStyle={pokemonData.battleStyle}
        customTags={pokemonData.customTags}
        slug={slug}
      />
      <PokemonPageClient
        pokemonId={pokemonData.id}
        slug={slug}
        pokemonName={name}
        initialCounters={initialCounters}
      />
    </div>
  );
}

