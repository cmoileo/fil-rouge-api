/*
  Warnings:

  - Added the required column `userRole` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userRole` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "userRole" "UserRole" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userRole" "UserRole" NOT NULL;
