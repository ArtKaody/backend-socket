/*
  Warnings:

  - Added the required column `category` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Articles" ADD COLUMN     "category" TEXT NOT NULL;
