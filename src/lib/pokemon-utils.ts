/**
 * ポケモン属性のラベル・色変換ユーティリティ
 * page.tsx / PokemonListClient.tsx / InputCandidateCard.tsx 等で共通利用
 */

// ── ダメージクラス ──

export const getDamageClassLabel = (damageClass: string): string => {
  const labels: Record<string, string> = {
    physical: "攻撃",
    special: "特攻",
  };
  return labels[damageClass.toLowerCase()] || damageClass;
};

export const getDamageClassColor = (damageClass: string): string => {
  const colors: Record<string, string> = {
    physical: "bg-orange-100 text-orange-700 border-orange-300",
    special: "bg-green-100 text-green-700 border-green-300",
  };
  return colors[damageClass.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-300";
};

// ── レンジタイプ ──

export const getRangeTypeLabel = (rangeType: string): string => {
  const labels: Record<string, string> = {
    melee: "近接",
    ranged: "遠隔",
  };
  return labels[rangeType.toLowerCase()] || rangeType;
};

export const getRangeTypeColor = (rangeType: string): string => {
  const colors: Record<string, string> = {
    melee: "bg-orange-100 text-orange-700 border-orange-300",
    ranged: "bg-green-100 text-green-700 border-green-300",
  };
  return colors[rangeType.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-300";
};

// ── バトルスタイル ──

export const getBattleStyleLabel = (battleStyle: string): string => {
  const labels: Record<string, string> = {
    attacker: "アタック型",
    "all-rounder": "バランス型",
    defender: "ディフェンス型",
    speedster: "スピード型",
    supporter: "サポート型",
  };
  return labels[battleStyle.toLowerCase()] || battleStyle;
};

/** 短縮ラベル（フィルターボタン用） */
export const getBattleStyleShortLabel = (battleStyle: string): string => {
  const labels: Record<string, string> = {
    attacker: "アタック",
    "all-rounder": "バランス",
    defender: "ディフェンス",
    speedster: "スピード",
    supporter: "サポート",
  };
  return labels[battleStyle.toLowerCase()] || battleStyle;
};

/** バトルスタイルの淡い色（パステル） — 選択状態のボタン / タグ表示用 */
export const getBattleStyleColor = (style: string, isSelected: boolean): string => {
  if (!isSelected) {
    return "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600";
  }
  const colors: Record<string, string> = {
    attacker: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
    "all-rounder": "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700",
    defender: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
    speedster: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
    supporter: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
  };
  return colors[style.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600";
};

/** ポケモンカード背景画像パス */
export const getBattleStyleBgImage = (battleStyle: string): string => {
  const images: Record<string, string> = {
    attacker: "/background/bg-thumb_red.jpg",
    "all-rounder": "/background/bg-thumb_violet.jpg",
    defender: "/background/bg-thumb_green.jpg",
    speedster: "/background/bg-thumb_blue.jpg",
    supporter: "/background/bg-thumb_yellow.jpg",
  };
  return images[battleStyle.toLowerCase()] || "";
};
