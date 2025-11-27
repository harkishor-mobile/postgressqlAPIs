// src/controllers/products/updateProduct.ts
import cloudinary from '@config/cloudinary';
import prisma from '@config/db';
import { Request, Response } from 'express';

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);

    const removeImages = req.body.removeImages
      ? JSON.parse(req.body.removeImages)
      : [];

    const files = req.files as Express.Multer.File[];

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // ========== FIXED CLOUDINARY PUBLIC ID LOGIC ================
    const getPublicId = (url: string) => {
      const afterUpload = url.split('/upload/')[1];
      return afterUpload.split('.')[0]; // remove extension
    };

    // ============ DELETE IMAGES PROPERLY ===========
    for (const img of removeImages) {
      const publicId = getPublicId(img);
      await cloudinary.uploader.destroy(publicId);
    }

    // Upload new images
    let newUploadedImages = [];

    for (const file of files) {
      const uploadRes = await cloudinary.uploader.upload(file.path, {
        folder: 'products',
      });
      newUploadedImages.push(uploadRes.secure_url);
    }

    // ================ REBUILD IMAGE LIST  ================
    const finalImages = [
      ...product.images.filter((img) => !removeImages.includes(img)),
      ...newUploadedImages,
    ];

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        images: finalImages,
      },
    });

    return res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
