import { Prisma } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import type { FirebaseError } from 'firebase-admin';

import { ApiError } from '../utils/errors/ApiError';

function isFirebaseError(error: unknown): error is FirebaseError {
  return (error as FirebaseError).code !== undefined && (error as FirebaseError).code.includes('auth/');
}

export class ErrorMiddleware {
  static handle = (error: Error | ApiError, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ApiError) {
      return res.status(error.status).json({
        message: error.message,
      });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return res.status(400).json({
            message: `Ja existe um usuário com este '${(error.meta as { target: string[] }).target[0]}'`,
          });

        default:
          break;
      }
    }

    if (isFirebaseError(error)) {
      switch (error.code) {
        case 'auth/id-token-expired':
          return res.status(401).json({ message: 'Token expirado' });

        case 'auth/argument-error':
          return res.status(400).json({ message: 'Token inválido' });

        default:
          return res.status(401).json({ message: 'Não autorizado' });
      }
    }

    console.log(error);
    return res.status(500).json({
      message: 'Erro interno do servidor',
    });
  };
}
