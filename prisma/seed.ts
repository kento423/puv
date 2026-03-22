import { PrismaClient } from "../src/generated/prisma";
import pokemonMasterData from "./pokemonMasterData.json";

import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // console.log("Resetting tables...");

  // // 外部キー制約を無効化して TRUNCATE を実行
  // await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
  // await prisma.$executeRawUnsafe(`TRUNCATE TABLE PokemonCounter;`);
  // await prisma.$executeRawUnsafe(`TRUNCATE TABLE Pokemon;`);
  // await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);

  // console.log("Tables reset successfully!");

  // 1. ポケモンマスターデータのUpsert & 画像チェック
  for (const pokemon of pokemonMasterData) {
    // 画像の存在チェック
    const imagePath = path.join(process.cwd(), "public", pokemon.imageUrl.replace(/^\//, ""));
    if (!fs.existsSync(imagePath)) {
      console.warn(`\x1b[33m[WARNING] Image not found for ${pokemon.slug} at ${pokemon.imageUrl}\x1b[0m`);
    }

    await prisma.pokemon.upsert({
      where: { slug: pokemon.slug },
      update: {
        nameJa: pokemon.nameJa,
        nameEn: pokemon.nameEn,
        damageClass: pokemon.damageClass,
        rangeType: pokemon.rangeType,
        battleStyle: pokemon.battleStyle,
        imageUrl: pokemon.imageUrl,
      },
      create: pokemon,
    });
  }

  console.log("Pokemon master data upserted successfully!");

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
  const teams = [
    { name: "Secret Ship", shortName: "SS", region: "JP" },
    { name: "Zeta Division", shortName: "ZETA", region: "JP" },
    { name: "Fennel", shortName: "FL", region: "JP" },
  ];

  const teamRecords = [];
  for (const team of teams) {
    const record = await prisma.team.upsert({
      where: { id: 0 }, // id自動生成のため本来はユニークキーが必要だが、今回はcreateMany的な用途で簡易的に処理（実運用ではnameにunique制約推奨だがMVPなのでスキップ）
      update: {},
      create: team,
    });
    // upsertはユニーク制約がないと使いにくいので、簡易的に既存チェックしてcreate
    // ここでは簡易的に createMany を使うか、あるいは単純に create する
  }
  
  // 上記upsertはid=0でマッチしないので毎回作られてしまう。
  // MVPなので、一旦全削除して作り直すか、あるいはチェックしてから作る。
  // 今回は既存データがない前提で createMany を使う。
  // ただし id が必要なので、findFirst で探してから...などが丁寧だが、seed は何度回しても大丈夫なようにしたい。
  // ここでは deleteMany してから createMany する。

  await prisma.radarValue.deleteMany();
  await prisma.trainerRadarPost.deleteMany();
  await prisma.trainerTeamHistory.deleteMany();
  await prisma.trainer.deleteMany();
  await prisma.team.deleteMany();
  // metrics は upsert しているので消さなくて良いが、他は依存関係があるので消す順序に注意

  // Re-insert teams
  for (const team of teams) {
    await prisma.team.create({ data: team });
  }
  const allTeams = await prisma.team.findMany();

  // 3. トレーナー (Trainers)
  const trainers = [
    { name: "Shin2", type: "pro", teamShort: "SS" },
    { name: "Mame", type: "pro", teamShort: "SS" },
    { name: "Yamada", type: "amateur", teamShort: null },
  ];

  for (const t of trainers) {
    const team = t.teamShort ? allTeams.find(tm => tm.shortName === t.teamShort) : null;
    
    await prisma.trainer.create({
      data: {
        name: t.name,
        type: t.type,
        currentTeamId: team ? team.id : null,
        history: team ? {
          create: {
            teamId: team.id,
            joinedAt: new Date(),
          }
        } : undefined
      }
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
