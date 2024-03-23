-- CreateTable
CREATE TABLE "PendingEmployee" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "agency_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PendingEmployee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PendingEmployee" ADD CONSTRAINT "PendingEmployee_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
