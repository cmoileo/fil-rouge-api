/*
  Warnings:

  - You are about to drop the column `email` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Agency` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Agency_email_key";

-- AlterTable
ALTER TABLE "Agency" DROP COLUMN "email",
DROP COLUMN "password";
