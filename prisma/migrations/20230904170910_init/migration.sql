-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "emaiil" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "other_nnames" TEXT,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
