-- AlterTable
ALTER TABLE "PokemonCustomTag" ADD COLUMN     "downvotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "guestId" TEXT,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "CustomTagVote" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomTagVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagReport" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "reporterGuestId" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomTagVote_pokemonId_tagId_userId_key" ON "CustomTagVote"("pokemonId", "tagId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "TagReport_pokemonId_tagId_reporterGuestId_key" ON "TagReport"("pokemonId", "tagId", "reporterGuestId");

-- AddForeignKey
ALTER TABLE "CustomTagVote" ADD CONSTRAINT "CustomTagVote_pokemonId_tagId_fkey" FOREIGN KEY ("pokemonId", "tagId") REFERENCES "PokemonCustomTag"("pokemonId", "tagId") ON DELETE CASCADE ON UPDATE CASCADE;
