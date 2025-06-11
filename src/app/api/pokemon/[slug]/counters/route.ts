import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname; // 例: "/api/pokemon/pikachu/counters"
    const slug = pathname.split("/")[3]; // "pikachu"

    const pokemon = await prisma.pokemon.findUnique({
      where: { slug },
    });

    if (!pokemon) {
      return NextResponse.json({ error: "Pokemon not found" }, { status: 404 });
    }

    const counters = await prisma.pokemonCounter.findMany({
      where: { targetPokemonId: pokemon.id },
      include: {
        counterPokemon: true,
      },
    });

    return NextResponse.json(
      counters.map((counter) => ({
        id: counter.id,
        nameJa: counter.counterPokemon.nameJa,
        nameEn: counter.counterPokemon.nameEn,
        imageUrl: counter.counterPokemon.imageUrl,
        reason: counter.reason,
        upvotes: counter.upvotes,
        downvotes: counter.downvotes,
      }))
    );
  } catch (error) {
    console.error("Error fetching Pokemon counters:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname; // 例: "/api/pokemon/pikachu/counters"
    const slug = pathname.split("/")[3]; // "pikachu"
    const body = await request.json();

    // 必要なデータが揃っているか確認
    const { selectedPokemonId, reason } = body;
    if (!selectedPokemonId || !reason) {
      return NextResponse.json(
        { error: "selectedPokemonId and reason are required" },
        { status: 400 }
      );
    }

    // slug に対応する targetPokemonId を取得
    const targetPokemon = await prisma.pokemon.findUnique({
      where: { slug },
    });

    if (!targetPokemon) {
      return NextResponse.json(
        { error: "Target Pokemon not found" },
        { status: 404 }
      );
    }

    // PokemonCounter レコードを作成
    const newCounter = await prisma.pokemonCounter.create({
      data: {
        targetPokemonId: targetPokemon.id,
        counterPokemonId: parseInt(selectedPokemonId, 10),
        reason,
      },
    });

    return NextResponse.json(newCounter, { status: 201 });
  } catch (error) {
    console.error("Error creating PokemonCounter:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
