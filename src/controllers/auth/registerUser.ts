// src/controllers/auth/registerUser.ts
import { registerUser } from '@services/authServices';
import { hidePassword } from '@utils/hidePassword';
import { errorResponse, successResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { Request, Response } from 'express';

export const registerController = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body, req.file);

    return res.status(StatusCode.CREATED).json(
      successResponse({
        message: 'User registered successfully',
        data: hidePassword(user),
        statusCode: StatusCode.CREATED,
      })
    );
  } catch (err: any) {
    return res.status(StatusCode.BAD_REQUEST).json(
      errorResponse({
        message: err.message,
        statusCode: StatusCode.BAD_REQUEST,
        data: null,
      })
    );
  }
};
