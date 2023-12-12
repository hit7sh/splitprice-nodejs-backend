import { PrismaClient } from '@prisma/client'
import { transactionType } from '../types/transaction-schema'

const prisma = new PrismaClient()

export async function addTransaction(transaction: transactionType) {
    await prisma.transaction.create({
    data: transaction
  })
}
