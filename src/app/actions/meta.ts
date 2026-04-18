import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function getActivePatch() {
  return prisma.gamePatch.findFirst({
    where: { isActive: true },
    orderBy: { releasedAt: 'desc' },
  });
}

export async function getPatchById(id: number) {
  return prisma.gamePatch.findUnique({
    where: { id },
  });
}

export async function getAllPatches() {
  return prisma.gamePatch.findMany({
    orderBy: { releasedAt: 'desc' },
  });
}

export const getMetaPosts = unstable_cache(
  async (patchId: number) => {
    try {
      const posts = await prisma.metaPost.findMany({
        where: { patchId },
        orderBy: [
          { tier: 'desc' }, // upvotesでソート
          { upvotes: 'desc' }
        ],
        include: {
          pokemon: true
        }
      });
      return posts;
    } catch (error) {
      console.error("Failed to fetch meta posts:", error);
      return [];
    }
  },
  ['meta-posts'],
  { revalidate: 60, tags: ['meta-posts'] }
);

export const getBanPicks = unstable_cache(
  async (patchId: number) => {
    try {
      const picks = await prisma.banPick.findMany({
        where: { patchId },
        orderBy: {
          upvotes: 'desc'
        },
        include: {
          pokemon: true
        }
      });
      return picks;
    } catch (error) {
      console.error("Failed to fetch ban picks:", error);
      return [];
    }
  },
  ['ban-picks'],
  { revalidate: 60, tags: ['ban-picks'] }
);

export const getBugReports = unstable_cache(
  async (patchId: number) => {
    try {
      const reports = await prisma.bugReport.findMany({
        where: { patchId },
        orderBy: {
          createdAt: 'desc' // 新しい順
        },
        include: {
          pokemon: true
        }
      });
      return reports;
    } catch (error) {
      console.error("Failed to fetch bug reports:", error);
      return [];
    }
  },
  ['bug-reports'],
  { revalidate: 60, tags: ['bug-reports'] }
);
