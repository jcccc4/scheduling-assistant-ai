/*
  Warnings:

  - You are about to drop the column `recDaysOfWeek` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `recEndDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `recFrequency` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "recDaysOfWeek",
DROP COLUMN "recEndDate",
DROP COLUMN "recFrequency";

-- CreateTable
CREATE TABLE "Recurrence" (
    "id" TEXT NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "endDate" TIMESTAMP(3),
    "daysOfWeek" INTEGER[],
    "eventFormId" TEXT NOT NULL,

    CONSTRAINT "Recurrence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recurrence_eventFormId_key" ON "Recurrence"("eventFormId");

-- AddForeignKey
ALTER TABLE "Recurrence" ADD CONSTRAINT "Recurrence_eventFormId_fkey" FOREIGN KEY ("eventFormId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
