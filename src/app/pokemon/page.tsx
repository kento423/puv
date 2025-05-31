"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
}

export default function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [locale, setLocale] = useState<string>("ja"); // 初期値を日本語に設定

  useEffect(() => {
    // ブラウザの言語設定を取得してロケールを設定
    const browserLocale = navigator.language.startsWith("ja") ? "ja" : "en";
    setLocale(browserLocale);
  }, []);

  useEffect(() => {
    async function fetchPokemonList() {
      const res = await fetch("/api/pokemon");
      if (res.ok) {
        const data = await res.json();
        setPokemonList(data);
      }
    }
    fetchPokemonList();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ポケモン一覧</h1>
      <div className="mb-4">
        <button
          onClick={() => setLocale("ja")}
          className={`mr-2 px-4 py-2 rounded ${
            locale === "ja" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          日本語
        </button>
        <button
          onClick={() => setLocale("en")}
          className={`px-4 py-2 rounded ${
            locale === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          English
        </button>
      </div>
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