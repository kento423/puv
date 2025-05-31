import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // クエリパラメータを取得
    const { searchParams } = new URL(req.url);
    const excludeSlug = searchParams.get("excludeSlug");

    // データベースからポケモンデータを取得
    const pokemons = await prisma.pokemon.findMany({
      where: excludeSlug ? { slug: { not: excludeSlug } } : undefined,
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
