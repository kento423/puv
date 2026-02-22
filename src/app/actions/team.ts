'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma';

export type TeamListDetail = Prisma.TeamGetPayload<{
    include: {
        _count: { select: { trainers: true } };
    };
}>;

export async function getTeamList() {
    try {
        const teams = await prisma.team.findMany({
            include: {
                _count: {
                    select: { trainers: true },
                },
            },
            orderBy: {
                name: 'asc'
            }
        });
        return teams;
    } catch (error) {
        console.error('Failed to fetch team list:', error);
        return [];
    }
}

export type TeamDetail = Prisma.TeamGetPayload<{
    include: {
        sponsors: true;
        trainers: {
            include: {
                _count: { select: { radarPosts: true } }
            }
        };
        history: {
            include: { trainer: true },
            orderBy: { joinedAt: 'desc' },
        };
    };
}> & {
    averageStats?: Record<string, number>;
};

export async function getTeamById(id: number): Promise<TeamDetail | null> {
    try {
        const team = await prisma.team.findUnique({
            where: { id },
            include: {
                sponsors: true,
                trainers: {
                    include: {
                        _count: { select: { radarPosts: true } }
                    }
                },
                history: {
                    include: { trainer: true },
                    orderBy: { joinedAt: 'desc' },
                }
            }
        });

        if (!team) return null;

        // チームに所属する全トレーナーのレーダーチャート平均値を計算する
        const trainerIds = team.trainers.map(t => t.id);

        if (trainerIds.length > 0) {
            const aggregations = await prisma.radarValue.groupBy({
                by: ['metricId'],
                where: {
                    post: {
                        trainerId: { in: trainerIds },
                    },
                },
                _avg: {
                    value: true,
                },
            });

            const metrics = await prisma.radarMetric.findMany();
            const metricMap = new Map(metrics.map((m) => [m.id, m.key]));

            const averageStats: Record<string, number> = {};
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
                ...team,
                averageStats,
            };
        }

        return team;
    } catch (error) {
        console.error(`Failed to fetch team ${id}:`, error);
        return null;
    }
}

export async function createTeam(data: {
    name: string;
    shortName?: string;
    type: string;
    region?: string;
    twitterUrl?: string;
    websiteUrl?: string;
}) {
    try {
        const team = await prisma.team.create({
            data: {
                name: data.name,
                shortName: data.shortName || null,
                type: data.type,
                region: data.region || null,
                twitterUrl: data.twitterUrl || null,
                websiteUrl: data.websiteUrl || null,
            },
        });

        revalidatePath('/teams');
        revalidatePath('/trainers'); // トレーナー追加ダイアログ用
        return { success: true, team };
    } catch (error: any) {
        console.error('Failed to create team:', error);
        return { 
            success: false, 
            message: error?.message || 'チームの追加に失敗しました。'
        };
    }
}

export async function addTeamSponsor(data: {
    teamId: number;
    name: string;
    logoUrl?: string;
    url?: string;
}) {
    try {
        const sponsor = await prisma.teamSponsor.create({
            data: {
                teamId: data.teamId,
                name: data.name,
                logoUrl: data.logoUrl || null,
                url: data.url || null,
            },
        });

        revalidatePath(`/teams/${data.teamId}`);
        return { success: true, sponsor };
    } catch (error: any) {
        console.error('Failed to add sponsor:', error);
        return { success: false, message: error?.message || 'スポンサーの追加に失敗しました。' };
    }
}

export async function deleteTeamSponsor(id: number, teamId: number) {
    try {
        await prisma.teamSponsor.delete({
            where: { id },
        });

        revalidatePath(`/teams/${teamId}`);
        return { success: true };
    } catch (error: any) {
        console.error('Failed to delete sponsor:', error);
        return { success: false, message: error?.message || 'スポンサーの削除に失敗しました。' };
    }
}
