// src/controllers/cart/clearCartController.ts
import { Request, Response } from 'express';
import { clearCart } from '@services/cartService';
import { errorResponse, successResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';

export const clearCartController = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    await clearCart(user.id);

    return res.status(StatusCode.OK).json(
      successResponse({
        message: 'Cart cleared successfully',
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
