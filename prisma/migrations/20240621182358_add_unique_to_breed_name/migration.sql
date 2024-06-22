/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cat" DROP CONSTRAINT "Cat_userId_fkey";

-- AlterTable
ALTER TABLE "Cat" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "Cat" ADD CONSTRAINT "Cat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "RegisterModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
