/*
  Warnings:

  - You are about to drop the column `variables` on the `ms_smtp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ms_email` ADD COLUMN `variables` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `ms_smtp` DROP COLUMN `variables`;
