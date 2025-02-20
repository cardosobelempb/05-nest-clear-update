/*
  Warnings:

  - You are about to drop the column `appontmentId` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `appontmentId` on the `times` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_appontmentId_fkey";

-- DropForeignKey
ALTER TABLE "times" DROP CONSTRAINT "times_appontmentId_fkey";

-- AlterTable
ALTER TABLE "appontments" ADD COLUMN     "service_id" TEXT,
ADD COLUMN     "time_id" TEXT;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "appontmentId";

-- AlterTable
ALTER TABLE "times" DROP COLUMN "appontmentId";

-- AddForeignKey
ALTER TABLE "appontments" ADD CONSTRAINT "appontments_time_id_fkey" FOREIGN KEY ("time_id") REFERENCES "times"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appontments" ADD CONSTRAINT "appontments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
