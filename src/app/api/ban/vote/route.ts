import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { banPickId, voteType, userId } = await req.json();

    if (
      !banPickId ||
      !userId ||
      !["upvote", "downvote"].includes(voteType)
    ) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 },
      );
    }

    const pick = await prisma.banPick.findUnique({
      where: { id: banPickId },
    });

    if (!pick) {
      return NextResponse.json({ error: "Ban pick not found" }, { status: 404 });
    }

    const existingVote = await prisma.banVote.findUnique({
      where: {
        banPickId_userId: {
          banPickId,
          userId,
        },
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "You have already voted" },
        { status: 409 },
      );
    }

    await prisma.banVote.create({
      data: {
        banPickId,
        userId,
        voteType,
      },
    });

    const updatedPick = await prisma.banPick.update({
      where: { id: banPickId },
      data: {
        upvotes: voteType === "upvote" ? pick.upvotes + 1 : pick.upvotes,
        downvotes: voteType === "downvote" ? pick.downvotes + 1 : pick.downvotes,
      },
    });

    revalidatePath('/meta', 'page');
    revalidateTag('ban-picks', { expire: 0 });
    
    return NextResponse.json({ success: true, upvotes: updatedPick.upvotes, downvotes: updatedPick.downvotes });
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
