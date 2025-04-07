/*
  Warnings:

  - Added the required column `condition` to the `listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `listing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SOLD');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR');

-- AlterTable
ALTER TABLE "listing" ADD COLUMN     "condition" "Condition" NOT NULL,
ADD COLUMN     "status" "ListingStatus" NOT NULL;
