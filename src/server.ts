import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/firebase';
import 'express-async-errors';

import { projectsRouter } from './controllers/projects';
import { usersRouter } from './controllers/users';
import { Middleware } from './middlewares';

// Setting up Express and others configurations
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(Middleware.auth.verifyToken);

// Routing
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);

// Global error handling
app.use(Middleware.error.handle);

// Server start
const status = process.env.STATUS as string;
const port = process.env[`${status}_PORT`] as string;
app.listen(port, () => {
  console.log(`Server is running in ${status} mode, listening to PORT ${port}`);
});
