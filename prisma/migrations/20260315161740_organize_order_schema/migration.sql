/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `paymentType` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('COD', 'RAZORPAY');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'FAILED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "paymentType",
ADD COLUMN     "paymentType" "PaymentMethod" NOT NULL;

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");
