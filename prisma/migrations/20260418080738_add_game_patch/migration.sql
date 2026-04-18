/*
  Warnings:

  - Added the required column `patchId` to the `BanPick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patchId` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patchId` to the `MetaPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BanPick" ADD COLUMN     "patchId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BugReport" ADD COLUMN     "patchId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MetaPost" ADD COLUMN     "patchId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GamePatch" (
    "id" SERIAL NOT NULL,
    "version" TEXT NOT NULL,
    "releasedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GamePatch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MetaPost" ADD CONSTRAINT "MetaPost_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "GamePatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanPick" ADD CONSTRAINT "BanPick_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "GamePatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BugReport" ADD CONSTRAINT "BugReport_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "GamePatch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
