/*
Questions:
1. Whenver I save file, TypeScript automatically changes my let declarations to const, how can i disable this without turning off strict in tsconfig
*/
import express from 'express';
const app = express();
import cors from 'cors';
import router from './router';
import path from 'path';
const envFileAbsPath = path.resolve(__dirname, "../../.env");

import * as dotenv from 'dotenv';
console.log(envFileAbsPath)
dotenv.config({ path: envFileAbsPath });
// const port:number = Number(process.env.PORT) || 8000;
const port = process.env.PORT || 8000;
const host:string = process.env.HOST || 'localhost';

app.use(cors());
app.use(express.json());
app.use(router);

// console.log(path)

app.listen(port, () => {
  console.log(`app listening at http://${host}:${port}`)
})
