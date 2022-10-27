import { ApiError } from './ApiError';

export class NotFoundError extends ApiError {
  constructor(message = 'Não encontrado') {
    super(message, 400);
  }
}
