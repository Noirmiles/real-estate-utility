/*
  Warnings:

  - Added the required column `zipcode` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Property` ADD COLUMN `zipcode` VARCHAR(191) NOT NULL;
