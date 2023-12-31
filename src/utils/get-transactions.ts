import { PrismaClient } from '@prisma/client'

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