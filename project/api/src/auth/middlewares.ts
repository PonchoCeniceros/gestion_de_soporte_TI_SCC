import jwt from 'jsonwebtoken';
import { Role } from '../domain/role';
import { Request, Response, NextFunction } from 'express';

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
        next();
      }
    });
  }
}
