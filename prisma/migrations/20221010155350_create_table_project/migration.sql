-- CreateTable
CREATE TABLE "Project" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "methodology" STRING NOT NULL,
    "area" STRING NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
