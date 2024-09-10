/*
  Warnings:

  - A unique constraint covering the columns `[title,user]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Wallet_title_user_key" ON "Wallet"("title", "user");
