/*
  Warnings:

  - You are about to drop the column `assigned` on the `Task` table. All the data in the column will be lost.
  - Made the column `progress_percentage` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assigned",
ALTER COLUMN "progress_percentage" SET NOT NULL,
ALTER COLUMN "progress_percentage" SET DEFAULT 0;
