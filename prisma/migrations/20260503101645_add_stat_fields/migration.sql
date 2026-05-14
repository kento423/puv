/*
  Warnings:

  - A unique constraint covering the columns `[pokemonId,statId,level]` on the table `PokemonStat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `Stat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `PokemonStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Stat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PokemonStat" ADD COLUMN     "guestId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Stat" ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unit" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "PokemonStat_pokemonId_statId_level_key" ON "PokemonStat"("pokemonId", "statId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "Stat_key_key" ON "Stat"("key");
