import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function addFriend(person1Id:number, person2Id:number) {

    await prisma.friend.create({
        data: {
            personId:person1Id,
            friendId:person2Id
        }
    });
    
    await prisma.friend.create({
        data: {
            personId:person2Id,
            friendId:person1Id
        }
    });
    
}
