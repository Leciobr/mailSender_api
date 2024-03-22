-- CreateTable
CREATE TABLE `ms_smtp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(50) NOT NULL,
    `idMassa` VARCHAR(150) NOT NULL,
    `priority` INTEGER NOT NULL,
    `pause` DOUBLE NOT NULL,
    `smtp_nome` VARCHAR(150) NOT NULL,
    `smtp_email` VARCHAR(150) NOT NULL,
    `smtp_user` VARCHAR(150) NOT NULL,
    `smtp_pwd` VARCHAR(150) NOT NULL,
    `smtp_port` INTEGER NOT NULL,
    `smtp_encryption` VARCHAR(50) NOT NULL,
    `smtp_auth` VARCHAR(50) NOT NULL,
    `smtp_emailReply` VARCHAR(150) NOT NULL,
    `email_email` VARCHAR(150) NOT NULL,
    `email_subject` VARCHAR(254) NULL,
    `email_msg` LONGTEXT NULL,
    `email_attach` LONGTEXT NULL,

    INDEX `FK_user`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ms_user` (
    `id` INTEGER NOT NULL,
    `user` VARCHAR(50) NOT NULL,
    `nivel` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `user`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ms_smtp` ADD CONSTRAINT `FK_user` FOREIGN KEY (`user`) REFERENCES `ms_user`(`user`) ON DELETE RESTRICT ON UPDATE RESTRICT;
