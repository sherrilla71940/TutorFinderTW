import * as dotenv from 'dotenv';
// dotenv.config({ path: __dirname + './env' });
dotenv.config();

export const PORT = process.env.PORT;
export const SECRET = process.env.SECRET;