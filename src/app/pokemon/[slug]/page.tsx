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

export default async function Page({ params }: { params: any }) {
  const { slug } = params;
  const locale = "ja";

  // SSRでデータ取得
  const pokemonRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/pokemon/${slug}`, { cache: "no-store" });
  const countersRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/pokemon/${slug}/counters`, { cache: "no-store" });

  if (!pokemonRes.ok || !countersRes.ok) {
    return <div>Loading...</div>;
  }
  const pokemonData: PokemonData = await pokemonRes.json();
  const counters: Counter[] = await countersRes.json();

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
        counters={counters}
        targetPokemonId={pokemonData.id}
        locale={locale}
      />
      <div className="mt-8">
        <AddCounterForm slug={slug} locale={locale} />
      </div>
    </div>
  );
}
