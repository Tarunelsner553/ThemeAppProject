-- CreateTable
CREATE TABLE "colorData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Primary" TEXT NOT NULL,
    "Secondary" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
