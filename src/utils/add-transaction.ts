import { PrismaClient } from '@prisma/client'
import { transactionType } from '../types/transaction-schema'
import personSchema from '../types/person-schema'

const prisma = new PrismaClient()

export async function addTransaction(transaction: transactionType) {
    const personId = transaction.personId;
    const fromPersonId = transaction.fromPersonId;
    const amount = transaction.amount;

    await prisma.transaction.create({
    data: transaction
    });

    transaction.personId = fromPersonId;
    transaction.fromPersonId = personId;
    transaction.amount = -amount;

    await prisma.transaction.create({
    data: transaction
    });
}
