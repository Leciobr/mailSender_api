/*
  Warnings:

  - You are about to drop the column `email_email` on the `ms_smtp` table. All the data in the column will be lost.
  - You are about to drop the column `idMassa` on the `ms_smtp` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `ms_smtp` table. All the data in the column will be lost.
  - Added the required column `id_massa` to the `ms_smtp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ms_user_id` to the `ms_smtp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ms_smtp` DROP FOREIGN KEY `FK_user`;

-- AlterTable
ALTER TABLE `ms_smtp` DROP COLUMN `email_email`,
    DROP COLUMN `idMassa`,
    DROP COLUMN `user`,
    ADD COLUMN `id_massa` VARCHAR(150) NOT NULL,
    ADD COLUMN `ms_user_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ms_email` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(150) NOT NULL,
    `ms_smtp_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ms_smtp` ADD CONSTRAINT `ms_smtp_ms_user_id_fkey` FOREIGN KEY (`ms_user_id`) REFERENCES `ms_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ms_email` ADD CONSTRAINT `ms_email_ms_smtp_id_fkey` FOREIGN KEY (`ms_smtp_id`) REFERENCES `ms_smtp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
