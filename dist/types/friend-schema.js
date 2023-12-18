"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const friendSchema = zod_1.z.object({
    personId: zod_1.z.number(),
    friendId: zod_1.z.number()
});
exports.default = friendSchema;
