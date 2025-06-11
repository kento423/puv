import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname; // 例: "/api/pokemon/pikachu/counters"
    const slug = pathname.split("/")[3]; // "pikachu"

    // Pokemonデータを取得
    const pokemon = await prisma.pokemon.findUnique({
      where: { slug },
    });

    if (!pokemon) {
      return NextResponse.json({ error: "Pokemon not found" }, { status: 404 });
    }

    return NextResponse.json(pokemon);
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
