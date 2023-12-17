import {z} from 'zod';

const userSchema = z.object({
    username: z.string().min(3).max(20),
    hashedPassword: z.string().max(500),
    salt: z.string().max(300)
});

export type userType = z.infer<typeof userSchema>;
export default userSchema;