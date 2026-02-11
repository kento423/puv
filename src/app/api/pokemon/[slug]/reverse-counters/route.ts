import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    // 対象ポケモンを取得
    const targetPokemon = await prisma.pokemon.findUnique({
      where: { slug },
    });

    if (!targetPokemon) {
      return NextResponse.json(
        { error: "ポケモンが見つかりません" },
        { status: 404 }
      );
    }

    // このポケモンを対策するポケモンのカウンター一覧を取得
    const reverseCounters = await prisma.pokemonCounter.findMany({
      where: {
        counterPokemonId: targetPokemon.id,
      },
      include: {
        targetPokemon: true,
      },
      orderBy: [{ upvotes: "desc" }, { downvotes: "asc" }],
    });

    // レスポンス形式を整える
    const formattedCounters = reverseCounters.map((counter: any) => ({
      id: counter.id,
      nameJa: counter.targetPokemon.nameJa,
      nameEn: counter.targetPokemon.nameEn,
      imageUrl: counter.targetPokemon.imageUrl,
      reason: counter.reason,
      upvotes: counter.upvotes,
      downvotes: counter.downvotes,
      slug: counter.targetPokemon.slug,
    }));

    return NextResponse.json(formattedCounters);
  } catch (error) {
    console.error("Error fetching reverse counters:", error);
    return NextResponse.json(
      { error: "逆向きカウンター取得に失敗しました" },
      { status: 500 }
    );
  }
}
