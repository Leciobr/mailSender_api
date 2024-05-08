/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `ms_user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ms_user` ADD COLUMN `token` VARCHAR(150) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `token` ON `ms_user`(`token`);
