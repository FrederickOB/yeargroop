/*
  Warnings:

  - The primary key for the `Likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Likes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,event_id]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Likes_user_id_event_id_key" ON "Likes"("user_id", "event_id");
