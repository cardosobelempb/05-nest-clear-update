/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `times` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_user_id_fkey";

-- DropForeignKey
ALTER TABLE "times" DROP CONSTRAINT "times_user_id_fkey";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "services";

-- DropTable
DROP TABLE "times";

-- CreateTable
CREATE TABLE "appointment_times" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "appointment_times_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "appointment_time_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "appointment_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "appointment_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appontments" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'agendado',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "appontment_time_id" TEXT,
    "appointment_service_id" TEXT,

    CONSTRAINT "appontments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointment_times" ADD CONSTRAINT "appointment_times_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_services" ADD CONSTRAINT "appointment_services_appointment_time_id_fkey" FOREIGN KEY ("appointment_time_id") REFERENCES "appointment_times"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_services" ADD CONSTRAINT "appointment_services_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_categories" ADD CONSTRAINT "appointment_categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appontments" ADD CONSTRAINT "appontments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appontments" ADD CONSTRAINT "appontments_appontment_time_id_fkey" FOREIGN KEY ("appontment_time_id") REFERENCES "appointment_times"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appontments" ADD CONSTRAINT "appontments_appointment_service_id_fkey" FOREIGN KEY ("appointment_service_id") REFERENCES "appointment_services"("id") ON DELETE SET NULL ON UPDATE CASCADE;
