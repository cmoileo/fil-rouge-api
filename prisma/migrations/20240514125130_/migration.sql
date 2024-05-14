/*
  Warnings:

  - You are about to drop the `JobsUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobsUsers" DROP CONSTRAINT "JobsUsers_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "JobsUsers" DROP CONSTRAINT "JobsUsers_job_id_fkey";

-- DropForeignKey
ALTER TABLE "JobsUsers" DROP CONSTRAINT "JobsUsers_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "job_id" TEXT;

-- DropTable
DROP TABLE "JobsUsers";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
