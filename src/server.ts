import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => res.send('Hello World!'));

const status = process.env.STATUS as string;
const port = process.env[`${status}_PORT`] as string;
app.listen(port, () => {
  console.log(`Server is running in ${status} mode, listening to PORT ${port}`);
});
