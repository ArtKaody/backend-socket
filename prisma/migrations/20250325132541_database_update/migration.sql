/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Budget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Commande` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Delivery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliveryArticle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Historique` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseRequestArticle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_purchaseRequestId_fkey";

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_commandeId_fkey";

-- DropForeignKey
ALTER TABLE "DeliveryArticle" DROP CONSTRAINT "DeliveryArticle_articleId_fkey";

-- DropForeignKey
ALTER TABLE "DeliveryArticle" DROP CONSTRAINT "DeliveryArticle_deliveryId_fkey";

-- DropForeignKey
ALTER TABLE "Historique" DROP CONSTRAINT "Historique_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseRequest" DROP CONSTRAINT "PurchaseRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseRequestArticle" DROP CONSTRAINT "PurchaseRequestArticle_articleId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseRequestArticle" DROP CONSTRAINT "PurchaseRequestArticle_purchaseRequestId_fkey";

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "Budget";

-- DropTable
DROP TABLE "Commande";

-- DropTable
DROP TABLE "Delivery";

-- DropTable
DROP TABLE "DeliveryArticle";

-- DropTable
DROP TABLE "Historique";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "PurchaseRequest";

-- DropTable
DROP TABLE "PurchaseRequestArticle";

-- DropTable
DROP TABLE "Supplier";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "departement" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRequests" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "urgent" BOOLEAN NOT NULL DEFAULT false,
    "validerId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PurchaseRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mail" TEXT,
    "tel" TEXT,
    "evaluation" INTEGER,
    "categorie" TEXT,
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Articles" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "unite" TEXT NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "image" TEXT,
    "QttOnStock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRequestArticles" (
    "id" SERIAL NOT NULL,
    "purchaseRequestId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PurchaseRequestArticles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budgets" (
    "id" SERIAL NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commandes" (
    "id" SERIAL NOT NULL,
    "purchaseRequestId" INTEGER NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "status" TEXT,
    "delai" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Commandes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deliveries" (
    "id" SERIAL NOT NULL,
    "commandeId" INTEGER NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "docs" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryArticles" (
    "id" SERIAL NOT NULL,
    "deliveryId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DeliveryArticles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historiques" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Historiques_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryArticles_deliveryId_articleId_key" ON "DeliveryArticles"("deliveryId", "articleId");

-- AddForeignKey
ALTER TABLE "PurchaseRequests" ADD CONSTRAINT "PurchaseRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequestArticles" ADD CONSTRAINT "PurchaseRequestArticles_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES "PurchaseRequests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequestArticles" ADD CONSTRAINT "PurchaseRequestArticles_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commandes" ADD CONSTRAINT "Commandes_purchaseRequestId_fkey" FOREIGN KEY ("purchaseRequestId") REFERENCES "PurchaseRequests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commandes" ADD CONSTRAINT "Commandes_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliveries" ADD CONSTRAINT "Deliveries_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commandes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryArticles" ADD CONSTRAINT "DeliveryArticles_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Deliveries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryArticles" ADD CONSTRAINT "DeliveryArticles_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historiques" ADD CONSTRAINT "Historiques_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
