"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const personSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
});
exports.default = personSchema;
