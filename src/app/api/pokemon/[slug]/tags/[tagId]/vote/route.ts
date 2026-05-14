import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; tagId: string }> }
) {
  try {
    const { slug, tagId } = await params;
    const tagIdNum = parseInt(tagId, 10);
    const { userId, voteType } = await request.json(); // userId is guestId from localStorage

    if (!slug || isNaN(tagIdNum) || !userId || !["upvote", "downvote"].includes(voteType)) {
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

    // 既存の投票を確認
    const existingVote = await prisma.customTagVote.findUnique({
      where: {
        pokemonId_tagId_userId: {
          pokemonId: pokemon.id,
          tagId: tagIdNum,
          userId,
        },
      },
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // 同じ投票なら取り消し
        await prisma.$transaction([
          prisma.customTagVote.delete({
            where: { id: existingVote.id },
          }),
          prisma.pokemonCustomTag.update({
            where: {
              pokemonId_tagId: {
                pokemonId: pokemon.id,
                tagId: tagIdNum,
              },
            },
            data: {
              [voteType === "upvote" ? "upvotes" : "downvotes"]: {
                decrement: 1,
              },
            },
          }),
        ]);
        
        revalidatePath(`/pokemon/${slug}`);
      revalidateTag(`pokemon-detail-${slug}`, { expire: 0 });
        return NextResponse.json({ message: "投票を取り消しました", action: "removed" });
      } else {
        // 逆の投票なら切り替え
        await prisma.$transaction([
          prisma.customTagVote.update({
            where: { id: existingVote.id },
            data: { voteType },
          }),
          prisma.pokemonCustomTag.update({
            where: {
              pokemonId_tagId: {
                pokemonId: pokemon.id,
                tagId: tagIdNum,
              },
            },
            data: {
              upvotes: {
                [voteType === "upvote" ? "increment" : "decrement"]: 1,
              },
              downvotes: {
                [voteType === "downvote" ? "increment" : "decrement"]: 1,
              },
            },
          }),
        ]);
        
        revalidatePath(`/pokemon/${slug}`);
      revalidateTag(`pokemon-detail-${slug}`, { expire: 0 });
        return NextResponse.json({ message: "投票を更新しました", action: "updated" });
      }
    } else {
      // 新規投票
      await prisma.$transaction([
        prisma.customTagVote.create({
          data: {
            pokemonId: pokemon.id,
            tagId: tagIdNum,
            userId,
            voteType,
          },
        }),
        prisma.pokemonCustomTag.update({
          where: {
            pokemonId_tagId: {
              pokemonId: pokemon.id,
              tagId: tagIdNum,
            },
          },
          data: {
            [voteType === "upvote" ? "upvotes" : "downvotes"]: {
              increment: 1,
            },
          },
        }),
      ]);
      
      revalidatePath(`/pokemon/${slug}`);
      revalidateTag(`pokemon-detail-${slug}`, { expire: 0 });
      return NextResponse.json({ message: "投票を受け付けました", action: "added" });
    }
  } catch (error) {
    console.error("Error voting on tag:", error);
    return NextResponse.json(
      { error: "投票に失敗しました" },
      { status: 500 }
    );
  }
}
