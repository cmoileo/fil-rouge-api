/*
  Warnings:

  - Added the required column `role` to the `PendingEmployee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PendingEmployee" ADD COLUMN     "role" "Role" NOT NULL;
