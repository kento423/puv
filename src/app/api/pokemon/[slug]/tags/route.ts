import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

// POST: カスタムタグを追加
export async function POST(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname; // "/api/pokemon/[slug]/tags"
    const slug = pathname.split("/")[3];
    const { tagName, color, guestId } = await request.json();

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

    // 既にそのポケモンに同じタグが付与されているか確認
    const existingCustomTag = await prisma.pokemonCustomTag.findUnique({
      where: {
        pokemonId_tagId: {
          pokemonId: pokemon.id,
          tagId: tag.id,
        },
      },
    });

    if (existingCustomTag) {
      // 既に存在する場合、そのユーザーがまだ投票していなければ高評価としてカウント
      if (guestId) {
        const existingVote = await prisma.customTagVote.findUnique({
          where: {
            pokemonId_tagId_userId: {
              pokemonId: pokemon.id,
              tagId: tag.id,
              userId: guestId,
            },
          },
        });

        if (!existingVote) {
          await prisma.$transaction([
            prisma.customTagVote.create({
              data: {
                pokemonId: pokemon.id,
                tagId: tag.id,
                userId: guestId,
                voteType: "upvote",
              },
            }),
            prisma.pokemonCustomTag.update({
              where: {
                pokemonId_tagId: {
                  pokemonId: pokemon.id,
                  tagId: tag.id,
                },
              },
              data: {
                upvotes: { increment: 1 },
              },
            }),
          ]);
        }
      }
      
      revalidatePath(`/pokemon/${slug}`);
      revalidateTag(`pokemon-detail-${slug}`, { expire: 0 });
      return NextResponse.json({ ...existingCustomTag, tag, updated: true }, { status: 200 });
    }

    // 新規にポケモンとタグを関連付け
    const customTag = await prisma.pokemonCustomTag.create({
      data: {
        pokemonId: pokemon.id,
        tagId: tag.id,
        guestId: guestId || null,
        upvotes: guestId ? 1 : 0, // 投稿者自身の1票を入れる場合
      },
      include: {
        tag: true,
      },
    });

    // 投稿者自身の投票履歴も作成
    if (guestId) {
      await prisma.customTagVote.create({
        data: {
          pokemonId: pokemon.id,
          tagId: tag.id,
          userId: guestId,
          voteType: "upvote",
        },
      });
    }

    revalidatePath(`/pokemon/${slug}`);
    revalidateTag(`pokemon-detail-${slug}`, { expire: 0 });
    return NextResponse.json(customTag, { status: 201 });
  } catch (error) {
    console.error("Error adding custom tag:", error);
    return NextResponse.json(
      { error: "タグの追加に失敗しました" },
      { status: 500 }
    );
  }
}
