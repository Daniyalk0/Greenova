/*
  Warnings:

  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "addressId" INTEGER,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "pincode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "landmark" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Address_userId_idx" ON "Address"("userId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
