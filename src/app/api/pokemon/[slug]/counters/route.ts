import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

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

    const data = counters.map((counter) => ({
      id: counter.id,
      nameJa: counter.counterPokemon.nameJa,
      nameEn: counter.counterPokemon.nameEn,
      imageUrl: counter.counterPokemon.imageUrl,
      slug: counter.counterPokemon.slug,
      reason: counter.reason,
      counterType: counter.counterType,
      upvotes: counter.upvotes,
      downvotes: counter.downvotes,
      guestId: counter.guestId,
    }));

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("Error fetching Pokemon counters:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const slug = pathname.split("/")[3];
    const body = await request.json();

    const { selectedPokemonId, reason, counterType, guestId } = body;
    if (!selectedPokemonId || !reason) {
      return NextResponse.json(
        { error: "selectedPokemonId and reason are required" },
        { status: 400 }
      );
    }

    const targetPokemon = await prisma.pokemon.findUnique({
      where: { slug },
    });

    if (!targetPokemon) {
      return NextResponse.json(
        { error: "Target Pokemon not found" },
        { status: 404 }
      );
    }

    const newCounter = await prisma.pokemonCounter.create({
      data: {
        targetPokemonId: targetPokemon.id,
        counterPokemonId: parseInt(selectedPokemonId, 10),
        reason,
        counterType: counterType || null,
        guestId: guestId || null,
      },
    });

    revalidatePath(`/pokemon/${slug}`);
    revalidateTag(`pokemon-detail-${slug}`, 'max');
    revalidateTag(`pokemon-counters-${targetPokemon.id}`, 'max');
    return NextResponse.json(newCounter, { status: 201 });
  } catch (error) {
    console.error("Error creating PokemonCounter:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
