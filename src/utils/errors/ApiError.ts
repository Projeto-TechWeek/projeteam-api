export class ApiError extends Error {
  public readonly status: number;

  constructor(message = 'Erro interno do servidor', status = 500) {
    super(message);
    this.status = status;
  }
}
