/*
  Warnings:

  - You are about to drop the column `content` on the `appontments` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `appontments` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "appontments_slug_key";

-- AlterTable
ALTER TABLE "appontments" DROP COLUMN "content",
DROP COLUMN "slug";
