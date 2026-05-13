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
    getBattleStyleColor,
    getBattleStyleShortLabel,
    getBattleStyleCardStyle,
} from "@/lib/pokemon-utils";
import { Filter, RotateCcw } from "lucide-react";
import SearchInput from "@/components/ui/SearchInput";
import FilterPills from "@/components/ui/FilterPills";

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
        damageClasses: [] as string[],
        rangeTypes: [] as string[],
        battleStyles: [] as string[],
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

            // 各カテゴリの一致判定 (空配列の場合はすべて表示)
            const damageClassMatch =
                filters.damageClasses.length === 0 || filters.damageClasses.includes(pokemon.damageClass);

            const rangeTypeMatch =
                filters.rangeTypes.length === 0 || filters.rangeTypes.includes(pokemon.rangeType);

            const battleStyleMatch =
                filters.battleStyles.length === 0 || filters.battleStyles.includes(pokemon.battleStyle);

            return searchMatch && damageClassMatch && rangeTypeMatch && battleStyleMatch;
        });
    }, [initialPokemons, filters]);

    const handleSearchChange = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }));
    };

    const toggleFilter = (field: "damageClasses" | "rangeTypes" | "battleStyles", value: string) => {
        setFilters((prev) => {
            const current = prev[field];
            const next = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            return { ...prev, [field]: next };
        });
    };

    const handleReset = () => {
        setFilters({
            search: "",
            damageClasses: [],
            rangeTypes: [],
            battleStyles: [],
        });
    };

    // フィルタボタンの共通スタイル
    const getPillStyle = (isSelected: boolean, activeClasses: string) => {
        if (isSelected) return activeClasses;
        return "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600";
    };

    return (
        <div className="space-y-6">
            {/* ヘッダーセクション: 検索のみ */}
            <div className="flex justify-end">
                <SearchInput
                    onSearchChange={handleSearchChange}
                    value={filters.search}
                    placeholder={locale === "ja" ? "ポケモン名で検索..." : "Search for a Pokémon..."}
                    className="w-full md:w-72 lg:w-96"
                />
            </div>

            {/* 統合フィルタコンテナ (unite-dbスタイル) */}
            <div className="relative group">
                {/* フィルタラベル・タブ */}
                <div className="absolute -top-3 left-4 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-md flex items-center gap-1.5 z-10">
                    <Filter className="w-3 h-3 text-gray-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {locale === "ja" ? "フィルター" : "Filters"}
                    </span>
                    <button
                        onClick={handleReset}
                        className="ml-1 p-0.5 text-brand-accent hover:opacity-80 transition-opacity"
                        title={locale === "ja" ? "リセット" : "Reset"}
                    >
                        <RotateCcw className="w-3 h-3" />
                    </button>
                </div>

                {/* フィルタ本体 */}
                <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-xl p-4 pt-6 shadow-sm backdrop-blur-sm">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                        
                        {/* 射程グループ */}
                        <FilterPills
                            options={uniqueValues.rangeTypes.map((val) => ({
                                value: val,
                                label: locale === "ja" ? getRangeTypeLabel(val) : val,
                            }))}
                            selectedValues={filters.rangeTypes}
                            onToggle={(val) => toggleFilter("rangeTypes", val)}
                            getColor={(val, isSelected) =>
                                getPillStyle(isSelected, getRangeTypeColor(val) + " dark:border-gray-600")
                            }
                        />

                        {/* タイプグループ */}
                        <FilterPills
                            options={uniqueValues.damageClasses.map((val) => ({
                                value: val,
                                label: locale === "ja" ? getDamageClassLabel(val) : val,
                            }))}
                            selectedValues={filters.damageClasses}
                            onToggle={(val) => toggleFilter("damageClasses", val)}
                            getColor={(val, isSelected) =>
                                getPillStyle(isSelected, getDamageClassColor(val) + " dark:border-gray-600")
                            }
                        />

                        {/* バトルスタイルグループ */}
                        <FilterPills
                            options={uniqueValues.battleStyles.map((style) => ({
                                value: style,
                                label: locale === "ja" ? getBattleStyleLabel(style) : style,
                            }))}
                            selectedValues={filters.battleStyles}
                            onToggle={(val) => toggleFilter("battleStyles", val)}
                            getColor={(val, isSelected) => getBattleStyleColor(val, isSelected)}
                        />

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
                                className={`border p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md transition-all backdrop-blur-[2px] overflow-hidden ${getBattleStyleCardStyle(
                                    pokemon.battleStyle
                                )}`}
                            >
                                <Link href={`/pokemon/${pokemon.slug}`}>
                                    <div className="flex flex-col items-center cursor-pointer group">
                                        <div className="relative mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <Image
                                                src={pokemon.imageUrl}
                                                alt={locale === "ja" ? pokemon.nameJa : pokemon.nameEn}
                                                width={84}
                                                height={84}
                                            />
                                        </div>
                                        <h2 className="text-sm md:text-base font-bold text-center text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors">
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
