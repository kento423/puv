import { prisma } from "@/lib/prisma";
import PokemonListClient from "./PokemonListClient";

export const revalidate = 60;

export default async function PokemonListPage() {
  const pokemons = await prisma.pokemon.findMany({
    orderBy: { id: "asc" },
  });

  const damageClasses = Array.from(
    new Set(pokemons.map((p) => p.damageClass))
  ).sort() as string[];
  const rangeTypes = Array.from(
    new Set(pokemons.map((p) => p.rangeType))
  ).sort() as string[];
  const battleStyles = Array.from(
    new Set(pokemons.map((p) => p.battleStyle))
  ).sort() as string[];

  const uniqueValues = { damageClasses, rangeTypes, battleStyles };

  const initialPokemons = pokemons.map((p) => ({
    id: p.id,
    slug: p.slug,
    nameJa: p.nameJa,
    nameEn: p.nameEn,
    imageUrl: p.imageUrl ?? "",
    damageClass: p.damageClass,
    rangeType: p.rangeType,
    battleStyle: p.battleStyle,
  }));

  return (
    <div className="w-full">
      <PokemonListClient
        initialPokemons={initialPokemons}
        uniqueValues={uniqueValues}
      />
    </div>
  );
}