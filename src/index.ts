import express from 'express';
import bodyParser from 'body-parser'
import { createPerson } from "./utils/create-person";
import personSchema from './types/person-schema';
import transactionSchema, { transactionType } from './types/transaction-schema';
import { addTransaction } from './utils/add-transaction';
import getTransaction from './utils/get-transactions';

const app = express();
app.use(bodyParser.json());


app.post('/add-user', async (req, res) => {
    try {
        const person = req.body;
        if (!personSchema.safeParse(person).success) {
            res.json({message:"invalid input json"});
        }
        await createPerson(person.username);
        res.json({'message' : 'person added successfully'});
    } catch {
        res.json({message:'Server Error'});
    }
});

app.post('/add-transaction', async (req, res) => {
    try {
        const transaction = await req.body;
        
        if (!transactionSchema.safeParse(transaction).success) {
            res.json({'message' : 'invalid json input'});
        }
        await addTransaction(transaction);
        res.json({'message' : 'Transaction added successfully'});
    } catch {
        res.json({message:'Server Error'});
    }
});

app.get('/get-transaction', async (req, res) => {
    try {
        let id = parseInt(req.query.id+"");
        if (!id) {
            res.status(404).json({message:"Query param {id} not found in url route"});
        }
        
        let ans = await getTransaction(id);
        res.send({transactions: ans});
    } catch {
        res.json({message:'Server Error'});
    }
});

app.listen(3000, ()=> 'Listening on port 3000');


