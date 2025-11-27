import { Request, Response, NextFunction } from 'express';
import StatusCode from '@utils/statusCode';
import { errorResponse } from '@utils/response';

export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUserId = (req as any).user?.id;
  const requestedId = Number(req.params.id);

  if (!requestedId || isNaN(requestedId)) {
    return res.status(StatusCode.BAD_REQUEST).json(
      errorResponse({
        message: 'Invalid user ID',
        statusCode: StatusCode.BAD_REQUEST,
      })
    );
  }

  if (loggedInUserId !== requestedId) {
    return res.status(StatusCode.FORBIDDEN).json(
      errorResponse({
        message: 'Access denied',
        statusCode: StatusCode.FORBIDDEN,
      })
    );
  }

  next();
};
