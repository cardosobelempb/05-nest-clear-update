/*
  Warnings:

  - You are about to drop the `appontments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "appontments" DROP CONSTRAINT "appontments_service_id_fkey";

-- DropForeignKey
ALTER TABLE "appontments" DROP CONSTRAINT "appontments_time_id_fkey";

-- DropForeignKey
ALTER TABLE "appontments" DROP CONSTRAINT "appontments_user_id_fkey";

-- DropTable
DROP TABLE "appontments";
