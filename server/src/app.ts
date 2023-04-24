
import express from 'express';
import cors from 'cors';
import router from './router';
import path from 'path';
const app = express();
const envFileAbsPath = path.resolve(__dirname, "../../.env");
import * as dotenv from 'dotenv';
dotenv.config({ path: envFileAbsPath });
export const PORT = process.env.PORT;
export const HOST = process.env.HOST

// in readme remember to instruct how to set up env variables to run application
app.use(cors({origin: `*`}));
app.use(express.json());
app.use(router);

export default app;

