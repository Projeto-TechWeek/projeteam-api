import { AuthMiddleware } from './AuthMiddleware';
import { ErrorMiddleware } from './ErrorMiddleware';

export const middleware = {
  auth: AuthMiddleware,
  error: ErrorMiddleware,
};
