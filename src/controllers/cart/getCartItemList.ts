// src/controllers/cart/getCartItemList.ts
import { Request, Response } from 'express';
import { getCartItems } from '@services/cartService';
import { errorResponse, successResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';

export const getMyCartListController = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const cart = await getCartItems(user.id);

    return res.status(StatusCode.OK).json(
      successResponse({
        message: 'Cart fetched successfully',
        data: cart,
        statusCode: StatusCode.OK,
      })
    );
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
      errorResponse({
        message: error.message || 'Internal server error',
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        data: null,
      })
    );
  }
};
