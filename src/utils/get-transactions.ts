import { PrismaClient } from '@prisma/client'
import { transactionType } from '../types/transaction-schema'
import { personType } from '../types/person-schema';

const prisma = new PrismaClient();

export default async function getTransaction(id:number) {
    let result = await prisma.person.findUnique({
        where: {
            id: id
        },
        include: {
            transactions:true
        }
    });
    if (result) {
        return result.transactions;
    } else {
        return null;
    }
}