import { Request, Response, NextFunction } from 'express';
import StatusCode from '@utils/statusCode';
import { errorResponse } from '@utils/response';

/**
 * Allows access if requester is ADMIN OR requester id === :id
 * Useful for GET /users/:id and GET /users/profile/:id
 */
export const allowSelfOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  const requestedId = Number(req.params.id);

  if (!user) {
    return res.status(StatusCode.UNAUTHORIZED).json(
      errorResponse({
        message: 'Not authenticated',
        statusCode: StatusCode.UNAUTHORIZED,
      })
    );
  }

  if (user.role === 'ADMIN' || user.id === requestedId) {
    return next();
  }

  return res.status(StatusCode.FORBIDDEN).json(
    errorResponse({
      message: 'Access denied',
      statusCode: StatusCode.FORBIDDEN,
    })
  );
};
