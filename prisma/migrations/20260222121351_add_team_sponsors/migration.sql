-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "twitterUrl" TEXT,
ADD COLUMN     "websiteUrl" TEXT;

-- CreateTable
CREATE TABLE "TeamSponsor" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "url" TEXT,

    CONSTRAINT "TeamSponsor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamSponsor" ADD CONSTRAINT "TeamSponsor_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
