import { notFound } from "next/navigation";
import PokemonPageClient from "./PokemonPageClient";

interface PokemonData {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
}

export default async function Page({ params }: { params: any }) {
  const { slug } = params;
  const pokemonRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/pokemon/${slug}`, { cache: "no-store" });
  if (!pokemonRes.ok) notFound();
  const pokemonData: PokemonData = await pokemonRes.json();

  return <PokemonPageClient pokemonData={pokemonData} slug={slug} />;
}
