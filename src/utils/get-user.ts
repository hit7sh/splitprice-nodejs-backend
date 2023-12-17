import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function getUser(username:string) {
    let result = await prisma.user.findUnique({
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