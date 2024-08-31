/*
  Warnings:

  - Added the required column `house_number` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "house_number" INTEGER NOT NULL;
