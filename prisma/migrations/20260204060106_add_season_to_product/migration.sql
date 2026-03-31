-- CreateEnum
CREATE TYPE "Season" AS ENUM ('WINTER', 'SUMMER', 'MONSOON', 'ALL');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "season" "Season" NOT NULL DEFAULT 'ALL';
