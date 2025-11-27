// src/controllers/users/getUserById.ts
import { getUserById } from '@services/userService';
import { errorResponse, successResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { Request, Response } from 'express';

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserById(id);

    if (!user) {
      return res.status(StatusCode.NOT_FOUND).json(
        errorResponse({
          message: 'User not found',
          statusCode: StatusCode.NOT_FOUND,
          data: null,
        })
      );
    }

    // Send consistent JSON response
    return res.status(StatusCode.OK).json(
      successResponse({
        data: user,
        message: 'User fetched successfully',
        statusCode: StatusCode.OK,
      })
    );
  } catch (err: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
      errorResponse({
        message: err.message || 'Internal server error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        data: null,
      })
    );
  }
};
