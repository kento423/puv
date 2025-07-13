"use client";
import { useEffect, useState } from "react";
import CandidateCardList from "@/components/CandidateCardList";
import AddCounterForm from "@/components/AddCounterForm";
import Image from "next/image";
import Link from "next/link";

interface Counter {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  reason: string;
  upvotes: number;
  downvotes: number;
}
interface PokemonData {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
}

export default function PokemonPageClient({ pokemonData, slug }: { pokemonData: PokemonData, slug: string }) {
  const [counters, setCounters] = useState<Counter[]>([]);
  const locale = "ja";

  useEffect(() => {
    async function fetchCounters() {
      const res = await fetch(`/api/pokemon/${slug}/counters`);
      if (res.ok) setCounters(await res.json());
    }
    fetchCounters();
  }, [slug]);

  const sortedCounters = [...counters].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* パンくずリスト追加 */}
      <nav className="mb-4 text-sm text-gray-500 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/pokemon" className="hover:underline text-blue-600 dark:text-blue-400">ポケモン一覧</Link>
        <span className="mx-1">&gt;</span>
        <span className="font-bold text-gray-800 dark:text-gray-100">{locale === "ja" ? pokemonData.nameJa : pokemonData.nameEn}</span>
      </nav>
      <div className="flex items-center mb-6">
        <Image
          src={pokemonData.imageUrl}
          alt={locale === "ja" ? pokemonData.nameJa : pokemonData.nameEn}
          width={120}
          height={120}
          className="mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {locale === "ja" ? pokemonData.nameJa : pokemonData.nameEn}
          </h1>
          <p className="text-gray-600">このポケモンのカウンターは……</p>
        </div>
      </div>
      <CandidateCardList
        counters={sortedCounters}
        targetPokemonId={pokemonData.id}
        locale={locale}
      />
      <div className="mt-8">
        <AddCounterForm slug={slug} locale={locale} />
      </div>
    </div>
  );
}
