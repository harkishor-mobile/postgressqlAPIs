// src/controllers/cart/adminGetAllCartsController.ts
import { getAllCarts } from '@services/cartService';
import { errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { Request, Response } from 'express';

export const adminGetAllCartsController = async (_: Request, res: Response) => {
  try {
    const result = await getAllCarts();

    return res.json({
      success: true,
      message: 'All carts fetched successfully',
      data: result,
    });
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
