/*
  Warnings:

  - Added the required column `password` to the `ms_email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `ms_email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ms_email` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `salt` VARCHAR(191) NOT NULL;
