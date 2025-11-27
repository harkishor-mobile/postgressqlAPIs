import { Request, Response } from 'express';
import { createAddress } from '@services/addressService';
import { successResponse, errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';

export const createAddressController = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = (req as any).user.id;

    const { street, city, state, zipCode } = req.body;

    const address = await createAddress({
      userId: loggedInUserId,
      street,
      city,
      state,
      zipCode,
    });

    return res.status(StatusCode.CREATED).json(
      successResponse({
        data: address,
        message: 'Address added successfully',
        statusCode: StatusCode.CREATED,
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
