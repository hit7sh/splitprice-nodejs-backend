import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createPerson(username:string) {
  // ... you will write your Prisma Client queries here

    await prisma.person.create({
    data: {
        username: username,
    }
  })
}
