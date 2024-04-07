/*
  Warnings:

  - You are about to drop the `TaskUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskUser" DROP CONSTRAINT "TaskUser_employe_id_fkey";

-- DropForeignKey
ALTER TABLE "TaskUser" DROP CONSTRAINT "TaskUser_task_id_fkey";

-- DropTable
DROP TABLE "TaskUser";

-- CreateTable
CREATE TABLE "AssignedTask" (
    "id" SERIAL NOT NULL,
    "task_id" TEXT NOT NULL,
    "employe_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AssignedTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssignedTask" ADD CONSTRAINT "AssignedTask_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignedTask" ADD CONSTRAINT "AssignedTask_employe_id_fkey" FOREIGN KEY ("employe_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
