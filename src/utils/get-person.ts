import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function getPerson(id:number) {
    let result = await prisma.person.findUnique({
        where: {
            id
        },
        include: {
            friends:true,
            transactions:true
        }
    });
    if (result) {
        return result;
    } else {
        return null;
    }
}

export async function getPersonByUsername(username:string) {
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