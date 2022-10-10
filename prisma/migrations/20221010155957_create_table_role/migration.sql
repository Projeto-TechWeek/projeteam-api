-- CreateTable
CREATE TABLE "Role" (
    "id" STRING NOT NULL,
    "projectId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING NOT NULL,
    "vacancies" INT4 NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
