/*
  Warnings:

  - You are about to drop the `appontments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('ATTENDED', 'SCHEDULED', 'CANCELLED', 'INATTENDANCE');

-- DropForeignKey
ALTER TABLE "appontments" DROP CONSTRAINT "appontments_available_time_id_fkey";

-- DropForeignKey
ALTER TABLE "appontments" DROP CONSTRAINT "appontments_service_id_fkey";

-- DropForeignKey
ALTER TABLE "appontments" DROP CONSTRAINT "appontments_user_id_fkey";

-- DropTable
DROP TABLE "appontments";

-- DropEnum
DROP TYPE "AppontmentStatus";

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "available_time_id" TEXT,
    "service_id" TEXT,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_available_time_id_fkey" FOREIGN KEY ("available_time_id") REFERENCES "available_times"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
