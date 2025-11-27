import { Request, Response } from 'express';
import { successResponse, errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { getUserAddressList } from '@services/addressService';
import { hidePassword } from '@utils/hidePassword';

export const getUserWithAddressesController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.params.userId);

    const user = await getUserAddressList(userId);

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
        data: hidePassword(user), // remove password from response
        message: 'User with addresses fetched successfully',
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
