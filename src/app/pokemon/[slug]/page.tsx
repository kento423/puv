import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Breadcrumbs from "./Breadcrumbs";
import PokemonInfo from "./PokemonInfo";
import PokemonPageClient from "./PokemonPageClient";

interface PokemonData {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  damageClass: string;
  rangeType: string;
  battleStyle: string;
  customTags: Array<{
    tag: {
      id: number;
      name: string;
      color: string;
    };
  }>;
}

export default async function Page({ params }: { params: Promise<any> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const pokemonRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/pokemon/${slug}`, { cache: "no-store" });
  if (!pokemonRes.ok) notFound();
  const pokemonData: PokemonData = await pokemonRes.json();

  // SSR時: Accept-Languageヘッダーからlocaleを推定
  const h = await headers();
  const acceptLang = h.get("accept-language") || "ja";
  const locale = acceptLang.startsWith("en") ? "en" : "ja";
  const name = locale === "ja" ? pokemonData.nameJa : pokemonData.nameEn;

  return (
    <div className="w-full">
      <Breadcrumbs name={name} />
      <PokemonInfo
        name={name}
        imageUrl={pokemonData.imageUrl}
        damageClass={pokemonData.damageClass}
        rangeType={pokemonData.rangeType}
        battleStyle={pokemonData.battleStyle}
        customTags={pokemonData.customTags}
        slug={slug}
      />
      <PokemonPageClient pokemonId={pokemonData.id} slug={slug} pokemonName={name} />
    </div>
  );
}
