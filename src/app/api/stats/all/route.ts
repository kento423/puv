import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/stats/all?level={level}
 * 全ポケモンの特定レベルのステータス一覧を返す
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const level = parseInt(searchParams.get('level') || '15', 10);

  if (level < 1 || level > 15) {
    return NextResponse.json({ error: 'level must be between 1 and 15' }, { status: 400 });
  }

  try {
    const pokemons = await prisma.pokemon.findMany({
      orderBy: { id: 'asc' },
      include: {
        stats: {
          where: { level },
          include: { stat: true },
          orderBy: { stat: { sortOrder: 'asc' } },
        },
      },
    });

    const result = pokemons.map((p) => ({
      id: p.id,
      slug: p.slug,
      nameJa: p.nameJa,
      nameEn: p.nameEn,
      imageUrl: p.imageUrl ?? '',
      battleStyle: p.battleStyle,
      stats: p.stats.map((s) => ({
        statId: s.statId,
        statKey: s.stat.key,
        statName: s.stat.name,
        unit: s.stat.unit,
        value: s.value,
        updatedAt: s.updatedAt.toISOString(),
      })),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch all pokemon stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
