import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(req: Request) {
  return NextResponse.json({ message: "Counter API endpoint is working" });
}

export async function PATCH(req: Request) {
  try {
    const { counterId, reason, counterType, guestId } = await req.json();

    if (!counterId) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    // counterId で PokemonCounter を検索（対象ポケモンのslug取得のため include 追加）
    const pokemonCounter = await prisma.pokemonCounter.findUnique({
      where: { id: counterId },
      include: { targetPokemon: true }
    });

    if (!pokemonCounter) {
      return NextResponse.json({ error: "Counter not found" }, { status: 404 });
    }

    // 権限チェック（guestIdベース）
    const isOwner = guestId && guestId === pokemonCounter.guestId;

    if (!isOwner) {
      return NextResponse.json(
        { error: "Forbidden: You don't have permission to edit this post" },
        { status: 403 }
      );
    }

    // 変更データを作成
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (reason !== undefined) updateData.reason = reason;
    if (counterType !== undefined) updateData.counterType = counterType; // nullも許容

    // 更新
    const updatedCounter = await prisma.pokemonCounter.update({
      where: { id: counterId },
      data: updateData,
    });

    // キャッシュを破棄
    const slug = pokemonCounter.targetPokemon.slug;
    const pokemonId = pokemonCounter.targetPokemon.id;
    revalidatePath(`/pokemon/${slug}`);
    revalidateTag(`pokemon-detail-${slug}`, { expire: 0 });
    revalidateTag(`pokemon-counters-${pokemonId}`, { expire: 0 });
    return NextResponse.json(updatedCounter);
  } catch (error) {
    console.error("Error updating counter reason:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const counterIdStr = searchParams.get("counterId");
    const guestId = searchParams.get("guestId");

    if (!counterIdStr) {
      return NextResponse.json(
        { error: "counterId is required" },
        { status: 400 }
      );
    }

    const counterId = parseInt(counterIdStr, 10);

    const pokemonCounter = await prisma.pokemonCounter.findUnique({
      where: { id: counterId },
      include: { targetPokemon: true }
    });

    if (!pokemonCounter) {
      return NextResponse.json({ error: "Counter not found" }, { status: 404 });
    }

    // 権限チェック（guestIdベース）
    const isOwner = guestId && guestId === pokemonCounter.guestId;

    if (!isOwner) {
      return NextResponse.json(
        { error: "Forbidden: You don't have permission to delete this post" },
        { status: 403 }
      );
    }

    await prisma.pokemonCounter.delete({
      where: { id: counterId },
    });

    // キャッシュを破棄
    const slug = pokemonCounter.targetPokemon.slug;
    const pokemonId = pokemonCounter.targetPokemon.id;
    revalidatePath(`/pokemon/${slug}`);
    revalidateTag(`pokemon-detail-${slug}`, { expire: 0 });
    revalidateTag(`pokemon-counters-${pokemonId}`, { expire: 0 });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting counter:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
