-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "nameJa" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "damageClass" TEXT NOT NULL,
    "rangeType" TEXT NOT NULL,
    "battleStyle" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonStat" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "statId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PokemonStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonCounter" (
    "id" SERIAL NOT NULL,
    "targetPokemonId" INTEGER NOT NULL,
    "counterPokemonId" INTEGER NOT NULL,
    "reason" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PokemonCounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_slug_key" ON "Pokemon"("slug");

-- AddForeignKey
ALTER TABLE "PokemonStat" ADD CONSTRAINT "PokemonStat_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonStat" ADD CONSTRAINT "PokemonStat_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonCounter" ADD CONSTRAINT "PokemonCounter_targetPokemonId_fkey" FOREIGN KEY ("targetPokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonCounter" ADD CONSTRAINT "PokemonCounter_counterPokemonId_fkey" FOREIGN KEY ("counterPokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
