/*
  Warnings:

  - You are about to alter the column `zipcode` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Property` MODIFY `zipcode` INTEGER NOT NULL;
