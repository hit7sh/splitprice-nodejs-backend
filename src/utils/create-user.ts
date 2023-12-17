import { PrismaClient } from '@prisma/client'
import {userType} from '../types/user-schema'
const prisma = new PrismaClient()

export async function createUser(user:userType) {
  // ... you will write your Prisma Client queries here
    
    await prisma.user.create({
    data: user
  });
}
