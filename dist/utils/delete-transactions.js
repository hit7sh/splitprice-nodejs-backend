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
exports.deleteTransactions = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function deleteTransactions(personId, otherId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.transaction.deleteMany({
            where: {
                personId,
                fromPersonId: otherId
            }
        });
        yield prisma.transaction.deleteMany({
            where: {
                personId: otherId,
                fromPersonId: personId
            }
        });
    });
}
exports.deleteTransactions = deleteTransactions;
