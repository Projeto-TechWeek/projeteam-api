-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "avatar" STRING NOT NULL,
    "phone" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
