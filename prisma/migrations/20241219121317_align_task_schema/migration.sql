/*
  Warnings:

  - The values [daily,weekly,monthly] on the enum `Frequency` will be removed. If these variants are still used in the database, this will fail.
  - The values [high,medium,low] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Frequency_new" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');
ALTER TABLE "Recurrence" ALTER COLUMN "frequency" TYPE "Frequency_new" USING ("frequency"::text::"Frequency_new");
ALTER TYPE "Frequency" RENAME TO "Frequency_old";
ALTER TYPE "Frequency_new" RENAME TO "Frequency";
DROP TYPE "Frequency_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('HIGH', 'MEDIUM', 'LOW');
ALTER TABLE "Task" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "Priority_old";
COMMIT;
