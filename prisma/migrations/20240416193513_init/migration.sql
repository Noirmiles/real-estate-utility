/*
  Warnings:

  - Made the column `isManager` on table `Agent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Agent` MODIFY `isManager` BOOLEAN NOT NULL DEFAULT false;
