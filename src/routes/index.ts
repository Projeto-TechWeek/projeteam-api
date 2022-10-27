import { projectsRouter } from './ProjectsRoutes';
import { usersRouter } from './UserRoutes';

export const routes = {
  user: usersRouter,
  project: projectsRouter,
};
