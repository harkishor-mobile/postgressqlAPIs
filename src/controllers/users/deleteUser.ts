// src/controllers/users/deleteUser.ts
import { deleteUser, getUserById } from '@services/userService';
import { hidePassword } from '@utils/hidePassword';
import { errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { Request, Response } from 'express';

export const deleteUserController = async (req: Request, res: Response) => {
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

    //  delete user information
    const deletedUser = await deleteUser(id);

    return res.status(StatusCode.OK).json({
      success: true,
      statusCode: StatusCode.OK,
      message: 'User deleted successfully',
      data: hidePassword(deletedUser),
    });
  } catch (err: any) {
    return res.status(StatusCode.BAD_REQUEST).json({
      success: false,
      statusCode: StatusCode.BAD_REQUEST,
      message: err.message || 'Internal server error',
      data: null,
    });
  }
};
