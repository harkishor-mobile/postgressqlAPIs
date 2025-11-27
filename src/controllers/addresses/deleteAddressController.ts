import { Request, Response } from 'express';
import { deleteAddress, getAddressById } from '@services/addressService';
import { successResponse, errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';

export const deleteAddressController = async (req: Request, res: Response) => {
  try {
    const addressId = Number(req.params.addressId);

    const existing = await getAddressById(addressId);
    if (!existing) {
      return res.status(StatusCode.NOT_FOUND).json(
        errorResponse({
          message: 'Address not found',
          statusCode: StatusCode.NOT_FOUND,
          data: null,
        })
      );
    }

    await deleteAddress(addressId);

    return res.status(StatusCode.OK).json(
      successResponse({
        data: null,
        message: 'Address deleted successfully',
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
