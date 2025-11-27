// src/controllers/products/getProductsList.ts
import { getProductList } from '@services/productService';
import { errorResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import { Request, Response } from 'express';

export const getProductsController = async (req: Request, res: Response) => {
  try {
    // Extract query params
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const search = req.query.search ? String(req.query.search) : undefined;

    // Call service
    const result = await getProductList({ page, limit, search });

    return res.json({
      success: true,
      message: 'Products fetched successfully',
      statusCode: StatusCode.OK,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (err) {
    console.error('Get products error:', err);
    return res.status(StatusCode.BAD_REQUEST).json(
      errorResponse({
        message: 'Failed to fetch products',
        statusCode: StatusCode.BAD_REQUEST,
      })
    );
  }
};
