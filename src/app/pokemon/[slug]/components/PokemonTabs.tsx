"use client";

import { useState } from "react";

type TabType = "counters" | "countered-by" | "stats";

interface PokemonTabsProps {
  pokemonId: number;
  slug: string;
  pokemonName: string;
  children: {
    counters: React.ReactNode;
    counteredBy: React.ReactNode;
    stats: React.ReactNode;
  };
}

export default function PokemonTabs({
  pokemonId,
  slug,
  pokemonName,
  children,
}: PokemonTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("counters");

  const tabs: Array<{ id: TabType; label: string }> = [
    { id: "counters", label: "カウンターピック" },
    { id: "countered-by", label: "有利対面" },
    { id: "stats", label: "ステータス" },
  ];

  const tabButtonClass = (isActive: boolean) =>
    `flex-1 md:flex-none px-3 md:px-4 py-2.5 md:py-2 text-xs md:text-sm font-medium transition-all border-b-2 ${
      isActive
        ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
    }`;

  return (
    <div className="mt-6 md:mt-8">
      {/* タブボタン */}
      <div className="flex gap-0 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={tabButtonClass(activeTab === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 有利対面タブの説明エリア */}
      {activeTab === "countered-by" && (
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 px-4 py-2.5 text-sm text-blue-800 dark:text-blue-100">
          📌 {pokemonName}が有利に戦えるポケモン
        </div>
      )}

      {/* カウンターピックタブの説明エリア */}
      {activeTab === "counters" && (
        <div className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 px-4 py-2.5 text-sm text-amber-800 dark:text-amber-100">
          📌 {pokemonName}に有利なポケモン（対策法）
        </div>
      )}

      {/* ステータスタブの説明エリア（Coming soon） */}
      {activeTab === "stats" && (
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300">
          🔄 ステータス詳細: Coming soon
        </div>
      )}

      {/* タブコンテンツ */}
      <div className="bg-white dark:bg-gray-800 p-4 md:p-6">
        {activeTab === "counters" && children.counters}
        {activeTab === "countered-by" && children.counteredBy}
        {activeTab === "stats" && children.stats}
      </div>
    </div>
  );
}
