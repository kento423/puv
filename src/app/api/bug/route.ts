import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { title, description, category, pokemonId, severity, guestId } = await req.json();

    if (!title || !category) {
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

    const newReport = await prisma.bugReport.create({
      data: {
        patchId: activePatch.id,
        title,
        description,
        category,
        pokemonId: pokemonId ? parseInt(pokemonId, 10) : null,
        severity: severity || "normal",
        guestId,
      },
      include: {
        pokemon: true,
      }
    });

    revalidatePath('/meta');
    revalidateTag('bug-reports', 'max' as any);
    return NextResponse.json(newReport);
  } catch (error) {
    console.error("Error creating bug report:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { reportId, title, description, category, severity, status, guestId } = await req.json();

    if (!reportId) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 }
      );
    }

    const report = await prisma.bugReport.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      return NextResponse.json({ error: "Bug report not found" }, { status: 404 });
    }

    // ステータス更新は別扱いにするなど柔軟にしてもよいが、一旦シンプルに
    if (guestId && guestId !== report.guestId && !status) { // ステータス変更だけは管理者用にする等の拡張用
      return NextResponse.json(
        { error: "Forbidden: You don't have permission to edit this post" },
        { status: 403 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (severity !== undefined) updateData.severity = severity;
    if (status !== undefined) updateData.status = status;

    const updatedReport = await prisma.bugReport.update({
      where: { id: reportId },
      data: updateData,
    });

    revalidatePath('/meta');
    revalidateTag('bug-reports', 'max' as any);
    return NextResponse.json(updatedReport);
  } catch (error) {
    console.error("Error updating bug report:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const reportIdStr = searchParams.get("reportId");
    const guestId = searchParams.get("guestId");

    if (!reportIdStr) {
      return NextResponse.json(
        { error: "reportId is required" },
        { status: 400 }
      );
    }

    const reportId = parseInt(reportIdStr, 10);

    const report = await prisma.bugReport.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    if (guestId && guestId !== report.guestId) {
      return NextResponse.json(
        { error: "Forbidden: You don't have permission to delete this post" },
        { status: 403 }
      );
    }

    await prisma.bugReport.delete({
      where: { id: reportId },
    });

    revalidatePath('/meta');
    revalidateTag('bug-reports', 'max' as any);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting bug report:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
