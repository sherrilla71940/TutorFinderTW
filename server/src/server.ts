/*
Questions:
1. Whenver I save file, TypeScript automatically changes my let declarations to const, how can i disable this without turning off strict in tsconfig
*/
import * as dotenv from 'dotenv';
dotenv.config();
import express, {Express, Request, Response} from 'express';
const app = express();
const port = process.env.PORT;


console.log(process.env);
console.log(port);
console.log('hello')

// app.listen(port, () => {
//   console.log(`app listening at http://localhost:${port}`)
// })
