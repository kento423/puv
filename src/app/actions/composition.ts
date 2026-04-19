import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

/** 構成一覧用の型 */
export interface CompositionListItem {
  id: number;
  title: string | null;
  description: string | null;
  upvotes: number;
  downvotes: number;
  guestId: string | null;
  createdAt: string;
  slots: {
    id: number;
    pokemonId: number;
    lane: string;
    sortOrder: number;
    pokemon: {
      id: number;
      nameJa: string;
      nameEn: string;
      slug: string;
      imageUrl: string | null;
      battleStyle: string;
    };
  }[];
}

/**
 * 構成一覧を取得（upvotes降順）
 */
export const getCompositions = unstable_cache(
  async (): Promise<CompositionListItem[]> => {
    try {
      const data = await prisma.composition.findMany({
        orderBy: { upvotes: 'desc' },
        include: {
          slots: {
            include: {
              pokemon: {
                select: {
                  id: true,
                  nameJa: true,
                  nameEn: true,
                  slug: true,
                  imageUrl: true,
                  battleStyle: true,
                },
              },
            },
            orderBy: { sortOrder: 'asc' },
          },
        },
      });

      return data.map((comp) => ({
        id: comp.id,
        title: comp.title,
        description: comp.description,
        upvotes: comp.upvotes,
        downvotes: comp.downvotes,
        guestId: comp.guestId,
        createdAt: comp.createdAt.toISOString(),
        slots: comp.slots.map((slot) => ({
          id: slot.id,
          pokemonId: slot.pokemonId,
          lane: slot.lane,
          sortOrder: slot.sortOrder,
          pokemon: {
            id: slot.pokemon.id,
            nameJa: slot.pokemon.nameJa,
            nameEn: slot.pokemon.nameEn,
            slug: slot.pokemon.slug,
            imageUrl: slot.pokemon.imageUrl,
            battleStyle: slot.pokemon.battleStyle,
          },
        })),
      }));
    } catch (error) {
      console.error('Failed to fetch compositions:', error);
      return [];
    }
  },
  ['compositions'],
  { revalidate: 60, tags: ['compositions'] }
);
