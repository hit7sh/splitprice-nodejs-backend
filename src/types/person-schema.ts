import {z} from 'zod';

const personSchema = z.object({
    username: z.string().min(3).max(20),
});

export type personType = z.infer<typeof personSchema>;
export default personSchema;