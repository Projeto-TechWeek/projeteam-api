-- CreateTable
CREATE TABLE "User_Project" (
    "userId" STRING NOT NULL,
    "projectId" STRING NOT NULL,
    "tierId" INT4 NOT NULL,
    "roleId" STRING NOT NULL,

    CONSTRAINT "User_Project_pkey" PRIMARY KEY ("userId","projectId")
);

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "Tier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
