-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "pokemonCounterId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_pokemonCounterId_userId_key" ON "Vote"("pokemonCounterId", "userId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pokemonCounterId_fkey" FOREIGN KEY ("pokemonCounterId") REFERENCES "PokemonCounter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
