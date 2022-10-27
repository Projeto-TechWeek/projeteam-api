import { Router } from 'express';

import { controller } from '../controllers';

const usersRouter = Router();

usersRouter.get('/:id', controller.user.read);
usersRouter.post('/', controller.user.create);
usersRouter.post('/login', controller.user.login);
usersRouter.patch('/:id', controller.user.patch);

export { usersRouter };
