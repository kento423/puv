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
  { revalidate: 3600, tags: ['pokemon-list'] }
);

/**
 * slugからポケモン詳細を取得（カスタムタグとカウンターを一度に取得）
 */
export const getPokemonBySlug = unstable_cache(
  async (slug: string) => {
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
      return pokemon;
    } catch (error) {
      console.error(`Failed to fetch pokemon ${slug}:`, error);
      return null;
    }
  },
  ['pokemon-detail'],
  { revalidate: 3600, tags: ['pokemon-detail'] }
);

/**
 * ポケモンのカウンター一覧を取得（キャッシュ済み）
 */
export const getPokemonCounters = unstable_cache(
  async (pokemonId: number): Promise<PokemonCounterItem[]> => {
    try {
      const counters = await prisma.pokemonCounter.findMany({
        where: { targetPokemonId: pokemonId },
        include: {
          counterPokemon: true,
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
      }));
    } catch (error) {
      console.error(`Failed to fetch counters for pokemon ${pokemonId}:`, error);
      return [];
    }
  },
  ['pokemon-counters'],
  { revalidate: 3600, tags: ['pokemon-counters'] }
);
