import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

// DELETE: カスタムタグを削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; tagId: string }> }
) {
  try {
    const { slug, tagId } = await params;
    const tagIdNum = parseInt(tagId, 10);

    if (!slug || isNaN(tagIdNum)) {
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

    // ポケモン・タグ関連付けを削除
    await prisma.pokemonCustomTag.delete({
      where: {
        pokemonId_tagId: {
          pokemonId: pokemon.id,
          tagId: tagIdNum,
        },
      },
    });

    revalidatePath(`/pokemon/${slug}`);
    revalidateTag(`pokemon-detail-${slug}`, 'max');
    return NextResponse.json({ message: "タグを削除しました" });
  } catch (error) {
    console.error("Error deleting custom tag:", error);
    return NextResponse.json(
      { error: "タグの削除に失敗しました" },
      { status: 500 }
    );
  }
}
