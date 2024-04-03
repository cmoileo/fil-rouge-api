-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_folder_id_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "folder_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
