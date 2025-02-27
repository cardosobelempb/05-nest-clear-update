/*
  Warnings:

  - You are about to drop the column `userId` on the `available_times` table. All the data in the column will be lost.
  - You are about to drop the `UserOnAvailableTime` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `available_times` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserOnAvailableTime" DROP CONSTRAINT "UserOnAvailableTime_available_time_id_fkey";

-- DropForeignKey
ALTER TABLE "UserOnAvailableTime" DROP CONSTRAINT "UserOnAvailableTime_user_id_fkey";

-- DropForeignKey
ALTER TABLE "available_times" DROP CONSTRAINT "available_times_userId_fkey";

-- AlterTable
ALTER TABLE "available_times" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserOnAvailableTime";

-- AddForeignKey
ALTER TABLE "available_times" ADD CONSTRAINT "available_times_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
