// // src/controllers/address/getUserAddresses.ts
import { Request, Response } from 'express';
import { successResponse, errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { getLoggedInUserAddresses } from '@services/addressService';

export const getUserAddressesController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const addresses = await getLoggedInUserAddresses(userId);

    return res.status(StatusCode.OK).json(
      successResponse({
        message: 'Address list fetched successfully',
        data: addresses,
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
