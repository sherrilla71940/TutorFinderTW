import express from 'express';
import cors from 'cors';
import router from './router';
import multer from 'multer';
const app = express();
// const storage = multer.memoryStorage()
export const upload = multer({ dest: 'uploads/' });

app.use(cors({origin: `*`}));
app.use(upload.single('file'));
app.use(express.json());
app.use(router);

export default app;

