/*
  Warnings:

  - You are about to drop the column `name` on the `available_times` table. All the data in the column will be lost.
  - Added the required column `time` to the `available_times` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "available_times" DROP COLUMN "name",
ADD COLUMN     "time" TEXT NOT NULL;
