/*
  Warnings:

  - You are about to alter the column `discountPercent` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `discountedPrice` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `lineTotal` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `originalPrice` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "discountPercent" SET DATA TYPE INTEGER,
ALTER COLUMN "discountedPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "lineTotal" SET DATA TYPE INTEGER,
ALTER COLUMN "originalPrice" SET DATA TYPE INTEGER;
