export type AppErrorCode = 'VALIDATION_ERROR' | 'NOT_FOUND' | 'CONFLICT' | 'UNKNOWN_ERROR';

export class AppError extends Error {
  readonly code: AppErrorCode;

  constructor(code: AppErrorCode, message: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

export const createValidationError = (message: string): AppError => {
  return new AppError('VALIDATION_ERROR', message);
};

export const createNotFoundError = (message: string): AppError => {
  return new AppError('NOT_FOUND', message);
};

export const createConflictError = (message: string): AppError => {
  return new AppError('CONFLICT', message);
};
