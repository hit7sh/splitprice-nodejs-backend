"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFriend = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function addFriend(person1Id, person2Id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.friend.create({
            data: {
                personId: person1Id,
                friendId: person2Id
            }
        });
        yield prisma.friend.create({
            data: {
                personId: person2Id,
                friendId: person1Id
            }
        });
    });
}
exports.addFriend = addFriend;
