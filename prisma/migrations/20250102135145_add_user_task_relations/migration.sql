/*
  Warnings:

  - You are about to drop the column `eventFormId` on the `Recurrence` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taskId]` on the table `Recurrence` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId` to the `Recurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recurrence" DROP CONSTRAINT "Recurrence_eventFormId_fkey";

-- DropIndex
DROP INDEX "Recurrence_eventFormId_key";

-- AlterTable
ALTER TABLE "Recurrence" DROP COLUMN "eventFormId",
ADD COLUMN     "taskId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recurrence_taskId_key" ON "Recurrence"("taskId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recurrence" ADD CONSTRAINT "Recurrence_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
