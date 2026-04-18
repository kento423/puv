-- CreateTable
CREATE TABLE "MetaPost" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "reason" TEXT,
    "tier" TEXT NOT NULL DEFAULT 'op',
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "guestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetaPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BanPick" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "side" TEXT NOT NULL,
    "reason" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "guestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BanPick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BugReport" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "pokemonId" INTEGER,
    "severity" TEXT NOT NULL DEFAULT 'normal',
    "status" TEXT NOT NULL DEFAULT 'open',
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "guestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BugReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaVote" (
    "id" SERIAL NOT NULL,
    "metaPostId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetaVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BanVote" (
    "id" SERIAL NOT NULL,
    "banPickId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BanVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BugVote" (
    "id" SERIAL NOT NULL,
    "bugReportId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BugVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MetaVote_metaPostId_userId_key" ON "MetaVote"("metaPostId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "BanVote_banPickId_userId_key" ON "BanVote"("banPickId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "BugVote_bugReportId_userId_key" ON "BugVote"("bugReportId", "userId");

-- AddForeignKey
ALTER TABLE "MetaPost" ADD CONSTRAINT "MetaPost_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanPick" ADD CONSTRAINT "BanPick_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BugReport" ADD CONSTRAINT "BugReport_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaVote" ADD CONSTRAINT "MetaVote_metaPostId_fkey" FOREIGN KEY ("metaPostId") REFERENCES "MetaPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanVote" ADD CONSTRAINT "BanVote_banPickId_fkey" FOREIGN KEY ("banPickId") REFERENCES "BanPick"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BugVote" ADD CONSTRAINT "BugVote_bugReportId_fkey" FOREIGN KEY ("bugReportId") REFERENCES "BugReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
