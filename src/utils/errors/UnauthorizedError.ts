import { ApiError } from './ApiError';

export class UnauthorizedError extends ApiError {
  constructor(message = 'Não autorizado') {
    super(message, 401);
  }
}
