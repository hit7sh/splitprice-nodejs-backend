import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function deleteTransactions(personId:number, otherId:number) {

    await prisma.transaction.deleteMany({
        where: {
            personId,
            fromPersonId:otherId
        }
    });

    await prisma.transaction.deleteMany({
        where: {
            personId:otherId,
            fromPersonId:personId
        }
    });
}