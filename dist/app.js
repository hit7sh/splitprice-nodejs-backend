"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// const app = express();
// app.use(bodyParser.json());
// app.post('/add-user', async (req, res) => {
//     try {
//         const person = req.body;
//         console.log(req.body);
//         await createPerson(person?.username);
//         res.json({'message' : 'person added successfully'});
//     } catch {
//         res.json({message:'Server Error'});
//     }
// })
// app.listen(3000, ()=> 'Listening on port 3000');
const userSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
});
const user = { username: "ad" };
const results = userSchema.safeParse(user);
if (!results.success)
    console.log(results.error.message);
console.log('----------');
