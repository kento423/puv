import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: カスタムタグを追加
export async function POST(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname; // "/api/pokemon/[slug]/tags"
    const slug = pathname.split("/")[3];
    const { tagName, color } = await request.json();

    if (!tagName || tagName.trim().length === 0) {
      return NextResponse.json(
        { error: "タグ名を入力してください" },
        { status: 400 }
      );
    }

    // ポケモンを取得
    const pokemon = await prisma.pokemon.findUnique({
      where: { slug },
    });

    if (!pokemon) {
      return NextResponse.json(
        { error: "ポケモンが見つかりません" },
        { status: 404 }
      );
    }

    // タグを取得または作成
    const tag = await prisma.tag.upsert({
      where: { name: tagName.trim() },
      update: {},
      create: {
        name: tagName.trim(),
        color: color || "gray",
      },
    });

    // ポケモンにタグを関連付け
    const customTag = await prisma.pokemonCustomTag.create({
      data: {
        pokemonId: pokemon.id,
        tagId: tag.id,
      },
      include: {
        tag: true,
      },
    });

    return NextResponse.json(customTag, { status: 201 });
  } catch (error) {
    console.error("Error adding custom tag:", error);
    return NextResponse.json(
      { error: "タグの追加に失敗しました" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
