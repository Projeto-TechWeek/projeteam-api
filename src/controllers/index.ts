import { ProjectController } from './ProjectsController';
import { RolesController } from './RolesController';
import { UserController } from './UsersController';

export const controller = {
  user: UserController,
  project: ProjectController,
  role: RolesController,
};
