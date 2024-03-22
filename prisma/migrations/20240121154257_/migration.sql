/*
  Warnings:

  - You are about to drop the column `password` on the `ms_email` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `ms_email` table. All the data in the column will be lost.
  - Added the required column `password` to the `ms_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `ms_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ms_email` DROP COLUMN `password`,
    DROP COLUMN `salt`;

-- AlterTable
ALTER TABLE `ms_user` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `salt` VARCHAR(191) NOT NULL;
