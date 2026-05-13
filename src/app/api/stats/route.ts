import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

/**
 * GET /api/stats?pokemonId={id}&level={level}
 * 特定ポケモン・レベルのステータスを取得
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pokemonId = parseInt(searchParams.get('pokemonId') || '0', 10);
  const level = parseInt(searchParams.get('level') || '15', 10);

  if (!pokemonId) {
    return NextResponse.json({ error: 'pokemonId is required' }, { status: 400 });
  }

  try {
    const stats = await prisma.pokemonStat.findMany({
      where: { pokemonId, level },
      include: { stat: true },
      orderBy: { stat: { sortOrder: 'asc' } },
    });

    const result = stats.map((s) => ({
      statId: s.statId,
      statKey: s.stat.key,
      statName: s.stat.name,
      unit: s.stat.unit,
      level: s.level,
      value: s.value,
      guestId: s.guestId,
      updatedAt: s.updatedAt.toISOString(),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PUT /api/stats
 * ステータスの更新（upsert）
 * Body: { pokemonId, statId, level, value, guestId }
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { pokemonId, statId, level, value, guestId } = body;

    if (!pokemonId || !statId || !level || value === undefined || value === null) {
      return NextResponse.json(
        { error: 'pokemonId, statId, level, value are required' },
        { status: 400 }
      );
    }

    if (level < 1 || level > 15) {
      return NextResponse.json(
        { error: 'level must be between 1 and 15' },
        { status: 400 }
      );
    }

    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue) || parsedValue < 0) {
      return NextResponse.json(
        { error: 'value must be a non-negative number' },
        { status: 400 }
      );
    }

    // Upsert: 既存なら更新、なければ新規作成
    const result = await prisma.pokemonStat.upsert({
      where: {
        pokemonId_statId_level: {
          pokemonId: parseInt(pokemonId, 10),
          statId: parseInt(statId, 10),
          level: parseInt(level, 10),
        },
      },
      update: {
        value: parsedValue,
        guestId: guestId || null,
      },
      create: {
        pokemonId: parseInt(pokemonId, 10),
        statId: parseInt(statId, 10),
        level: parseInt(level, 10),
        value: parsedValue,
        guestId: guestId || null,
      },
      include: { stat: true },
    });

    // キャッシュ無効化
    revalidateTag(`pokemon-stats-${pokemonId}`, { expire: 0 } as any);
    revalidateTag('pokemon-stats', { expire: 0 } as any);
    revalidateTag('stat-min-max', { expire: 0 } as any);
    revalidateTag('all-pokemon-stats', { expire: 0 } as any);
    revalidateTag(`all-pokemon-stats-level-${level}`, { expire: 0 } as any);

    return NextResponse.json({
      statId: result.statId,
      statKey: result.stat.key,
      statName: result.stat.name,
      unit: result.stat.unit,
      level: result.level,
      value: result.value,
      guestId: result.guestId,
      updatedAt: result.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error('Failed to update stat:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}