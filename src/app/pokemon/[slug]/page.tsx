import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Breadcrumbs from "./Breadcrumbs";
import PokemonInfo from "./PokemonInfo";
import PokemonPageClient from "./PokemonPageClient";
import { getPokemonBySlug, getPokemonCounters } from "@/app/actions/pokemon";

export default async function Page({ params }: { params: Promise<any> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Server Action経由でデータ取得
  const pokemonData = await getPokemonBySlug(slug);

  if (!pokemonData) notFound();

  // SSR時: Accept-Languageヘッダーからlocaleを推定
  const h = await headers();
  const acceptLang = h.get("accept-language") || "ja";
  const locale = acceptLang.startsWith("en") ? "en" : "ja";
  const name = locale === "ja" ? pokemonData.nameJa : pokemonData.nameEn;

  // Server Action経由でカウンター一覧を取得
  const initialCounters = await getPokemonCounters(pokemonData.id);

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
