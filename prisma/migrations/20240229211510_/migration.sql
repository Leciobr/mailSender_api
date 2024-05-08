/*
  Warnings:

  - You are about to drop the column `smtp_error` on the `ms_smtp` table. All the data in the column will be lost.
  - Added the required column `status` to the `ms_email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ms_email` ADD COLUMN `error_message` LONGTEXT NULL,
    ADD COLUMN `status` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `ms_smtp` DROP COLUMN `smtp_error`;
