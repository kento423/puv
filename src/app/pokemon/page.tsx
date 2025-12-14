"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface Pokemon {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  damageClass: string;
  rangeType: string;
  battleStyle: string;
}

export default function PokemonListPage() {
  const searchParams = useSearchParams();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState<"ja" | "en">("ja");
  const [filters, setFilters] = useState({
    search: "",
    damageClass: "all",
    rangeType: "all",
    battleStyle: "all",
  });
  const [uniqueValues, setUniqueValues] = useState({
    damageClasses: [] as string[],
    rangeTypes: [] as string[],
    battleStyles: [] as string[],
  });

  // ロケール設定
  useEffect(() => {
    const acceptLanguage = navigator.language || "ja";
    setLocale(acceptLanguage.startsWith("ja") ? "ja" : "en");
  }, []);

  // データ取得
  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.damageClass !== "all")
        params.append("damageClass", filters.damageClass);
      if (filters.rangeType !== "all")
        params.append("rangeType", filters.rangeType);
      if (filters.battleStyle !== "all")
        params.append("battleStyle", filters.battleStyle);

      const res = await fetch(
        `/api/pokemon?${params.toString()}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        setPokemonList(data);

        // ユニークな値を収集
        const damageClasses = Array.from(new Set(data.map((p: Pokemon) => p.damageClass))).sort() as string[];
        const rangeTypes = Array.from(new Set(data.map((p: Pokemon) => p.rangeType))).sort() as string[];
        const battleStyles = Array.from(new Set(data.map((p: Pokemon) => p.battleStyle))).sort() as string[];

        setUniqueValues({
          damageClasses,
          rangeTypes,
          battleStyles,
        });
      } else {
        setPokemonList([]);
      }
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const handleFilterChange = (
    field: keyof typeof filters,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      damageClass: "all",
      rangeType: "all",
      battleStyle: "all",
    });
  };

  // ダメージクラスを日本語に変換
  const getDamageClassLabel = (damageClass: string): string => {
    const labels: { [key: string]: string } = {
      physical: "攻撃",
      special: "特攻",
    };
    return labels[damageClass.toLowerCase()] || damageClass;
  };

  // ダメージクラスの色を取得
  const getDamageClassColor = (damageClass: string): string => {
    const colors: { [key: string]: string } = {
      physical: "bg-orange-100 text-orange-700 border-orange-300",
      special: "bg-green-100 text-green-700 border-green-300",
    };
    return colors[damageClass.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  // レンジタイプを日本語に変換
  const getRangeTypeLabel = (rangeType: string): string => {
    const labels: { [key: string]: string } = {
      melee: "近接",
      ranged: "遠隔",
    };
    return labels[rangeType.toLowerCase()] || rangeType;
  };

  // レンジタイプの色を取得
  const getRangeTypeColor = (rangeType: string): string => {
    const colors: { [key: string]: string } = {
      melee: "bg-orange-100 text-orange-700 border-orange-300",
      ranged: "bg-green-100 text-green-700 border-green-300",
    };
    return colors[rangeType.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  // バトルスタイルの背景画像パスを取得
  const getBattleStyleBgImage = (battleStyle: string): string => {
    const images: { [key: string]: string } = {
      attacker: "/background/bg-thumb_red.jpg",
      "all-rounder": "/background/bg-thumb_violet.jpg",
      defender: "/background/bg-thumb_green.jpg",
      speedster: "/background/bg-thumb_blue.jpg",
      supporter: "/background/bg-thumb_yellow.jpg",
    };
    return images[battleStyle.toLowerCase()] || "";
  };

  // ダメージクラスのセレクト用ラベルを取得
  const getDamageClassSelectLabel = (damageClass: string): string => {
    return getDamageClassLabel(damageClass);
  };

  // レンジタイプのセレクト用ラベルを取得
  const getRangeTypeSelectLabel = (rangeType: string): string => {
    return getRangeTypeLabel(rangeType);
  };

  // バトルスタイルのセレクト用ラベルを取得
  const getBattleStyleSelectLabel = (battleStyle: string): string => {
    const labels: { [key: string]: string } = {
      attacker: "アタック型",
      "all-rounder": "バランス型",
      defender: "ディフェンス型",
      speedster: "スピード型",
      supporter: "サポート型",
    };
    return labels[battleStyle.toLowerCase()] || battleStyle;
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
        {locale === "ja" ? "ポケモン一覧" : "Pokémon List"}
      </h1>

      {/* フィルターセクション */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {locale === "ja" ? "絞り込み" : "Filters"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {/* 検索 */}
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {locale === "ja" ? "名前検索" : "Search Name"}
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder={locale === "ja" ? "ポケモン名..." : "Pokemon name..."}
              className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* ダメージクラス */}
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {locale === "ja" ? "タイプ" : "Damage Class"}
            </label>
            <select
              value={filters.damageClass}
              onChange={(e) => handleFilterChange("damageClass", e.target.value)}
              className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">{locale === "ja" ? "すべて" : "All"}</option>
              {uniqueValues.damageClasses.map((val) => (
                <option key={val} value={val}>
                  {locale === "ja" ? getDamageClassSelectLabel(val) : val}
                </option>
              ))}
            </select>
          </div>

          {/* レンジタイプ */}
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {locale === "ja" ? "範囲" : "Range Type"}
            </label>
            <select
              value={filters.rangeType}
              onChange={(e) => handleFilterChange("rangeType", e.target.value)}
              className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">{locale === "ja" ? "すべて" : "All"}</option>
              {uniqueValues.rangeTypes.map((val) => (
                <option key={val} value={val}>
                  {locale === "ja" ? getRangeTypeSelectLabel(val) : val}
                </option>
              ))}
            </select>
          </div>

          {/* バトルスタイル */}
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {locale === "ja" ? "戦闘スタイル" : "Battle Style"}
            </label>
            <select
              value={filters.battleStyle}
              onChange={(e) => handleFilterChange("battleStyle", e.target.value)}
              className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">{locale === "ja" ? "すべて" : "All"}</option>
              {uniqueValues.battleStyles.map((val) => (
                <option key={val} value={val}>
                  {locale === "ja" ? getBattleStyleSelectLabel(val) : val}
                </option>
              ))}
            </select>
          </div>

          {/* リセットボタン */}
          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full px-4 py-2.5 md:py-2 bg-gray-400 dark:bg-gray-600 text-white rounded-md hover:bg-gray-500 dark:hover:bg-gray-700 active:scale-95 transition-all text-sm md:text-base font-medium"
            >
              {locale === "ja" ? "リセット" : "Reset"}
            </button>
          </div>
        </div>
      </div>

      {/* 結果表示 */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">{locale === "ja" ? "読み込み中..." : "Loading..."}</p>
        </div>
      ) : pokemonList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">{locale === "ja" ? "ポケモンが見つかりません" : "No Pokemon found"}</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm md:text-base text-gray-600 dark:text-gray-400">
            {locale === "ja"
              ? `${pokemonList.length}件のポケモンが見つかりました`
              : `Found ${pokemonList.length} Pokemon`}
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {pokemonList.map((pokemon) => (
              <li
                key={pokemon.id}
                className="border border-gray-200 dark:border-gray-700 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 bg-cover bg-center bg-blend-overlay overflow-hidden"
                style={{
                  backgroundImage: `url('${getBattleStyleBgImage(
                    pokemon.battleStyle
                  )}')`,
                }}
              >
                <Link href={`/pokemon/${pokemon.slug}`}>
                  <div className="flex flex-col items-center cursor-pointer">
                    <Image
                      src={pokemon.imageUrl}
                      alt={locale === "ja" ? pokemon.nameJa : pokemon.nameEn}
                      width={80}
                      height={80}
                      className="mb-2 md:mb-3"
                    />
                    <h2 className="text-sm md:text-base font-bold text-center text-gray-900 dark:text-white">
                      {locale === "ja" ? pokemon.nameJa : pokemon.nameEn}
                    </h2>
                    <div className="mt-2 flex gap-1.5 flex-wrap justify-center">
                      <span
                        className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold border ${getDamageClassColor(
                          pokemon.damageClass
                        )}`}
                      >
                        {getDamageClassLabel(pokemon.damageClass)}
                      </span>
                      <span
                        className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold border ${getRangeTypeColor(
                          pokemon.rangeType
                        )}`}
                      >
                        {getRangeTypeLabel(pokemon.rangeType)}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}