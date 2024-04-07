/*
  Warnings:

  - You are about to drop the column `is_finished` on the `Task` table. All the data in the column will be lost.
  - Added the required column `task_state_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "is_finished",
ADD COLUMN     "task_state_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TaskState" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "agency_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TaskState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_task_state_id_fkey" FOREIGN KEY ("task_state_id") REFERENCES "TaskState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskState" ADD CONSTRAINT "TaskState_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
