import type { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

import { BadRequestError } from '../utils/errors/BadRequestError';
import { UnauthorizedError } from '../utils/errors/UnauthorizedError';

export class AuthMiddleware {
  static verifyToken = async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new BadRequestError('Token is missing');

    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) throw new UnauthorizedError();

    return next();
  };
}
