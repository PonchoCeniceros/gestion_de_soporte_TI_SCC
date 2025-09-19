import jwt from 'jsonwebtoken';
import { Role } from '../domain/role';
import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

/**
 *
 */
const secretKey = process.env.SECRET_KEY || 'supersecretkey';

/**
 *
 */
export function authUserMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1] || '';

  if (!token) {
    res.status(401).json({ message: 'Acceso denegado' });

  } else {
    jwt.verify(token, secretKey, (err, decoded: any) => {
      if (err || decoded.role !== Role.USER) {
        res.status(403).json({ message: 'Acceso denegado' });
      } else {
        req.userId = decoded.id; // Attach user ID to request
        next();
      }
    });
  }
}

/**
 *
 */
export function authAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1] || '';

  if (!token) {
    res.status(401).json({ message: 'Acceso denegado' });

  } else {
    jwt.verify(token, secretKey, (err, decoded: any) => {
      if (err || decoded.role !== Role.ADMIN) {
        res.status(403).json({ message: 'Acceso denegado' });
      } else {
        req.userId = decoded.id; // Attach user ID to request
        next();
      }
    });
  }
}
