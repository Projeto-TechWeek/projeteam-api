import { Router } from 'express';

import { controller } from '../controllers';

const rolesRouter = Router();

rolesRouter.delete('/:id', controller.role.delete);

export { rolesRouter };
