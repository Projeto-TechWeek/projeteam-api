import { Router } from 'express';

import { controller } from '../controllers';

const projectsRouter = Router();

projectsRouter.get('/', controller.project.readAll);
projectsRouter.get('/:id', controller.project.read);
projectsRouter.post('/', controller.project.create);
projectsRouter.patch('/:id', controller.project.patch);
projectsRouter.delete('/:id', controller.project.delete);

export { projectsRouter };
