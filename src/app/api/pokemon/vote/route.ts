import { NextResponse } from "next/server";
おimport { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { targetPokemonId, counterPokemonId, voteType, userId } =
      await req.json();

    if (
      !targetPokemonId ||
      !counterPokemonId ||
      !userId ||
      !["upvote", "downvote"].includes(voteType)
    ) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const pokemonCounter = await prisma.pokemonCounter.findUnique({
      where: { id: counterPokemonId },
    });

    if (!pokemonCounter) {
      return NextResponse.json({ error: "Counter not found" }, { status: 404 });
    }

    // 既に投票済みかチェック
    const existingVote = await prisma.vote.findUnique({
      where: {
        pokemonCounterId_userId: {
          pokemonCounterId: counterPokemonId,
          userId: userId,
        },
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "You have already voted on this counter" },
        { status: 409 }
      );
    }

    // 投票を記録
    await prisma.vote.create({
      data: {
        pokemonCounterId: counterPokemonId,
        userId: userId,
        voteType: voteType,
      },
    });

    const updatedCounter = await prisma.pokemonCounter.update({
      where: { id: counterPokemonId },
      data: {
        upvotes:
          voteType === "upvote"
            ? pokemonCounter.upvotes + 1
            : pokemonCounter.upvotes,
        downvotes:
          voteType === "downvote"
            ? pokemonCounter.downvotes + 1
            : pokemonCounter.downvotes,
      },
    });

    return NextResponse.json(updatedCounter);
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
