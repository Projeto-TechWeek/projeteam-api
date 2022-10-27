import { projectsRouter } from './ProjectsRoutes';
import { rolesRouter } from './RolesRoutes';
import { usersRouter } from './UserRoutes';

export const routes = {
  user: usersRouter,
  project: projectsRouter,
  roles: rolesRouter
};
