import { AuthMiddleware } from './AuthMiddleware';
import { ErrorMiddleware } from './ErrorMiddleware';

export class Middleware {
  public static auth = AuthMiddleware;

  public static error = ErrorMiddleware;
}
