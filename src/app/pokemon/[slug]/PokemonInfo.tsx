"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PokemonAttributesTags from "./PokemonAttributesTags";

interface CustomTag {
  guestId?: string | null;
  userId?: string | null;
  upvotes: number;
  downvotes: number;
  tag: {
    id: number;
    name: string;
    color: string;
  };
}

export default function PokemonInfo({
  name,
  imageUrl,
  damageClass,
  rangeType,
  battleStyle,
  customTags: initialCustomTags = [],
  slug,
}: {
  name: string;
  imageUrl: string;
  damageClass: string;
  rangeType: string;
  battleStyle: string;
  customTags?: CustomTag[];
  slug?: string;
}) {
  const [customTags, setCustomTags] = useState<CustomTag[]>(initialCustomTags);

  const handleTagsUpdated = async () => {
    if (!slug) return;
    try {
      const res = await fetch(`/api/pokemon/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setCustomTags(data.customTags || []);
      }
    } catch (error) {
      console.error("Error fetching updated tags:", error);
    }
  };

  return (
    <div className="mb-6 md:mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
      {/* ポケモン名・画像・すべての情報を横配置 */}
      <div className="flex gap-4 md:gap-6">
        {/* ポケモン画像（固定幅） */}
        <Image src={imageUrl} alt={name} width={100} height={100} className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg" />
        
        {/* ポケモン情報エリア（拡張可能） */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">{name}</h1>
          
          {/* 基本情報タグ + カスタムタグを一つのセクションに */}
          <PokemonAttributesTags
            damageClass={damageClass}
            rangeType={rangeType}
            battleStyle={battleStyle}
            customTags={customTags}
            slug={slug}
            onTagsUpdated={handleTagsUpdated}
            showBasicTags={true}
            showCustomTags={true}
            compact={true}
          />
        </div>
      </div>
    </div>
  );
}
