import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { pokemonId, tier, reason, guestId } = await req.json();

    if (!pokemonId || !tier) {
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

    const newPost = await prisma.metaPost.create({
      data: {
        patchId: activePatch.id,
        pokemonId: parseInt(pokemonId, 10),
        tier,
        reason,
        guestId,
      },
      include: {
        pokemon: true,
      }
    });

    revalidatePath('/meta', 'page');
    revalidateTag('meta-posts', { expire: 0 } as any);
    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Error creating meta post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { postId, tier, reason, guestId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const post = await prisma.metaPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (guestId && guestId !== post.guestId) {
      return NextResponse.json(
        { error: "Forbidden: You don't have permission to edit this post" },
        { status: 403 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (tier !== undefined) updateData.tier = tier;
    if (reason !== undefined) updateData.reason = reason;

    const updatedPost = await prisma.metaPost.update({
      where: { id: postId },
      data: updateData,
    });

    revalidatePath('/meta', 'page');
    revalidateTag('meta-posts', { expire: 0 } as any);
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating meta post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postIdStr = searchParams.get("postId");
    const guestId = searchParams.get("guestId");

    if (!postIdStr) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 }
      );
    }

    const postId = parseInt(postIdStr, 10);

    const post = await prisma.metaPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (guestId && guestId !== post.guestId) {
      return NextResponse.json(
        { error: "Forbidden: You don't have permission to delete this post" },
        { status: 403 }
      );
    }

    await prisma.metaPost.delete({
      where: { id: postId },
    });

    revalidatePath('/meta', 'page');
    revalidateTag('meta-posts', { expire: 0 } as any);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting meta post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
