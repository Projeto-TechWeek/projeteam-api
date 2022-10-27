import { Router } from 'express';

import { controller } from '../controllers';

const projectsRouter = Router();

projectsRouter.get('/', controller.project.readAll);
projectsRouter.get('/:id', controller.project.read);
projectsRouter.post('/', controller.project.create);
projectsRouter.patch('/:id', controller.project.patch);

export { projectsRouter };
