import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { loginRouter } from './controllers/login';
import { projectsRouter } from './controllers/projects';
import { usersRouter } from './controllers/users';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/projects', projectsRouter);

const status = process.env.STATUS as string;
const port = process.env[`${status}_PORT`] as string;
app.listen(port, () => {
  console.log(`Server is running in ${status} mode, listening to PORT ${port}`);
});
