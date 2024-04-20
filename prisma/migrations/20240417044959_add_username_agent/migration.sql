/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Agent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Agent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Agent` ADD COLUMN `username` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Agent_username_key` ON `Agent`(`username`);
