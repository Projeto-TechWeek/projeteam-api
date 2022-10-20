import type { Request, Response, NextFunction } from 'express';
import type { FirebaseError } from 'firebase-admin';
import admin from 'firebase-admin';

function isFirebaseError(error: unknown): error is FirebaseError {
  return (error as FirebaseError).code !== undefined;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(400).json({ message: 'Undefined token' });

    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) return res.status(401).json({ message: 'Unauthorized' });

    return next();
  } catch (err) {
    if (isFirebaseError(err)) {
      switch (err.code) {
        case 'auth/id-token-expired':
          return res.status(401).json({ message: 'Expired token' });

        case 'auth/argument-error':
          return res.status(400).json({ message: 'Inválid token' });

        default:
          return res.status(401).json({ message: 'Unauthorized' });
      }
    }

    return res.status(500).json({
      message: 'Internal error',
    });
  }
};
