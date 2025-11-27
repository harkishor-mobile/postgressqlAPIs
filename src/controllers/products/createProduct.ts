// src/controllers/createProduct.ts
import { Request, Response } from 'express';
import * as productService from '@services/productService';
import { errorResponse, successResponse } from '@utils/response';
import StatusCode from '@utils/statusCode';
import cloudinary from '@config/cloudinary';

export const createProductController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { name, price, description } = req.body;

    const files = req.files as Express.Multer.File[] | undefined;
    const images: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const uploadRes = await cloudinary.uploader.upload(file.path, {
          folder: 'products',
        });
        images.push(uploadRes.secure_url);
      }
    }

    const product = await productService.createProductService(userId, {
      name,
      price: Number(price),
      description,
      images,
      createdById: userId,
    });

    return res.status(StatusCode.CREATED).json(
      successResponse({
        message: 'Product created successfully',
        statusCode: StatusCode.CREATED,
        data: product,
      })
    );
  } catch (err: any) {
    return res.status(StatusCode.BAD_REQUEST).json(
      errorResponse({
        message: err.message || 'Product creation failed',
        statusCode: StatusCode.BAD_REQUEST,
      })
    );
  }
};
