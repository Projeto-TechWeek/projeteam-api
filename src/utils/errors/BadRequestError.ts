import { ApiError } from './ApiError';

export class BadRequestError extends ApiError {
  constructor(message = 'Requisição inválida') {
    super(message, 400);
  }
}
