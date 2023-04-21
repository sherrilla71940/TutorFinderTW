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
dotenv.config({ path: envFileAbsPath });
const port:number = Number(process.env.PORT) || 8000;
const host:string = process.env.HOST || 'localhost';

// in readme remember to instruct how to set up env variables to run application
app.use(cors({origin: `http://${host}*`}));
app.use(express.json());
app.use(router);



app.listen(port, () => {
  console.log(`app listening at http://${host}:${port}`)
})
