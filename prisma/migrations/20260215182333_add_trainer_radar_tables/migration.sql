-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "region" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'amateur',
    "currentTeamId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerTeamHistory" (
    "id" SERIAL NOT NULL,
    "trainerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL,
    "leftAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainerTeamHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RadarMetric" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "minValue" INTEGER NOT NULL DEFAULT 1,
    "maxValue" INTEGER NOT NULL DEFAULT 10,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RadarMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerRadarPost" (
    "id" SERIAL NOT NULL,
    "trainerId" INTEGER NOT NULL,
    "authorToken" TEXT NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainerRadarPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RadarValue" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "metricId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "RadarValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RadarMetric_key_key" ON "RadarMetric"("key");

-- CreateIndex
CREATE UNIQUE INDEX "RadarValue_postId_metricId_key" ON "RadarValue"("postId", "metricId");

-- AddForeignKey
ALTER TABLE "Trainer" ADD CONSTRAINT "Trainer_currentTeamId_fkey" FOREIGN KEY ("currentTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerTeamHistory" ADD CONSTRAINT "TrainerTeamHistory_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerTeamHistory" ADD CONSTRAINT "TrainerTeamHistory_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerRadarPost" ADD CONSTRAINT "TrainerRadarPost_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadarValue" ADD CONSTRAINT "RadarValue_postId_fkey" FOREIGN KEY ("postId") REFERENCES "TrainerRadarPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadarValue" ADD CONSTRAINT "RadarValue_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "RadarMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
