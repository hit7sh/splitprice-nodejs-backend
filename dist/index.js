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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const create_person_1 = require("./utils/create-person");
const person_schema_1 = __importDefault(require("./types/person-schema"));
const transaction_schema_1 = __importDefault(require("./types/transaction-schema"));
const add_transaction_1 = require("./utils/add-transaction");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.post('/add-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = req.body;
        if (!person_schema_1.default.safeParse(person).success) {
            res.json({ message: "invalid input json" });
        }
        yield (0, create_person_1.createPerson)(person.username);
        res.json({ 'message': 'person added successfully' });
    }
    catch (_a) {
        res.json({ message: 'Server Error' });
    }
}));
app.post('/add-transaction', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield req.body;
        if (!transaction_schema_1.default.safeParse(transaction).success) {
            res.json({ 'message': 'invalid json input' });
        }
        yield (0, add_transaction_1.addTransaction)(transaction);
        res.json({ 'message': 'Transaction added successfully' });
    }
    catch (_b) {
        res.json({ message: 'Server Error' });
    }
}));
app.listen(3000, () => 'Listening on port 3000');
