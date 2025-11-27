// src/controllers/auth/loginUser.ts
import { loginUser } from '@services/authServices';
import { errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { Request, Response } from 'express';

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    return res.json({
      message: 'Login successfully',
      statusCode: StatusCode.OK,
      data: user, // user object directly under data
      token, // token at top level
    });
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
