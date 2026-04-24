-- CreateTable
CREATE TABLE "Composition" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "guestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Composition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompositionSlot" (
    "id" SERIAL NOT NULL,
    "compositionId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "lane" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CompositionSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompositionVote" (
    "id" SERIAL NOT NULL,
    "compositionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompositionVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompositionSlot_compositionId_pokemonId_key" ON "CompositionSlot"("compositionId", "pokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "CompositionVote_compositionId_userId_key" ON "CompositionVote"("compositionId", "userId");

-- AddForeignKey
ALTER TABLE "CompositionSlot" ADD CONSTRAINT "CompositionSlot_compositionId_fkey" FOREIGN KEY ("compositionId") REFERENCES "Composition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompositionSlot" ADD CONSTRAINT "CompositionSlot_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompositionVote" ADD CONSTRAINT "CompositionVote_compositionId_fkey" FOREIGN KEY ("compositionId") REFERENCES "Composition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
