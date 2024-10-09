/*
  Warnings:

  - You are about to drop the `Resturant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mealType` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Recipe` ADD COLUMN `mealType` ENUM('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK') NOT NULL;

-- DropTable
DROP TABLE `Resturant`;
