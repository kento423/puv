/**
 * sync-stats.ts
 * 
 * unite-db.com の API (stats.json) から全ポケモンのステータスを取得し、
 * pokemonStatSeedData.json を自動更新するスクリプト。
 * 
 * 使い方:
 *   npx tsx scripts/sync-stats.ts          # 全ポケモンの再取得
 *   npx tsx scripts/sync-stats.ts --dry-run  # JSONを更新せず結果のみ表示
 */

import fs from "fs";
import path from "path";

const SEED_DATA_PATH = path.join(process.cwd(), "prisma", "pokemonStatSeedData.json");

interface StatRow {
  level: number;
  hp: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
  crit: number;
  cdr: number;
  lifesteal: number;
  atkspd: number;
  speed: number;
}

interface PokemonStats {
  nameEn: string;
  stats: StatRow[];
}

/**
 * nameEnのマッピング（unite-db.com -> DB内のnameEn）
 */
function normalizeNameEn(name: string): string {
  const mapping: Record<string, string> = {
    "Ninetales": "Alolan Ninetales",
    "Raichu": "Alolan Raichu",
    "Rapidash": "Galarian Rapidash",
    "MewtwoX": "Mewtwo X",
    "MewtwoY": "Mewtwo Y",
    "Mr.Mime": "Mr. Mime",
    "Sirfetchd": "Sirfetch'd",
    "Ho-Oh": "Ho-Oh", // ハイフンを維持
  };

  if (mapping[name]) return mapping[name];
  
  // デフォルト: ハイフンをスペースに置換（Mega-Charizard-X -> Mega Charizard X 等）
  return name.replace(/-/g, " ");
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  console.log("=== Unite-DB Stats Sync (All Levels API Version) ===");
  console.log(`モード: ${dryRun ? "DRY RUN（JSONを更新しません）" : "LIVE（JSONを更新します）"}\n`);

  // APIから全ステータスを取得
  console.log("Fetching stats from https://unite-db.com/stats.json ...");
  const res = await fetch("https://unite-db.com/stats.json");
  if (!res.ok) throw new Error("Failed to fetch stats.json");
  const apiData = await res.json();

  console.log(`取得成功: ${apiData.length} 体のポケモンデータを読み込みました\n`);

  const results: PokemonStats[] = [];

  for (const pokemon of apiData) {
    const displayName = normalizeNameEn(pokemon.name);
    
    // 全レベルのデータをマップ
    const stats: StatRow[] = pokemon.level.map((l: any) => ({
      level: Number(l.level),
      hp: Number(l.hp),
      atk: Number(l.attack),
      def: Number(l.defense),
      spatk: Number(l.sp_attack),
      spdef: Number(l.sp_defense),
      crit: Number(l.crit),
      cdr: Number(l.cdr),
      lifesteal: Number(l.lifesteal),
      atkspd: Number(l.attack_speed),
      speed: Number(l.move_speed),
    }));
    
    if (stats.length > 0) {
      results.push({
        nameEn: displayName,
        stats,
      });
    } else {
      console.warn(`[WARN] ${displayName}: データが見つかりません`);
    }
  }

  // nameEn でソート
  results.sort((a, b) => a.nameEn.localeCompare(b.nameEn));

  // JSONを更新
  if (!dryRun) {
    fs.writeFileSync(SEED_DATA_PATH, JSON.stringify(results, null, 2) + "\n");
    console.log(`\n✅ ${SEED_DATA_PATH} を更新しました（${results.length} 体の全レベルデータ）`);
    console.log("次のステップ: npm run seed を実行してDBに反映してください");
  } else {
    console.log(`\n✅ DRY RUN: ${results.length} 体の全レベルデータの取得に成功しました。`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
