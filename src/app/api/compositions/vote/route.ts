import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { compositionId, voteType, userId } = await req.json();

    if (
      !compositionId ||
      !userId ||
      !["upvote", "downvote"].includes(voteType)
    ) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const composition = await prisma.composition.findUnique({
      where: { id: compositionId },
    });

    if (!composition) {
      return NextResponse.json(
        { error: "構成が見つかりません" },
        { status: 404 }
      );
    }

    const existingVote = await prisma.compositionVote.findUnique({
      where: {
        compositionId_userId: {
          compositionId,
          userId,
        },
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "すでに投票済みです" },
        { status: 409 }
      );
    }

    await prisma.compositionVote.create({
      data: {
        compositionId,
        userId,
        voteType,
      },
    });

    const updatedComposition = await prisma.composition.update({
      where: { id: compositionId },
      data: {
        upvotes:
          voteType === "upvote"
            ? composition.upvotes + 1
            : composition.upvotes,
        downvotes:
          voteType === "downvote"
            ? composition.downvotes + 1
            : composition.downvotes,
      },
    });

    revalidatePath("/compositions", "page");
    revalidateTag("compositions", { expire: 0 });

    return NextResponse.json({
      success: true,
      upvotes: updatedComposition.upvotes,
      downvotes: updatedComposition.downvotes,
    });
  } catch (error) {
    console.error("Error processing composition vote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
