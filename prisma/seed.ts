import { PrismaClient } from "../src/generated/prisma";
import pokemonMasterData from "./pokemonMasterData.json";
import pokemonCounterData from "./pokemonCounterData.json";

const prisma = new PrismaClient();

async function main() {
  // console.log("Resetting tables...");

  // // 外部キー制約を無効化して TRUNCATE を実行
  // await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);
  // await prisma.$executeRawUnsafe(`TRUNCATE TABLE PokemonCounter;`);
  // await prisma.$executeRawUnsafe(`TRUNCATE TABLE Pokemon;`);
  // await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);

  // console.log("Tables reset successfully!");

  // 必要に応じてデータを再挿入
  await prisma.pokemon.createMany({
    data: pokemonMasterData,
    skipDuplicates: true, // 重複データをスキップ
  });

  console.log("Pokemon master data inserted successfully!");

  // PokemonCounter テーブルにデータを投入
  await prisma.pokemonCounter.createMany({
    data: pokemonCounterData,
    skipDuplicates: true, // 重複データをスキップ
  });

  console.log("PokemonCounter data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
