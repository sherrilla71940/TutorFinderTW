/*
Questions:
1. Whenver I save file, TypeScript automatically changes my let declarations to const, how can i disable this without turning off strict in tsconfig
*/
import express from 'express';
const app = express();
import cors from 'cors';
import router from './router';
import path from 'path';
const envPath = path.resolve(__dirname, "../../.env");

import * as dotenv from 'dotenv';
console.log(envPath)
dotenv.config({ path: envPath });
const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(express.json());
app.use(router);
// console.log(router)

console.log(process.env.HOST);
// console.log(port);
// console.log('hello')

app.listen(port, () => {
  console.log(`app listening at http://${host}:${port}`)
})
