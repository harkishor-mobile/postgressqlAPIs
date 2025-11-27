// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import StatusCode from '@utils/statusCode';
import { errorResponse } from '@utils/response';

const JWT_SECRET = process.env.JWT_SECRET || 'MyJwtSecretKey@123@';

export interface AuthPayload {
  id: number;
  email: string;
  role: 'ADMIN' | 'USER' | string;
  iat?: number;
  exp?: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(StatusCode.UNAUTHORIZED).json(
      errorResponse({
        message: 'No token provided',
        statusCode: StatusCode.UNAUTHORIZED,
      })
    );
  }

  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(StatusCode.UNAUTHORIZED).json(
      errorResponse({
        message: 'Invalid authorization header',
        statusCode: StatusCode.UNAUTHORIZED,
      })
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

    //  Use 'as any' to assign to Request.user safely
    (req as any).user = decoded;

    return next();
  } catch (err) {
    return res.status(StatusCode.UNAUTHORIZED).json(
      errorResponse({
        message: 'Invalid or expired token',
        statusCode: StatusCode.UNAUTHORIZED,
      })
    );
  }
};

// Admin middleware
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user as AuthPayload | undefined;
  if (!user) {
    return res.status(StatusCode.UNAUTHORIZED).json(
      errorResponse({
        message: 'Not authenticated',
        statusCode: StatusCode.UNAUTHORIZED,
      })
    );
  }
  if (user.role !== 'ADMIN') {
    return res.status(StatusCode.FORBIDDEN).json(
      errorResponse({
        message: 'Admin access only',
        statusCode: StatusCode.FORBIDDEN,
      })
    );
  }
  next();
};

// User middleware
export const isUser = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user as AuthPayload | undefined;
  if (!user) {
    return res.status(StatusCode.UNAUTHORIZED).json(
      errorResponse({
        message: 'Not authenticated',
        statusCode: StatusCode.UNAUTHORIZED,
      })
    );
  }
  if (user.role !== 'USER') {
    return res.status(StatusCode.FORBIDDEN).json(
      errorResponse({
        message: 'User access only',
        statusCode: StatusCode.FORBIDDEN,
      })
    );
  }
  next();
};
