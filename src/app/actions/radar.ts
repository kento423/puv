'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getRadarMetrics() {
  try {
    return await prisma.radarMetric.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
  } catch (error) {
    console.error('Failed to fetch metrics:', error);
    return [];
  }
}

export type RadarSubmissionData = {
  trainerId: number;
  authorToken: string;
  comment?: string;
  values: Record<number, number | null>; // metricId -> value (1-10) or null
};

export async function submitRadarEvaluation(data: RadarSubmissionData) {
  try {
    const { trainerId, authorToken, comment, values } = data;

    // バリデーション: authorToken必須
    if (!authorToken) {
      return { success: false, message: '不正なユーザーIDです。' };
    }

    // バリデーション: 3項目以上の入力
    const validValues = Object.entries(values)
      .filter(([_, val]) => val !== null)
      .map(([metricIdStr, val]) => ({
        metricId: Number(metricIdStr),
        value: Number(val),
      }));

    if (validValues.length < 3) {
      return { success: false, message: '3項目以上の評価を入力してください。' };
    }

    // トランザクションで保存
    await prisma.$transaction(async (tx) => {
      // 投稿を作成
      const post = await tx.trainerRadarPost.create({
        data: {
          trainerId,
          authorToken,
          comment,
        },
      });

      // 値を保存
      await tx.radarValue.createMany({
        data: validValues.map((v) => ({
          postId: post.id,
          metricId: v.metricId,
          value: v.value,
        })),
      });
    });

    // キャッシュ更新
    revalidatePath(`/trainers/${trainerId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to submit radar evaluation:', error);
    return { success: false, message: '投稿に失敗しました。サーバーエラーが発生しました。' };
  }
}
