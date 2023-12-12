"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const transactionSchema = zod_1.z.object({
    title: zod_1.z.string().max(100),
    amount: zod_1.z.number(),
    personId: zod_1.z.number(),
    fromPersonId: zod_1.z.number()
});
exports.default = transactionSchema;
