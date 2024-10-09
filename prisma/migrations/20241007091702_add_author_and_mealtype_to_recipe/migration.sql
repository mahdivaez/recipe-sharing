/*
  Warnings:

  - You are about to drop the `Resturant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealType` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Recipe` ADD COLUMN `authorId` VARCHAR(191) NOT NULL,
    ADD COLUMN `mealType` ENUM('BREAKFAST', 'LUNCH', 'DINNER', 'DESSERT') NOT NULL;

-- DropTable
DROP TABLE `Resturant`;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
