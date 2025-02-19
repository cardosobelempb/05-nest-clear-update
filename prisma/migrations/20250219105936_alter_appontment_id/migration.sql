/*
  Warnings:

  - You are about to drop the column `appontmentI_id` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `appontmentI_id` on the `times` table. All the data in the column will be lost.
  - Added the required column `appontment_id` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appontment_id` to the `times` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_appontmentI_id_fkey";

-- DropForeignKey
ALTER TABLE "times" DROP CONSTRAINT "times_appontmentI_id_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "appontmentI_id",
ADD COLUMN     "appontment_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "times" DROP COLUMN "appontmentI_id",
ADD COLUMN     "appontment_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "times" ADD CONSTRAINT "times_appontment_id_fkey" FOREIGN KEY ("appontment_id") REFERENCES "appontments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_appontment_id_fkey" FOREIGN KEY ("appontment_id") REFERENCES "appontments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
