"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import {
    getDamageClassLabel,
    getDamageClassColor,
    getRangeTypeLabel,
    getRangeTypeColor,
    getBattleStyleLabel,
    getBattleStyleBgImage,
} from "@/lib/pokemon-utils";

export interface Pokemon {
    id: number;
    slug: string;
    nameJa: string;
    nameEn: string;
    imageUrl: string;
    damageClass: string;
    rangeType: string;
    battleStyle: string;
}

interface PokemonListClientProps {
    initialPokemons: Pokemon[];
    uniqueValues: {
        damageClasses: string[];
        rangeTypes: string[];
        battleStyles: string[];
    };
}

export default function PokemonListClient({ initialPokemons, uniqueValues }: PokemonListClientProps) {
    const [locale, setLocale] = useState<"ja" | "en">("ja");

    // フィルタ状態
    const [filters, setFilters] = useState({
        search: "",
        damageClass: "all",
        rangeType: "all",
        battleStyle: "all",
    });

    // ロケール設定
    useEffect(() => {
        const acceptLanguage = navigator.language || "ja";
        setLocale(acceptLanguage.startsWith("ja") ? "ja" : "en");
    }, []);

    // インメモリでのフィルタリング (即時反映)
    const filteredPokemons = useMemo(() => {
        return initialPokemons.filter((pokemon) => {
            // 検索一致判定
            const searchMatch =
                filters.search === "" ||
                pokemon.nameJa.includes(filters.search) ||
                pokemon.nameEn.toLowerCase().includes(filters.search.toLowerCase());

            // 各ドロップダウンの一致判定
            const damageClassMatch =
                filters.damageClass === "all" || pokemon.damageClass === filters.damageClass;

            const rangeTypeMatch =
                filters.rangeType === "all" || pokemon.rangeType === filters.rangeType;

            const battleStyleMatch =
                filters.battleStyle === "all" || pokemon.battleStyle === filters.battleStyle;

            return searchMatch && damageClassMatch && rangeTypeMatch && battleStyleMatch;
        });
    }, [initialPokemons, filters]);

    const handleFilterChange = (field: keyof typeof filters, value: string) => {
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



    return (
        <>

            {/* フィルターセクション */}
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {locale === "ja" ? "絞り込み" : "Filters"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
                    {/* 検索 */}
                    <div>
                        <label className="block text-xs md:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            {locale === "ja" ? "名前" : "Search Name"}
                        </label>
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => handleFilterChange("search", e.target.value)}
                            placeholder={locale === "ja" ? "ポケモン名..." : "Pokemon name..."}
                            className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
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
                            className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                        >
                            <option value="all">{locale === "ja" ? "すべて" : "All"}</option>
                            {uniqueValues.damageClasses.map((val) => (
                                <option key={val} value={val}>
                                    {locale === "ja" ? getDamageClassLabel(val) : val}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* レンジタイプ */}
                    <div>
                        <label className="block text-xs md:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            {locale === "ja" ? "攻撃範囲" : "Range Type"}
                        </label>
                        <select
                            value={filters.rangeType}
                            onChange={(e) => handleFilterChange("rangeType", e.target.value)}
                            className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                        >
                            <option value="all">{locale === "ja" ? "すべて" : "All"}</option>
                            {uniqueValues.rangeTypes.map((val) => (
                                <option key={val} value={val}>
                                    {locale === "ja" ? getRangeTypeLabel(val) : val}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* バトルスタイル */}
                    <div>
                        <label className="block text-xs md:text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            {locale === "ja" ? "型" : "Battle Style"}
                        </label>
                        <select
                            value={filters.battleStyle}
                            onChange={(e) => handleFilterChange("battleStyle", e.target.value)}
                            className="w-full px-3 py-2.5 md:py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                        >
                            <option value="all">{locale === "ja" ? "すべて" : "All"}</option>
                            {uniqueValues.battleStyles.map((val) => (
                                <option key={val} value={val}>
                                    {locale === "ja" ? getBattleStyleLabel(val) : val}
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
            {filteredPokemons.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">
                        {locale === "ja" ? "ポケモンが見つかりません" : "No Pokemon found"}
                    </p>
                </div>
            ) : (
                <>
                    <p className="mb-4 text-sm md:text-base text-gray-600 dark:text-gray-400">
                        {locale === "ja"
                            ? `${filteredPokemons.length}件のポケモンが見つかりました`
                            : `Found ${filteredPokemons.length} Pokemon`}
                    </p>
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {filteredPokemons.map((pokemon) => (
                            <li
                                key={pokemon.id}
                                className="border border-gray-200 dark:border-gray-700 p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 bg-cover bg-center bg-blend-overlay overflow-hidden"
                                style={{
                                    backgroundImage: `url('${getBattleStyleBgImage(pokemon.battleStyle)}')`,
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
        </>
    );
}
