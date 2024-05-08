/*
  Warnings:

  - Added the required column `status` to the `ms_smtp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ms_smtp` ADD COLUMN `status` VARCHAR(50) NOT NULL;
