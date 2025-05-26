-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "note" TEXT;
