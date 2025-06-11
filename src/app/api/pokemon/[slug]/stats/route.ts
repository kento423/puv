import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.pathname; // 例: "/api/pokemon/pikachu/counters"
  const slug = pathname.split("/")[3]; // "pikachu"

  // ポケモンのIDを取得
  const pokemon = await prisma.pokemon.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!pokemon) {
    return NextResponse.json({ error: "Pokemon not found" }, { status: 404 });
  }

  // PokemonStatデータを取得
  const stats = await prisma.pokemonStat.findMany({
    where: { pokemonId: pokemon.id },
    include: {
      stat: true, // Statモデルの詳細情報を含める
    },
  });

  return NextResponse.json(
    stats.map((stat) => ({
      id: stat.id,
      name: stat.stat.name, // ステータス名 (例: HP, Attack)
      level: stat.level, // レベル
      value: stat.value, // ステータス値
    }))
  );
}
