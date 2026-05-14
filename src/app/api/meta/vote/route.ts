import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { metaPostId, voteType, userId } = await req.json();

    if (
      !metaPostId ||
      !userId ||
      !["upvote", "downvote"].includes(voteType)
    ) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 },
      );
    }

    const post = await prisma.metaPost.findUnique({
      where: { id: metaPostId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const existingVote = await prisma.metaVote.findUnique({
      where: {
        metaPostId_userId: {
          metaPostId,
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

    await prisma.metaVote.create({
      data: {
        metaPostId,
        userId,
        voteType,
      },
    });

    const updatedPost = await prisma.metaPost.update({
      where: { id: metaPostId },
      data: {
        upvotes: voteType === "upvote" ? post.upvotes + 1 : post.upvotes,
        downvotes: voteType === "downvote" ? post.downvotes + 1 : post.downvotes,
      },
    });

    revalidatePath('/meta', 'page');
    revalidateTag('meta-posts', { expire: 0 });
    
    return NextResponse.json({ success: true, upvotes: updatedPost.upvotes, downvotes: updatedPost.downvotes });
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
