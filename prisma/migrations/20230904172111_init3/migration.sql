/*
  Warnings:

  - You are about to drop the column `other_nnames` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "other_nnames",
ADD COLUMN     "other_names" TEXT;
