/*
  Warnings:

  - You are about to drop the column `dob` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "dob";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dob" TIMESTAMP(3);
