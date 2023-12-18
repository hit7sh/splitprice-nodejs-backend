-- CreateTable
CREATE TABLE "Friend" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "friendId" INTEGER NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
