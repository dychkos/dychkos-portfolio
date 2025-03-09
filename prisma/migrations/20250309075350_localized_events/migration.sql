/*
  Warnings:

  - Added the required column `description_en` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_en` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "description_en" TEXT NOT NULL,
ADD COLUMN     "title_en" TEXT NOT NULL;
