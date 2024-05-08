/*
  Warnings:

  - You are about to drop the column `pause` on the `ms_smtp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ms_smtp` DROP COLUMN `pause`,
    ADD COLUMN `interval` DOUBLE NULL;
