'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma';

export type TrainerWithTeam = Prisma.TrainerGetPayload<{
  include: { team: true; _count: { select: { radarPosts: true } } };
}>;

export async function getTrainers() {
  try {
    const trainers = await prisma.trainer.findMany({
      include: {
        team: true,
        _count: {
          select: { radarPosts: true },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return trainers;
  } catch (error) {
    console.error('Failed to fetch trainers:', error);
    return [];
  }
}

export type TrainerDetail = Prisma.TrainerGetPayload<{
  include: {
    team: true;
    history: { include: { team: true } };
    radarPosts: {
      include: { radarValues: { include: { metric: true } } };
      orderBy: { createdAt: 'desc' };
      take: 10;
    };
  };
}> & {
  averageStats: Record<string, number>;
};

export async function getTrainer(id: number) {
  try {
    const trainer = await prisma.trainer.findUnique({
      where: { id },
      include: {
        team: true,
        _count: {
          select: { radarPosts: true },
        },
        history: {
          include: { team: true },
          orderBy: { joinedAt: 'desc' },
        },
        radarPosts: {
          include: {
            radarValues: {
              include: { metric: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10, // 最近の10件のみ表示（MVP）
        },
      },
    });

    if (!trainer) return null;

    // 平均値の計算
    // 全投稿を取得して計算するか、集計クエリを使うか。
    // MVPなら全投稿（あるいは直近100件とか）から計算で良い。
    // 集計クエリ (groupBy) を使う方が効率的。
    const aggregations = await prisma.radarValue.groupBy({
      by: ['metricId'],
      where: {
        post: {
          trainerId: id,
        },
      },
      _avg: {
        value: true,
      },
    });

    // metricId から key (macro, micro etc) へのマップが必要
    const metrics = await prisma.radarMetric.findMany();
    const metricMap = new Map(metrics.map((m) => [m.id, m.key]));

    const averageStats: Record<string, number> = {};
    
    // 初期値を0に
    metrics.forEach(m => {
      averageStats[m.key] = 0;
    });

    aggregations.forEach((agg) => {
      const key = metricMap.get(agg.metricId);
      if (key && agg._avg.value) {
        averageStats[key] = Number(agg._avg.value.toFixed(1));
      }
    });

    return {
      ...trainer,
      averageStats,
    };
  } catch (error) {
    console.error(`Failed to fetch trainer ${id}:`, error);
    return null;
  }
}

export async function createTrainer(data: {
  name: string;
  type: string;
  teamId?: number;
}) {
  try {
    const trainer = await prisma.trainer.create({
      data: {
        name: data.name,
        type: data.type,
        currentTeamId: data.teamId || null,
        status: 'active',
      },
    });

    // 初期所属履歴を作成
    if (data.teamId) {
      await prisma.trainerTeamHistory.create({
        data: {
          trainerId: trainer.id,
          teamId: data.teamId,
          joinedAt: new Date(),
        },
      });
    }

    revalidatePath('/trainers');
    return { success: true, trainer };
  } catch (error) {
    console.error('Failed to create trainer:', error);
    return { success: false, message: 'トレーナーの追加に失敗しました。' };
  }
}

export async function getTeams() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { name: 'asc' },
    });
    return teams;
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    return [];
  }
}
