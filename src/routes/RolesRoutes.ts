import { Router } from 'express';

import { controller } from '../controllers';

const rolesRouter = Router();

rolesRouter.post('/', controller.role.create);
rolesRouter.patch('/:id', controller.role.patch);
rolesRouter.delete('/:id', controller.role.delete);

export { rolesRouter };
