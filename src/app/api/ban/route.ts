import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { pokemonId, side, reason, guestId } = await req.json();

    if (!pokemonId || !side) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const activePatch = await prisma.gamePatch.findFirst({ where: { isActive: true } });
    if (!activePatch) {
      return NextResponse.json(
        { error: "No active patch found to post against" },
        { status: 400 }
      );
    }

    const newPost = await prisma.banPick.create({
      data: {
        patchId: activePatch.id,
        pokemonId: parseInt(pokemonId, 10),
        side, // "first" or "second"
        reason,
        guestId,
      },
      include: {
        pokemon: true,
      }
    });

    revalidatePath('/meta', 'page');
    revalidateTag('ban-picks', { expire: 0 });
    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Error creating ban pick:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { pickId, side, reason, guestId } = await req.json();

    if (!pickId) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const pick = await prisma.banPick.findUnique({
      where: { id: pickId },
    });

    if (!pick) {
      return NextResponse.json({ error: "Ban pick not found" }, { status: 404 });
    }

    if (guestId && guestId !== pick.guestId) {
      return NextResponse.json(
        { error: "Forbidden: You don't have permission to edit this post" },
        { status: 403 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (side !== undefined) updateData.side = side;
    if (reason !== undefined) updateData.reason = reason;

    const updatedPick = await prisma.banPick.update({
      where: { id: pickId },
      data: updateData,
    });

    revalidatePath('/meta', 'page');
    revalidateTag('ban-picks', { expire: 0 });
    return NextResponse.json(updatedPick);
  } catch (error) {
    console.error("Error updating ban pick:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pickIdStr = searchParams.get("pickId");
    const guestId = searchParams.get("guestId");

    if (!pickIdStr) {
      return NextResponse.json(
        { error: "pickId is required" },
        { status: 400 }
      );
    }

    const pickId = parseInt(pickIdStr, 10);

    const pick = await prisma.banPick.findUnique({
      where: { id: pickId },
    });

    if (!pick) {
      return NextResponse.json({ error: "Ban pick not found" }, { status: 404 });
    }

    if (guestId && guestId !== pick.guestId) {
      return NextResponse.json(
        { error: "Forbidden: You don't have permission to delete this post" },
        { status: 403 }
      );
    }

    await prisma.banPick.delete({
      where: { id: pickId },
    });

    revalidatePath('/meta', 'page');
    revalidateTag('ban-picks', { expire: 0 });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting ban pick:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
