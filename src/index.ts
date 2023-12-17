import express from 'express';
import bodyParser from 'body-parser'
import { createPerson } from "./utils/create-person";
import personSchema from './types/person-schema';
import transactionSchema, { transactionType } from './types/transaction-schema';
import { addTransaction } from './utils/add-transaction';
import getTransaction from './utils/get-transactions';
import bcrypt from "bcrypt";
const { authenticateJwt } = require("./middleware/auth");
import getUser from './utils/get-user';
import { createUser } from './utils/create-user';
import  jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { assert } from 'console';
import getPerson from './utils/get-person';
import { deleteTransactions } from './utils/delete-transactions';
dotenv.config()

const SECRET = process.env.SECRET;
assert(typeof SECRET === 'string');

const app = express();
app.use(express.json());


// app.post('/add-user', authenticateJwt, async (req, res) => {
//     try {
//         const person = req.body;
//         if (!personSchema.safeParse(person).success) {
//             res.json({message:"invalid input json"});
//         }
//         await createPerson(person.username);
//         res.json({'message' : 'person added successfully'});
//     } catch {
//         res.json({message:'Server Error {add-user}'});
//     }
// });

app.post('/add-transaction', authenticateJwt, async (req, res) => {
    try {
        const transaction = await req.body;
        
        if (!transactionSchema.safeParse(transaction).success) {
            res.json({'message' : 'invalid json input'});
        }
        await addTransaction(transaction);
        res.json({'message' : 'Transaction added successfully'});
    } catch {
        res.json({message:'Server Error {add-transactions}'});
    }
});

app.get('/get-transaction', authenticateJwt, async (req, res) => {
    try {
        let id = parseInt(req.query.id+"");
        if (!id) {
            res.status(404).json({message:"Query param {id} not found in url route"});
        }
        
        let ans = await getTransaction(id);
        res.send({transactions: ans});
    } catch {
        res.json({message:'Server Error {get-transactions}'});
    }
});

app.delete('/delete-transactions', authenticateJwt, async (req, res) => {
    try {
        const {username, fromUsername} = await req.body;
        let person = await getPerson(username);
        let personId = person?.id
        let other = await getPerson(fromUsername)
        let otherId = other?.id;
        if (typeof personId == 'undefined' || typeof otherId == 'undefined') {
            res.status(500).json({message: 'ids not found'})
        } else {
            await deleteTransactions(personId, otherId);
            res.json({message: 'delete Successful'});
        }
    } catch {
        res.status(500).json({message: 'Server Error!'});
    }
});

app.get('/get-user-salt', async (req, res) => {
    try {
        const {username} = await req.body;
        const user = await getUser(username);
        if (!user) res.json({error: 'Username Does not exist'});
        else {
            const salt = user.salt;
            res.json({salt});
        }

    } catch {
        res.json({message: 'Server Error {get user salt}'});
    }
});

app.post('/signup', async (req, res) => {
    try {
        const {username, salt, hashedPassword} = await req.body;
        // console.log({username, salt, hashedPassword});
        
        await createUser({username, salt, hashedPassword});
        await createPerson(username)
        let token;
        if (!SECRET) res.status(500).json({message: 'SECRET Not available'});
        else token = await jwt.sign({ username, hashedPassword }, SECRET);
        
        res.json({ message: 'User signed up successfully', token });
    } catch {
        res.status(500).json({message: 'Server Error {signup}'});
    }
});

app.post('/login', async (req, res) => {
    try {
        const {username, hashedPassword} = await req.body;
        const user = await getUser(username);
        if (!SECRET) res.status(500).json({message: 'SECRET Not available'});
        else if (user?.hashedPassword === hashedPassword) {
            const token = jwt.sign({ username, hashedPassword }, SECRET, { expiresIn: '7d' });
            
            res.json({ message: 'User Logged in successfully', token });
        } else res.status(404).json({error:'User does not exist'});
    } catch {
        res.status(500).json({message: 'Server Error {login}'});
    }
});

app.listen(3000, ()=> 'Listening on port 3000');


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
