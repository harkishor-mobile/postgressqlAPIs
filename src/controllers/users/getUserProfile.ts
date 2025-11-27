// src/controllers/users/getUserProfile.ts
import { Request, Response } from 'express';
import { successResponse, errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { getUserProfile } from '@services/userService';

export const getUserProfileController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);

    if (isNaN(userId)) {
      return res.status(StatusCode.BAD_REQUEST).json(
        errorResponse({
          message: 'Invalid user ID',
          statusCode: StatusCode.BAD_REQUEST,
          data: null,
        })
      );
    }

    const user = await getUserProfile(userId);

    if (!user) {
      return res.status(StatusCode.NOT_FOUND).json(
        errorResponse({
          message: 'User not found',
          statusCode: StatusCode.NOT_FOUND,
          data: null,
        })
      );
    }

    return res.status(StatusCode.OK).json(
      successResponse({
        data: user,
        message: 'User profile fetched successfully',
        statusCode: StatusCode.OK,
      })
    );
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
      errorResponse({
        message: err.message || 'Internal server error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        data: null,
      })
    );
  }
};
