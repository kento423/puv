import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

/** ポケモン一覧用の型 */
export interface PokemonListItem {
  id: number;
  slug: string;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  damageClass: string;
  rangeType: string;
  battleStyle: string;
}

/** ポケモン一覧用のユニーク値 */
export interface PokemonUniqueValues {
  damageClasses: string[];
  rangeTypes: string[];
  battleStyles: string[];
}

/** カウンター情報の型 */
export interface PokemonCounterItem {
  id: number;
  nameJa: string;
  nameEn: string;
  imageUrl: string;
  slug: string;
  reason: string;
  counterType: 'hard' | 'soft' | null;
  upvotes: number;
  downvotes: number;
  userId: string | null;
  guestId: string | null;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
}

/**
 * ポケモン一覧を取得（フィルター用のユニーク値も同時に返す）
 */
export const getPokemonList = unstable_cache(
  async (): Promise<{
    pokemons: PokemonListItem[];
    uniqueValues: PokemonUniqueValues;
  }> => {
    try {
      const data = await prisma.pokemon.findMany({
        orderBy: { id: 'asc' },
      });

      const pokemons: PokemonListItem[] = data.map((p) => ({
        id: p.id,
        slug: p.slug,
        nameJa: p.nameJa,
        nameEn: p.nameEn,
        imageUrl: p.imageUrl ?? '',
        damageClass: p.damageClass,
        rangeType: p.rangeType,
        battleStyle: p.battleStyle,
      }));

      const uniqueValues: PokemonUniqueValues = {
        damageClasses: Array.from(new Set(data.map((p) => p.damageClass))).sort(),
        rangeTypes: Array.from(new Set(data.map((p) => p.rangeType))).sort(),
        battleStyles: Array.from(new Set(data.map((p) => p.battleStyle))).sort(),
      };

      return { pokemons, uniqueValues };
    } catch (error) {
      console.error('Failed to fetch pokemon list:', error);
      return { pokemons: [], uniqueValues: { damageClasses: [], rangeTypes: [], battleStyles: [] } };
    }
  },
  ['pokemon-list'],
  { revalidate: 60, tags: ['pokemon-list'] }
);

/**
 * slugからポケモン詳細を取得（カスタムタグとカウンターを一度に取得）
 */
export async function getPokemonBySlug(slug: string) {
  return unstable_cache(
    async () => {
      try {
        const pokemon = await prisma.pokemon.findUnique({
          where: { slug },
          include: {
            customTags: {
              include: {
                tag: true,
              },
            },
            targetOf: {
              include: {
                counterPokemon: true,
              },
            },
          },
        });
        if (!pokemon) return null;

        // カスタムタグを評価順（upvotes - downvotes）にソート
        pokemon.customTags.sort((a, b) => {
          const scoreA = (a.upvotes || 0) - (a.downvotes || 0);
          const scoreB = (b.upvotes || 0) - (b.downvotes || 0);
          return scoreB - scoreA;
        });

        return pokemon;
      } catch (error) {
        console.error(`Failed to fetch pokemon ${slug}:`, error);
        return null;
      }
    },
    ['pokemon-detail', slug],
    { 
      revalidate: 3600, 
      tags: ['pokemon-detail', `pokemon-detail-${slug}`] 
    }
  )();
}

/**
 * ポケモンのカウンター一覧を取得（キャッシュ済み）
 */
export async function getPokemonCounters(pokemonId: number): Promise<PokemonCounterItem[]> {
  return unstable_cache(
    async () => {
      try {
        const counters = await prisma.pokemonCounter.findMany({
          where: { targetPokemonId: pokemonId },
          include: {
            counterPokemon: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              }
            }
          },
        });

        return counters.map((counter) => ({
          id: counter.id,
          nameJa: counter.counterPokemon.nameJa,
          nameEn: counter.counterPokemon.nameEn,
          imageUrl: counter.counterPokemon.imageUrl ?? '',
          slug: counter.counterPokemon.slug,
          reason: counter.reason ?? '',
          counterType: counter.counterType as 'hard' | 'soft' | null,
          upvotes: counter.upvotes,
          downvotes: counter.downvotes,
          userId: counter.userId,
          guestId: counter.guestId,
          user: counter.user,
        }));
      } catch (error) {
        console.error(`Failed to fetch counters for pokemon ${pokemonId}:`, error);
        return [];
      }
    },
    ['pokemon-counters', pokemonId.toString()],
    { 
      revalidate: 3600, 
      tags: ['pokemon-counters', `pokemon-counters-${pokemonId}`] 
    }
  )();
}

// ============================================
// ステータス関連のデータ取得関数
// ============================================

/** Stat定義の型 */
export interface StatDefinition {
  id: number;
  key: string;
  name: string;
  sortOrder: number;
  unit: string;
}

/** ポケモンステータスの型 */
export interface PokemonStatItem {
  statId: number;
  statKey: string;
  statName: string;
  unit: string;
  level: number;
  value: number;
  guestId: string | null;
  updatedAt: string; // ISO文字列
}

/** Min/Max 正規化用の型 */
export interface StatMinMax {
  [statKey: string]: { min: number; max: number };
}

/**
 * Stat マスターデータを取得
 */
export const getStatDefinitions = unstable_cache(
  async (): Promise<StatDefinition[]> => {
    try {
      const stats = await prisma.stat.findMany({
        orderBy: { sortOrder: 'asc' },
      });
      return stats.map((s) => ({
        id: s.id,
        key: s.key,
        name: s.name,
        sortOrder: s.sortOrder,
        unit: s.unit,
      }));
    } catch (error) {
      console.error('Failed to fetch stat definitions:', error);
      return [];
    }
  },
  ['stat-definitions'],
  { revalidate: 3600, tags: ['stat-definitions'] }
);

/**
 * 特定ポケモンの全レベル・全ステータスを取得
 */
export async function getPokemonStats(pokemonId: number): Promise<PokemonStatItem[]> {
  return unstable_cache(
    async () => {
      try {
        const stats = await prisma.pokemonStat.findMany({
          where: { pokemonId },
          include: { stat: true },
          orderBy: [{ stat: { sortOrder: 'asc' } }, { level: 'asc' }],
        });
        return stats.map((s) => ({
          statId: s.statId,
          statKey: s.stat.key,
          statName: s.stat.name,
          unit: s.stat.unit,
          level: s.level,
          value: s.value,
          guestId: s.guestId,
          updatedAt: s.updatedAt.toISOString(),
        }));
      } catch (error) {
        console.error(`Failed to fetch stats for pokemon ${pokemonId}:`, error);
        return [];
      }
    },
    ['pokemon-stats', pokemonId.toString()],
    {
      revalidate: 60,
      tags: ['pokemon-stats', `pokemon-stats-${pokemonId}`],
    }
  )();
}

/**
 * 正規化用の全ポケモン・全レベルの min/max を取得
 */
export const getStatMinMax = unstable_cache(
  async (): Promise<StatMinMax> => {
    try {
      const stats = await prisma.stat.findMany({
        orderBy: { sortOrder: 'asc' },
      });
      const result: StatMinMax = {};

      for (const stat of stats) {
        const agg = await prisma.pokemonStat.aggregate({
          where: { statId: stat.id },
          _min: { value: true },
          _max: { value: true },
        });
        result[stat.key] = {
          min: agg._min.value ?? 0,
          max: agg._max.value ?? 100,
        };
      }

      return result;
    } catch (error) {
      console.error('Failed to fetch stat min/max:', error);
      return {};
    }
  },
  ['stat-min-max'],
  { revalidate: 60, tags: ['stat-min-max'] }
);

/**
 * 全ポケモンの特定レベルのステータス一覧を取得
 */
export async function getAllPokemonStatsForLevel(level: number) {
  return unstable_cache(
    async () => {
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

        return pokemons.map((p) => ({
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
      } catch (error) {
        console.error(`Failed to fetch all pokemon stats for level ${level}:`, error);
        return [];
      }
    },
    ['all-pokemon-stats', `level-${level}`],
    {
      revalidate: 60,
      tags: ['all-pokemon-stats', `all-pokemon-stats-level-${level}`],
    }
  )();
}
