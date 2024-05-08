/*
  Warnings:

  - You are about to drop the column `smtp_emailReply` on the `ms_smtp` table. All the data in the column will be lost.
  - You are about to drop the column `smtp_nome` on the `ms_smtp` table. All the data in the column will be lost.
  - Added the required column `smtp_email_reply` to the `ms_smtp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smtp_name` to the `ms_smtp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ms_smtp` DROP COLUMN `smtp_emailReply`,
    DROP COLUMN `smtp_nome`,
    ADD COLUMN `smtp_email_reply` VARCHAR(150) NOT NULL,
    ADD COLUMN `smtp_name` VARCHAR(150) NOT NULL;
