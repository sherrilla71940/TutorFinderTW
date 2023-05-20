import express from 'express';
import cors from 'cors';
import router from './router';
import multer from 'multer';
const app = express();
export const upload = multer({ dest: 'uploads/' });
import { PORT } from './config';

app.use(cors({origin: `*`}));
app.use(upload.single('file'));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});

export default app;