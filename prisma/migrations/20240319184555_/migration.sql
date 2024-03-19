/*
  Warnings:

  - You are about to drop the column `employe_count` on the `Agency` table. All the data in the column will be lost.
  - Added the required column `employee_count` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" DROP COLUMN "employe_count",
ADD COLUMN     "employee_count" INTEGER NOT NULL;
