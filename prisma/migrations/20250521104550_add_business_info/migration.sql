-- CreateTable
CREATE TABLE "BusinessInfo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "adres" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "locatie" TEXT NOT NULL,
    "telefoon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "kvk" TEXT NOT NULL,
    "btw" TEXT NOT NULL,
    "openingHours" JSONB NOT NULL,

    CONSTRAINT "BusinessInfo_pkey" PRIMARY KEY ("id")
);
