// src/controllers/address/getUserAddresses.ts

import { Request, Response } from 'express';
import { getUserAddressesOnly } from '@services/addressService';
import { successResponse, errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';

export const getUserAddressesController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.params.userId);

    const addresses = await getUserAddressesOnly(userId);

    return res.status(StatusCode.OK).json(
      successResponse({
        data: addresses,
        message: 'User address list fetched successfully',
        statusCode: StatusCode.OK,
      })
    );
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
      errorResponse({
        message: error.message,
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        data: null,
      })
    );
  }
};
