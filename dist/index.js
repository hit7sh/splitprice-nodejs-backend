"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const create_person_1 = require("./utils/create-person");
const transaction_schema_1 = __importDefault(require("./types/transaction-schema"));
const add_transaction_1 = require("./utils/add-transaction");
const get_transactions_1 = __importDefault(require("./utils/get-transactions"));
const { authenticateJwt } = require("./middleware/auth");
const get_user_1 = __importDefault(require("./utils/get-user"));
const create_user_1 = require("./utils/create-user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const console_1 = require("console");
const get_person_1 = __importStar(require("./utils/get-person"));
const delete_transactions_1 = require("./utils/delete-transactions");
const add_friend_1 = require("./utils/add-friend");
dotenv_1.default.config();
const SECRET = process.env.SECRET;
(0, console_1.assert)(typeof SECRET === 'string');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/add-friend', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { person1Id, person2Id } = req.body;
        if (!person1Id || !person2Id) {
            res.json({ message: "Ids not available" });
            return;
        }
        yield (0, add_friend_1.addFriend)(person1Id, person2Id);
        res.json({ 'message': 'added in your friends List!🤝' });
    }
    catch (_a) {
        res.json({ message: 'Server Error {add-friend}' });
    }
}));
app.post('/add-transaction', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield req.body;
        if (!transaction_schema_1.default.safeParse(transaction).success) {
            res.json({ 'message': 'invalid json input' });
        }
        yield (0, add_transaction_1.addTransaction)(transaction);
        res.json({ 'message': 'Transaction added successfully' });
    }
    catch (_b) {
        res.json({ message: 'Server Error {add-transactions}' });
    }
}));
app.get('/get-transaction', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = parseInt(req.query.id + "");
        if (!id) {
            res.status(404).json({ message: "Query param {id} not found in url route" });
        }
        let ans = yield (0, get_transactions_1.default)(id);
        res.send({ transactions: ans });
    }
    catch (_c) {
        res.json({ message: 'Server Error {get-transactions}' });
    }
}));
app.delete('/delete-transactions', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, fromUsername } = yield req.body;
        let person = yield (0, get_person_1.getPersonByUsername)(username);
        let personId = person === null || person === void 0 ? void 0 : person.id;
        let other = yield (0, get_person_1.getPersonByUsername)(fromUsername);
        let otherId = other === null || other === void 0 ? void 0 : other.id;
        if (typeof personId == 'undefined' || typeof otherId == 'undefined') {
            res.status(500).json({ message: 'ids not found' });
        }
        else {
            yield (0, delete_transactions_1.deleteTransactions)(personId, otherId);
            res.json({ message: 'delete Successful' });
        }
    }
    catch (_d) {
        res.status(500).json({ message: 'Server Error!' });
    }
}));
app.get('/get-user-salt', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = yield req.body;
        const user = yield (0, get_user_1.default)(username);
        if (!user)
            res.json({ error: 'Username Does not exist' });
        else {
            const salt = user.salt;
            res.json({ salt });
        }
    }
    catch (_e) {
        res.json({ message: 'Server Error {get user salt}' });
    }
}));
app.get('/get-person', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        res.status(404).send({ message: 'Please send the id' });
        return;
    }
    const person = yield (0, get_person_1.default)(id);
    res.json({ person });
}));
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, salt, hashedPassword } = yield req.body;
        // console.log({username, salt, hashedPassword});
        yield (0, create_user_1.createUser)({ username, salt, hashedPassword });
        yield (0, create_person_1.createPerson)(username);
        let token;
        if (!SECRET)
            res.status(500).json({ message: 'SECRET Not available' });
        else
            token = yield jsonwebtoken_1.default.sign({ username, hashedPassword }, SECRET);
        res.json({ message: 'User signed up successfully', token });
    }
    catch (_f) {
        res.status(500).json({ message: 'Server Error {signup}' });
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, hashedPassword } = yield req.body;
        const user = yield (0, get_user_1.default)(username);
        if (!SECRET)
            res.status(500).json({ message: 'SECRET Not available' });
        else if ((user === null || user === void 0 ? void 0 : user.hashedPassword) === hashedPassword) {
            const token = jsonwebtoken_1.default.sign({ username, hashedPassword }, SECRET, { expiresIn: '7d' });
            res.json({ message: 'User Logged in successfully', token });
        }
        else
            res.status(404).json({ error: 'User does not exist' });
    }
    catch (_g) {
        res.status(500).json({ message: 'Server Error {login}' });
    }
}));
app.listen(3000, () => 'Listening on port 3000');
// import bcrypt from "bcrypt";
// (async () => {
//     const salt = await bcrypt.genSalt();
//     console.log(salt);
//     console.log(await bcrypt.genSalt());
//     let hash = await bcrypt.hash("password", salt);
//     console.log(hash);
//     let hash1 = await bcrypt.hash("password", salt);
//     bcrypt.compare('password', hash1, (err, res) => {
//         if (res) {
//             console.log('good');
//         } else {
//             console.log('bad');
//         }
//     })
//     console.log('dfh.'.substring(0, 'dfh.'.indexOf('.')));
// })(); 
