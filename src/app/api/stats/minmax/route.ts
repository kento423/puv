import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/stats/minmax
 * 正規化用の全ステータスの min/max を返す
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const levelParam = searchParams.get('level');
    const level = levelParam ? parseInt(levelParam, 10) : 15;

    const stats = await prisma.stat.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    const result: Record<string, { min: number; max: number }> = {};

    for (const stat of stats) {
      const agg = await prisma.pokemonStat.aggregate({
        where: { statId: stat.id, level },
        _min: { value: true },
        _max: { value: true },
      });
      result[stat.key] = {
        min: agg._min.value ?? 0,
        max: agg._max.value ?? 100,
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch stat min/max:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
