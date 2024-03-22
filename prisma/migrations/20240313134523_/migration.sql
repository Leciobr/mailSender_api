/*
  Warnings:

  - Added the required column `smtp_host` to the `ms_smtp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ms_smtp` ADD COLUMN `smtp_host` VARCHAR(150) NOT NULL;
