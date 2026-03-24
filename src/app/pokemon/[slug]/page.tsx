import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Breadcrumbs from "./Breadcrumbs";
import PokemonInfo from "./PokemonInfo";
import PokemonPageClient from "./PokemonPageClient";
import { prisma } from "@/lib/prisma";

export default async function Page({ params }: { params: Promise<any> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Prismaから直接データ取得（自己APIへのHTTP fetchを回避）
  const pokemonData = await prisma.pokemon.findUnique({
    where: { slug },
    include: {
      customTags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!pokemonData) notFound();

  // SSR時: Accept-Languageヘッダーからlocaleを推定
  const h = await headers();
  const acceptLang = h.get("accept-language") || "ja";
  const locale = acceptLang.startsWith("en") ? "en" : "ja";
  const name = locale === "ja" ? pokemonData.nameJa : pokemonData.nameEn;

  // SSRでカウンター初期データを取得 (サーバーサイドレンダリング)
  const countersData = await prisma.pokemonCounter.findMany({
    where: { targetPokemonId: pokemonData.id },
    include: {
      counterPokemon: true,
    },
  });

  const initialCounters = countersData.map((counter: any) => ({
    id: counter.id,
    nameJa: counter.counterPokemon.nameJa,
    nameEn: counter.counterPokemon.nameEn,
    imageUrl: counter.counterPokemon.imageUrl,
    slug: counter.counterPokemon.slug,
    reason: counter.reason,
    counterType: counter.counterType,
    upvotes: counter.upvotes,
    downvotes: counter.downvotes,
  }));

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
