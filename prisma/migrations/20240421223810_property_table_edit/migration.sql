/*
  Warnings:

  - Added the required column `agencyName` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agentName` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Property` ADD COLUMN `agencyName` VARCHAR(255) NOT NULL,
    ADD COLUMN `agentName` VARCHAR(255) NOT NULL;
