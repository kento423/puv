import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname; // 例: "/api/pokemon/pikachu/counters"
    const slug = pathname.split("/")[3]; // "pikachu"

    // Pokemonデータをカスタムタグと一緒に取得
    const pokemon = await prisma.pokemon.findUnique({
      where: { slug },
      include: {
        customTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!pokemon) {
      return NextResponse.json({ error: "Pokemon not found" }, { status: 404 });
    }

    // カスタムタグを評価順にソート
    pokemon.customTags.sort((a, b) => {
      const scoreA = (a.upvotes || 0) - (a.downvotes || 0);
      const scoreB = (b.upvotes || 0) - (b.downvotes || 0);
      return scoreB - scoreA;
    });

    return NextResponse.json(pokemon, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
