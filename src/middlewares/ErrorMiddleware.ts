import type { NextFunction, Request, Response } from 'express';
import type { FirebaseError } from 'firebase-admin';

import { ApiError } from '../utils/errors/ApiError';

function isFirebaseError(error: unknown): error is FirebaseError {
  return (error as FirebaseError).code.includes('auth/');
}

export class ErrorMiddleware {
  static handle = (error: Error | ApiError, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ApiError) {
      return res.status(error.status).json({
        message: error.message,
      });
    }

    if (isFirebaseError(error)) {
      switch (error.code) {
        case 'auth/id-token-expired':
          return res.status(401).json({ message: 'Expired token' });

        case 'auth/argument-error':
          return res.status(400).json({ message: 'Inválid token' });

        default:
          return res.status(401).json({ message: 'Unauthorized' });
      }
    }

    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  };
}
