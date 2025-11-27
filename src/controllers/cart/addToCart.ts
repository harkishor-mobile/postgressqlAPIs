// src/controllers/cart/addToCart.ts
import { Request, Response } from 'express';
import { addToCart } from '@services/cartService';
import { successResponse, errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';

export const addToCartController = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { productId, quantity } = req.body;

    const data = await addToCart(user.id, productId, quantity);

    return res.status(StatusCode.OK).json(
      successResponse({
        message: 'Product added to cart',
        data,
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
