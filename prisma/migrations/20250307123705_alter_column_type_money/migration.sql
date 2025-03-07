/*
  Warnings:

  - The `price` column on the `services` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "price",
ADD COLUMN     "price" MONEY;
