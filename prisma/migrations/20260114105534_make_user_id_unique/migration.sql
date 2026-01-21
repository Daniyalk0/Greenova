/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserLocation` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `UserLocation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserLocation" DROP CONSTRAINT "UserLocation_userId_fkey";

-- AlterTable
ALTER TABLE "UserLocation" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserLocation_userId_key" ON "UserLocation"("userId");

-- AddForeignKey
ALTER TABLE "UserLocation" ADD CONSTRAINT "UserLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
