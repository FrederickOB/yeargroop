/*
  Warnings:

  - The `payment_provider_transaction_id` column on the `Donations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Donations" DROP COLUMN "payment_provider_transaction_id",
ADD COLUMN     "payment_provider_transaction_id" INTEGER;
