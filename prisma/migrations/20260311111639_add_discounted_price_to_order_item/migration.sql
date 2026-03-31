/*
  Warnings:

  - You are about to drop the column `price` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `discountPercent` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountedPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineTotal` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "price",
ADD COLUMN     "discountPercent" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "discountedPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lineTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "originalPrice" DOUBLE PRECISION NOT NULL;
