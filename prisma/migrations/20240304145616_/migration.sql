-- AlterTable
ALTER TABLE `ms_email` ADD COLUMN `attachment` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `ms_smtp` ADD COLUMN `variables` LONGTEXT NULL;
