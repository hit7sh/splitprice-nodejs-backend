import {z} from 'zod';

const transactionSchema = z.object({
    title: z.string().max(100),
    amount: z.number(),
    personId: z.number(),
    fromPersonId: z.number()
});

export type transactionType = z.infer<typeof transactionSchema>;
export default transactionSchema;