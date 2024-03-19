-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "userRole" "UserRole";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userRole" DROP NOT NULL;
