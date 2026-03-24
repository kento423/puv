import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  return NextResponse.json({ message: "Counter API endpoint is working" });
}

export async function PATCH(req: Request) {
  try {
    const { counterId, reason, counterType } = await req.json();

    if (!counterId) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    // counterId で PokemonCounter を直接検索
    const pokemonCounter = await prisma.pokemonCounter.findUnique({
      where: { id: counterId },
    });

    if (!pokemonCounter) {
      return NextResponse.json({ error: "Counter not found" }, { status: 404 });
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

    return NextResponse.json(updatedCounter);
  } catch (error) {
    console.error("Error updating counter reason:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
