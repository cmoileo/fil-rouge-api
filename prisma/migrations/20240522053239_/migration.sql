/*
  Warnings:

  - The primary key for the `TaskCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_TaskToTaskCategory" DROP CONSTRAINT "_TaskToTaskCategory_B_fkey";

-- AlterTable
ALTER TABLE "TaskCategory" DROP CONSTRAINT "TaskCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TaskCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TaskCategory_id_seq";

-- AlterTable
ALTER TABLE "_TaskToTaskCategory" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_TaskToTaskCategory" ADD CONSTRAINT "_TaskToTaskCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "TaskCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
