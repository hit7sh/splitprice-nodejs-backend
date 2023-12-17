import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function getPerson(username:string) {
    let result = await prisma.person.findUnique({
        where: {
            username
        }
    });
    if (result) {
        return result;
    } else {
        return null;
    }
}