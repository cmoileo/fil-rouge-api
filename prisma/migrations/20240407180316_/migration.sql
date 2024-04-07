-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_task_state_id_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "task_state_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_task_state_id_fkey" FOREIGN KEY ("task_state_id") REFERENCES "TaskState"("id") ON DELETE SET NULL ON UPDATE CASCADE;
