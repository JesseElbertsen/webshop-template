/*
  Warnings:

  - Made the column `image` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "public_id" TEXT,
ALTER COLUMN "image" SET NOT NULL;
