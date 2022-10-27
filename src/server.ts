import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/firebase';
import 'express-async-errors';

import { middleware } from './middlewares';
import { routes } from './routes';

// Setting up Express and others configurations
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(middleware.auth.verifyToken);

// Routing
app.use('/api/users', routes.user);
app.use('/api/projects', routes.project);
app.use('/api/roles', routes.roles);

// Global error handling
app.use(middleware.error.handle);

// Server start
const port = process.env.PORT as string;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
