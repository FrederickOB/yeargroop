-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('TETIARY', 'SECONDARY', 'BASIC');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "country" TEXT,
ADD COLUMN     "type" "OrganizationType";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3);
