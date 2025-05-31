/*
  Warnings:

  - Made the column `nameEn` on table `Pokemon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nameJa` on table `Pokemon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Pokemon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Pokemon` MODIFY `nameEn` VARCHAR(191) NOT NULL,
    MODIFY `nameJa` VARCHAR(191) NOT NULL,
    MODIFY `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PokemonCounter` ADD COLUMN `downvotes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `upvotes` INTEGER NOT NULL DEFAULT 0;
