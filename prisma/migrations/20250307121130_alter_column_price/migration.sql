/*
  Warnings:

  - You are about to alter the column `price` on the `services` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(7,4)`.

*/
-- AlterTable
ALTER TABLE "services" ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(7,4);
