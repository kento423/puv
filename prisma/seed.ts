import { PrismaClient } from "../src/generated/prisma";
import pokemonMasterData from "./pokemonMasterData.json";

import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // console.log("Resetting tables...");

  // --- Pokemon Master Data & Reset ---
  console.log("Syncing Pokemon master data (non-destructive)...");

  // 1. 既存データの取得（ID飛び防止とデータ保護のため、手動で差分更新を行う）
  const existingPokemons = await prisma.pokemon.findMany({ select: { slug: true }});
  const existingSlugs = new Set(existingPokemons.map(p => p.slug));

  let createdCount = 0;
  let updatedCount = 0;

  for (const pokemon of pokemonMasterData) {
    if (existingSlugs.has(pokemon.slug)) {
      // 既存なら更新のみ（シーケンスを消費しない＝IDが飛ばない）
      await prisma.pokemon.update({
        where: { slug: pokemon.slug },
        data: {
          nameJa: pokemon.nameJa,
          nameEn: pokemon.nameEn,
          damageClass: pokemon.damageClass,
          rangeType: pokemon.rangeType,
          battleStyle: pokemon.battleStyle,
          imageUrl: pokemon.imageUrl,
        }
      });
      updatedCount++;
    } else {
      // 新規なら作成（ここで初めてシーケンスが1つだけ消費される）
      await prisma.pokemon.create({
        data: pokemon
      });
      createdCount++;
    }
  }

  console.log(`Pokemon master data synced successfully! (Created: ${createdCount}, Updated: ${updatedCount})`);

  // --- トレーナー名鑑データのシード ---

  // 1. レーダー指標 (Radar Metrics)
  const metrics = [
    { key: "macro", label: "マクロ判断", sortOrder: 1 },
    { key: "micro", label: "ミクロ操作", sortOrder: 2 },
    { key: "impact", label: "集団戦影響力", sortOrder: 3 },
    { key: "carry", label: "キャリー力", sortOrder: 4 },
    { key: "stability", label: "安定感", sortOrder: 5 },
    { key: "cooperation", label: "連携力", sortOrder: 6 },
  ];

  for (const metric of metrics) {
    await prisma.radarMetric.upsert({
      where: { key: metric.key },
      update: {},
      create: metric,
    });
  }
  console.log("Radar metrics inserted!");

  // 2. チーム (Teams)
  // PUACL2026 出場チーム
  const teams = [
    // 日本代表チーム
    { name: "FENNEL", shortName: "FL", region: "JP", type: "pro" },
    { name: "SCARZ", shortName: "SZ", region: "JP", type: "pro" },
    { name: "REJECT", shortName: "RC", region: "JP", type: "pro" },
    { name: "ENTER FORCE.36", shortName: "E36", region: "JP", type: "pro" },
    // 日本5枠目は2月28日決定（KEIO CUP優勝チーム）

    // 東南アジア代表チーム
    { name: "ONIC RISE", shortName: "ONIC", region: "ID", type: "pro" },
    { name: "FULL SENSE", shortName: "FS", region: "TH", type: "pro" },
    { name: "T1", shortName: "T1", region: "KR", type: "pro" },
    { name: "Team Nemesis", shortName: "NMSS", region: "PH", type: "pro" },
    { name: "Rival Esports", shortName: "RVL", region: "SG", type: "pro" },

    // インド代表チーム
    { name: "Reckoning Esports", shortName: "RCK", region: "IN", type: "pro" },
    { name: "GodLike Esports", shortName: "GL", region: "IN", type: "pro" },

    // LAIC代表チーム（ラテンアメリカ）
    { name: "Dignitas", shortName: "DIG", region: "LATAM", type: "pro" },
    { name: "CACM Esports", shortName: "CACM", region: "LATAM", type: "pro" },
    { name: "Force Gaming", shortName: "FG", region: "LATAM", type: "pro" },

    // 中国代表チーム
    { name: "Dark Peach", shortName: "DP", region: "CN", type: "pro" },
  ];

  await prisma.radarValue.deleteMany();
  await prisma.trainerRadarPost.deleteMany();
  await prisma.trainerTeamHistory.deleteMany();
  await prisma.trainer.deleteMany();
  await prisma.team.deleteMany();
  // metrics は upsert しているので消さなくて良いが、他は依存関係があるので消す順序に注意

  // PostgreSQL の自動採番シーケンスをリセット
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Team_id_seq" RESTART WITH 1`);

  // Re-insert teams
  for (const team of teams) {
    await prisma.team.create({ data: team });
  }
  const allTeams = await prisma.team.findMany();

  // 3. トレーナー (Trainers) - PUACL2026 出場プレイヤー
  // PostgreSQL の自動採番シーケンスをリセット
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "Trainer_id_seq" RESTART WITH 1`,
  );

  const trainers = [
    // FENNEL メンバー
    { name: "ak1", type: "pro", teamShort: "FL" },
    { name: "py1", type: "pro", teamShort: "FL" },
    { name: "Ma・sh1o", type: "pro", teamShort: "FL" },
    { name: "b1", type: "pro", teamShort: "FL" },
    { name: "mame", type: "pro", teamShort: "FL" },
    { name: "setsunai", type: "pro", teamShort: "FL" },

    // SCARZ メンバー
    { name: "shiganaki", type: "pro", teamShort: "SZ" },
    { name: "kamenero", type: "pro", teamShort: "SZ" },
    { name: "charu", type: "pro", teamShort: "SZ" },
    { name: "kapio", type: "pro", teamShort: "SZ" },
    { name: "kusamusi", type: "pro", teamShort: "SZ" },
    { name: "okamoto", type: "pro", teamShort: "SZ" },

    // REJECT メンバー
    { name: "piui", type: "pro", teamShort: "RC" },
    { name: "satake", type: "pro", teamShort: "RC" },
    { name: "Overlord", type: "pro", teamShort: "RC" },
    { name: "Häruto", type: "pro", teamShort: "RC" },
    { name: "Pavóne", type: "pro", teamShort: "RC" },
    { name: "yumenyan", type: "pro", teamShort: "RC" },

    // ENTER FORCE.36 メンバー
    { name: "Kota", type: "pro", teamShort: "E36" },
    { name: "Nomu", type: "pro", teamShort: "E36" },
    { name: "ISKW", type: "pro", teamShort: "E36" },
    { name: "Chokol", type: "pro", teamShort: "E36" },
    { name: "ResTA", type: "pro", teamShort: "E36" },
    { name: "Dorap1n", type: "pro", teamShort: "E36" },
  ];

  for (const t of trainers) {
    const team = t.teamShort
      ? allTeams.find((tm) => tm.shortName === t.teamShort)
      : null;

    await prisma.trainer.create({
      data: {
        name: t.name,
        type: t.type,
        currentTeamId: team ? team.id : null,
        history: team
          ? {
              create: {
                teamId: team.id,
                joinedAt: new Date(),
              },
            }
          : undefined,
      },
    });
  }
  console.log("Teams and Trainers inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
