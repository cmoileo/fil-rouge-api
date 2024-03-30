/*
  Warnings:

  - The primary key for the `RolesUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "RolesUsers" DROP CONSTRAINT "RolesUsers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RolesUsers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RolesUsers_id_seq";
