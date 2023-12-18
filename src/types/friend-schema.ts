import {z} from 'zod';

const friendSchema = z.object({
    personId: z.number(),
    friendId: z.number()
});

export type friendType = z.infer<typeof friendSchema>;
export default friendSchema;