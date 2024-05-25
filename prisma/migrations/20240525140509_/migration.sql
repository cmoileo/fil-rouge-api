/*
  Warnings:

  - You are about to drop the `_TaskToTaskCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `task_category_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TaskToTaskCategory" DROP CONSTRAINT "_TaskToTaskCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskToTaskCategory" DROP CONSTRAINT "_TaskToTaskCategory_B_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "task_category_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TaskToTaskCategory";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_task_category_id_fkey" FOREIGN KEY ("task_category_id") REFERENCES "TaskCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
