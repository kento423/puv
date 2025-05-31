import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { targetPokemonId, counterPokemonId, voteType } = await req.json();

    if (
      !targetPokemonId ||
      !counterPokemonId ||
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
