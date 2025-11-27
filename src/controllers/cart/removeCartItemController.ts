// src/controllers/cart/removeCartItemController.ts
import { Request, Response } from 'express';
import { removeCartItem } from '@services/cartService';
import { successResponse, errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';

export const removeCartItemController = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { productId } = req.params;
    console.log('productId productId ', productId);

    await removeCartItem(user.id, Number(productId));

    return res.status(StatusCode.OK).json(
      successResponse({
        message: 'Item removed successfully',
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
