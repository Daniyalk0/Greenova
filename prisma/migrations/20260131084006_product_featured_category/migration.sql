/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Changed the type of `category` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `basePricePerKg` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FRUIT', 'VEGETABLE');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL,
ALTER COLUMN "basePricePerKg" SET NOT NULL;
