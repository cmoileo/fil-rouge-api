-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_task_category_id_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "task_category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_task_category_id_fkey" FOREIGN KEY ("task_category_id") REFERENCES "TaskCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
