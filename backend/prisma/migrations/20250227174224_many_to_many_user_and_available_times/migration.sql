/*
  Warnings:

  - You are about to drop the column `user_id` on the `available_times` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "available_times" DROP CONSTRAINT "available_times_user_id_fkey";

-- AlterTable
ALTER TABLE "available_times" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "UserOnAvailableTime" (
    "user_id" TEXT NOT NULL,
    "available_time_id" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UserOnAvailableTime_pkey" PRIMARY KEY ("user_id","available_time_id")
);

-- AddForeignKey
ALTER TABLE "available_times" ADD CONSTRAINT "available_times_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnAvailableTime" ADD CONSTRAINT "UserOnAvailableTime_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnAvailableTime" ADD CONSTRAINT "UserOnAvailableTime_available_time_id_fkey" FOREIGN KEY ("available_time_id") REFERENCES "available_times"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
