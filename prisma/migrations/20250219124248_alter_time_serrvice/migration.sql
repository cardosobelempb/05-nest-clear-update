/*
  Warnings:

  - You are about to drop the column `appontment_id` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `appontment_id` on the `times` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_appontment_id_fkey";

-- DropForeignKey
ALTER TABLE "times" DROP CONSTRAINT "times_appontment_id_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "appontment_id",
ADD COLUMN     "appontmentId" TEXT;

-- AlterTable
ALTER TABLE "times" DROP COLUMN "appontment_id",
ADD COLUMN     "appontmentId" TEXT;

-- AddForeignKey
ALTER TABLE "times" ADD CONSTRAINT "times_appontmentId_fkey" FOREIGN KEY ("appontmentId") REFERENCES "appontments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_appontmentId_fkey" FOREIGN KEY ("appontmentId") REFERENCES "appontments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
