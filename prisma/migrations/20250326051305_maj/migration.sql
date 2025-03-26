/*
  Warnings:

  - You are about to drop the column `QttOnStock` on the `Articles` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `Articles` table. All the data in the column will be lost.
  - Added the required column `name` to the `Articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Articles" DROP COLUMN "QttOnStock",
DROP COLUMN "nom",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "qttOnStock" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Litige" (
    "id" SERIAL NOT NULL,
    "deliveryId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "docs" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Litige_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LitigeArticles" (
    "id" SERIAL NOT NULL,
    "deliveryId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "litigeId" INTEGER,

    CONSTRAINT "LitigeArticles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LitigeArticles_deliveryId_articleId_key" ON "LitigeArticles"("deliveryId", "articleId");

-- AddForeignKey
ALTER TABLE "Litige" ADD CONSTRAINT "Litige_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Deliveries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Litige" ADD CONSTRAINT "Litige_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LitigeArticles" ADD CONSTRAINT "LitigeArticles_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Deliveries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LitigeArticles" ADD CONSTRAINT "LitigeArticles_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LitigeArticles" ADD CONSTRAINT "LitigeArticles_litigeId_fkey" FOREIGN KEY ("litigeId") REFERENCES "Litige"("id") ON DELETE SET NULL ON UPDATE CASCADE;
