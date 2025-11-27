// src/controllers/users/deleteUser.ts
import { deleteProduct, getProductById } from '@services/productService';
import { errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { Request, Response } from 'express';

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const id = Number(req.params.id);

    //  Check if product exists first
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return res.status(StatusCode.NOT_FOUND).json(
        errorResponse({
          message: 'Product not found',
          statusCode: StatusCode.NOT_FOUND,
          data: null,
        })
      );
    }

    //  delete user information
    const deletedUser = await deleteProduct(userId, id);

    return res.status(StatusCode.OK).json({
      success: true,
      statusCode: StatusCode.OK,
      message: 'Product deleted successfully',
      data: deletedUser,
    });
  } catch (err: any) {
    return res.status(StatusCode.BAD_REQUEST).json({
      success: false,
      statusCode: StatusCode.BAD_REQUEST,
      message: err.message || 'Internal server error',
      data: null,
    });
  }
};
