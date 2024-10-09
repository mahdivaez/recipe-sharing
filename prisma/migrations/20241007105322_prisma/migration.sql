/*
  Warnings:

  - You are about to drop the column `mealType` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_userId_fkey`;

-- AlterTable
ALTER TABLE `Recipe` DROP COLUMN `mealType`,
    DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `Resturant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
