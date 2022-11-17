/*
  Warnings:

  - You are about to drop the column `createdAt` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `currentQuantity` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `product_order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `product_order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id,order_id]` on the table `product_order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `client_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_quantity` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `product_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `product_order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_clientId_fkey";

-- DropForeignKey
ALTER TABLE "product_order" DROP CONSTRAINT "product_order_orderId_fkey";

-- DropForeignKey
ALTER TABLE "product_order" DROP CONSTRAINT "product_order_productId_fkey";

-- DropIndex
DROP INDEX "product_order_productId_orderId_key";

-- AlterTable
ALTER TABLE "client" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "clientId",
DROP COLUMN "createdAt",
ADD COLUMN     "client_id" TEXT NOT NULL,
ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "createdAt",
DROP COLUMN "currentQuantity",
DROP COLUMN "isActive",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_quantity" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "product_order" DROP COLUMN "orderId",
DROP COLUMN "productId",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_order_product_id_order_id_key" ON "product_order"("product_id", "order_id");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
