/*
  Warnings:

  - Made the column `country` on table `Organization` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Organization` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sub_region` on table `Organization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "isDonatable" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "sub_region" SET NOT NULL;
