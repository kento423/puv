import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // クエリパラメータを取得
    const { searchParams } = new URL(req.url);
    const excludeSlug = searchParams.get("excludeSlug");
    const search = searchParams.get("search");
    const damageClass = searchParams.get("damageClass");
    const rangeType = searchParams.get("rangeType");
    const battleStyle = searchParams.get("battleStyle");

    // WHERE条件を構築
    const where: any = {};

    if (excludeSlug) {
      where.slug = { not: excludeSlug };
    }

    if (search) {
      where.OR = [
        { nameJa: { contains: search, mode: "insensitive" } },
        { nameEn: { contains: search, mode: "insensitive" } },
      ];
    }

    if (damageClass && damageClass !== "all") {
      where.damageClass = damageClass;
    }

    if (rangeType && rangeType !== "all") {
      where.rangeType = rangeType;
    }

    if (battleStyle && battleStyle !== "all") {
      where.battleStyle = battleStyle;
    }

    // データベースからポケモンデータを取得
    const pokemons = await prisma.pokemon.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
    });

    // データが存在しない場合のエラーハンドリング
    if (!pokemons || pokemons.length === 0) {
      return NextResponse.json({ error: "No Pokemon found" }, { status: 404 });
    }

    // データをJSON形式で返す
    return NextResponse.json(pokemons);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
