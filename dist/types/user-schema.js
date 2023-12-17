"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
    hashedPassword: zod_1.z.string().max(500),
    salt: zod_1.z.string().max(300)
});
exports.default = userSchema;
