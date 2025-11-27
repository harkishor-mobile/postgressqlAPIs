// src/controllers/products/getProductById.ts
import { getProductById } from '@services/productService';
import { errorResponse, successResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { Request, Response } from 'express';

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate ID
    const productId = Number(id);
    if (isNaN(productId)) {
      return res.status(StatusCode.BAD_REQUEST).json(
        errorResponse({
          message: 'Invalid product ID',
          statusCode: StatusCode.BAD_REQUEST,
        })
      );
    }

    // Fetch product

    const product = await getProductById(productId);
    // If product not found
    if (!product) {
      return res.status(StatusCode.NOT_FOUND).json(
        errorResponse({
          message: 'Product not found',
          statusCode: StatusCode.NOT_FOUND,
        })
      );
    }

    // Success response
    return res.status(StatusCode.OK).json(
      successResponse({
        message: 'Product detail fetched successfully',
        statusCode: StatusCode.OK,
        data: product,
      })
    );
  } catch (err) {
    console.error('Get product by ID error:', err);

    return res.status(StatusCode.BAD_REQUEST).json(
      errorResponse({
        message: 'Failed to fetch product',
        statusCode: StatusCode.BAD_REQUEST,
      })
    );
  }
};
