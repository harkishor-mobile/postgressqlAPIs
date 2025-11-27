// src/controllers/cart/updateCartQuantityController.ts
import { Request, Response } from 'express';
import { updateCartItemQuantity } from '@services/cartService';
import { successResponse, errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';

export const updateCartQuantityController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;
    const { productId, quantity } = req.body;

    const data = await updateCartItemQuantity(user.id, productId, quantity);

    return res.status(StatusCode.OK).json(
      successResponse({
        message: 'Cart updated',
        data,
        statusCode: StatusCode.OK,
      })
    );
  } catch (error: any) {
    return res.status(StatusCode.BAD_REQUEST).json(
      errorResponse({
        message: error.message,
        statusCode: StatusCode.BAD_REQUEST,
      })
    );
  }
};
