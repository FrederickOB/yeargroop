/*
  Warnings:

  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('success', 'declined', 'failed', 'pending');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('paystack');

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_user_id_fkey";

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "EventContributions" (
    "transaction_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "channel" TEXT,
    "payment_provider" "PaymentProvider" NOT NULL DEFAULT 'paystack',
    "payment_provider_transaction_id" TEXT,

    CONSTRAINT "EventContributions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "Donations" (
    "transaction_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "organization_year_group_id" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "channel" TEXT,
    "payment_provider" "PaymentProvider" NOT NULL DEFAULT 'paystack',
    "payment_provider_transaction_id" TEXT,

    CONSTRAINT "Donations_pkey" PRIMARY KEY ("transaction_id")
);

-- AddForeignKey
ALTER TABLE "EventContributions" ADD CONSTRAINT "EventContributions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventContributions" ADD CONSTRAINT "EventContributions_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_organization_year_group_id_fkey" FOREIGN KEY ("organization_year_group_id") REFERENCES "OrganizationYearGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
