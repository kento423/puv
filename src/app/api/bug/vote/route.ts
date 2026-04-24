import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { bugReportId, voteType, userId } = await req.json();

    if (
      !bugReportId ||
      !userId ||
      !["upvote", "downvote"].includes(voteType)
    ) {
      return NextResponse.json(
        { error: "Invalid request parameters" },
        { status: 400 },
      );
    }

    const report = await prisma.bugReport.findUnique({
      where: { id: bugReportId },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const existingVote = await prisma.bugVote.findUnique({
      where: {
        bugReportId_userId: {
          bugReportId,
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

    await prisma.bugVote.create({
      data: {
        bugReportId,
        userId,
        voteType,
      },
    });

    const updatedReport = await prisma.bugReport.update({
      where: { id: bugReportId },
      data: {
        upvotes: voteType === "upvote" ? report.upvotes + 1 : report.upvotes,
        downvotes: voteType === "downvote" ? report.downvotes + 1 : report.downvotes,
      },
    });

    revalidatePath('/meta', 'page');
    revalidateTag('bug-reports', { expire: 0 } as any);
    
    return NextResponse.json({ success: true, upvotes: updatedReport.upvotes, downvotes: updatedReport.downvotes });
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
