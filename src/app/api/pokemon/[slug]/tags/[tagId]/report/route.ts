import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; tagId: string }> }
) {
  try {
    const { slug, tagId } = await params;
    const tagIdNum = parseInt(tagId, 10);
    const { reporterGuestId, reason } = await request.json();

    if (!slug || isNaN(tagIdNum) || !reporterGuestId) {
      return NextResponse.json(
        { error: "無効なパラメータです" },
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

    // 通報を作成
    await prisma.tagReport.upsert({
      where: {
        pokemonId_tagId_reporterGuestId: {
          pokemonId: pokemon.id,
          tagId: tagIdNum,
          reporterGuestId: reporterGuestId,
        },
      },
      update: {
        reason: reason || "不適切なタグ",
      },
      create: {
        pokemonId: pokemon.id,
        tagId: tagIdNum,
        reporterGuestId: reporterGuestId,
        reason: reason || "不適切なタグ",
      },
    });

    return NextResponse.json({ message: "通報を受け付けました" });
  } catch (error) {
    console.error("Error reporting tag:", error);
    return NextResponse.json(
      { error: "通報に失敗しました" },
      { status: 500 }
    );
  }
}
