/*
  Warnings:

  - Made the column `available_time_id` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `service_id` on table `appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_available_time_id_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_service_id_fkey";

-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "available_time_id" SET NOT NULL,
ALTER COLUMN "service_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_available_time_id_fkey" FOREIGN KEY ("available_time_id") REFERENCES "available_times"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
