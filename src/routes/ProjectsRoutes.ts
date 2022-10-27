import { Router } from 'express';

import { controller } from '../controllers';

const projectsRouter = Router();

projectsRouter.get('/', controller.project.readAll);
projectsRouter.post('/', controller.project.create);

projectsRouter.get('/:id', (_request, _response) => {});
projectsRouter.patch('/:id', (_request, _response) => {});

export { projectsRouter };
