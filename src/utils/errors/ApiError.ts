export class ApiError extends Error {
  public readonly status: number;

  constructor(message = 'Internal server error', status = 500) {
    super(message);
    this.status = status;
  }
}
