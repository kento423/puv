"use client";
import { useEffect, useState } from "react";
import { use } from "react";
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

export default function Page({ params }: { params: any }) {
  const unwrappedParams = use(params) as { slug: string };
  const { slug } = unwrappedParams;
  const locale = "ja";
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const pokemonRes = await fetch(`/api/pokemon/${slug}`);
      const countersRes = await fetch(`/api/pokemon/${slug}/counters`);
      if (pokemonRes.ok && countersRes.ok) {
        setPokemonData(await pokemonRes.json());
        setCounters(await countersRes.json());
      }
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  const handleCounterAdded = async () => {
    // POST直後にDB反映遅延対策で少し待つ
    await new Promise((res) => setTimeout(res, 300));
    const countersRes = await fetch(`/api/pokemon/${slug}/counters`);
    if (countersRes.ok) {
      setCounters(await countersRes.json());
    }
  };

  // 並び順: 👍-👎のトータルスコアが高い順にソート
  const sortedCounters = [...counters].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));

  if (loading || !pokemonData) {
    return <div>Loading...</div>;
  }

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
        onVoted={handleCounterAdded}
      />
      <div className="mt-8">
        <AddCounterForm slug={slug} locale={locale} onCounterAdded={handleCounterAdded} />
      </div>
    </div>
  );
}
