import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";

interface Pokemon {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
}

export default async function PokemonListPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "ja";
  const locale = acceptLanguage.startsWith("ja") ? "ja" : "en";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/pokemon`,
    { cache: "no-store" }
  );
  const pokemonList: Pokemon[] = res.ok ? await res.json() : [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {locale === "ja" ? "ポケモン一覧" : "Pokémon List"}
      </h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id} className="border p-4 rounded shadow">
            <Link href={`/pokemon/${pokemon.slug}`}>
              <div className="flex flex-col items-center">
                <Image
                  src={pokemon.imageUrl}
                  alt={locale === "ja" ? pokemon.nameJa : pokemon.nameEn}
                  width={100}
                  height={100}
                  className="mb-2"
                />
                <h2 className="text-lg font-bold">
                  {locale === "ja" ? pokemon.nameJa : pokemon.nameEn}
                </h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}