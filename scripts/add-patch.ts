import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function addPatch() {
  const inputDateStr = process.argv[2];
  if (!inputDateStr) {
    console.error("Usage: npx tsx scripts/add-patch.ts 'YYYY-MM-DD HH:MM'");
    process.exit(1);
  }

  const releasedAt = new Date(inputDateStr);
  if (isNaN(releasedAt.getTime())) {
    console.error("❌ 無効な日付フォーマットです。 'YYYY-MM-DD HH:MM' 形式で入力してください。");
    process.exit(1);
  }

  const version = `${inputDateStr} アップデート`;

  try {
    // 既存のアクティブパッチをフラグ折る
    await prisma.gamePatch.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // 新しいパッチを追加
    const newPatch = await prisma.gamePatch.create({
      data: {
        version,
        releasedAt,
        isActive: true,
      },
    });

    console.log(`✅ 新しいパッチを追加しました: ${newPatch.version}`);
  } catch (err) {
    console.error("❌ エラーが発生しました", err);
  } finally {
    await prisma.$disconnect();
  }
}

addPatch();
