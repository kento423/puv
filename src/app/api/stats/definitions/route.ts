import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/stats/definitions
 * Stat マスターデータ一覧を返す
 */
export async function GET() {
  try {
    const stats = await prisma.stat.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(
      stats.map((s) => ({
        id: s.id,
        key: s.key,
        name: s.name,
        sortOrder: s.sortOrder,
        unit: s.unit,
      }))
    );
  } catch (error) {
    console.error('Failed to fetch stat definitions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
