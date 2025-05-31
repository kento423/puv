/*
  Warnings:

  - You are about to drop the column `name` on the `Pokemon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Pokemon_name_key` ON `Pokemon`;

-- AlterTable
ALTER TABLE `Pokemon` DROP COLUMN `name`,
    ADD COLUMN `nameEn` VARCHAR(191) NULL,
    ADD COLUMN `nameJa` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Pokemon_slug_key` ON `Pokemon`(`slug`);
