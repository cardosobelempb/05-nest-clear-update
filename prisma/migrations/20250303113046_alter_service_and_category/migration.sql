/*
  Warnings:

  - You are about to drop the column `availableTimeId` on the `services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "appontments" DROP CONSTRAINT "appontments_available_time_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_availableTimeId_fkey";

-- AlterTable
ALTER TABLE "appontments" ALTER COLUMN "available_time_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "availableTimeId",
ADD COLUMN     "category_id" TEXT;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appontments" ADD CONSTRAINT "appontments_available_time_id_fkey" FOREIGN KEY ("available_time_id") REFERENCES "available_times"("id") ON DELETE SET NULL ON UPDATE CASCADE;
