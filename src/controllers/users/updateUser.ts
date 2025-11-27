// src/controllers/users/updateUser.ts
import { getUserById, updateUser } from '@services/userService';
import { hidePassword } from '@utils/hidePassword';
import { errorResponse, successResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { Request, Response } from 'express';

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    //  Check if user exists first
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return res.status(StatusCode.NOT_FOUND).json(
        errorResponse({
          message: 'User not found',
          statusCode: StatusCode.NOT_FOUND,
          data: null,
        })
      );
    }

    //  update user information
    const updatedUser = await updateUser(id, req.body, req.file);

    // Send consistent JSON response
    return res.status(StatusCode.OK).json(
      successResponse({
        data: hidePassword(updatedUser),
        message: 'User updated successfully',
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
