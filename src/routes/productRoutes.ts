// src/routes/productRoutes.ts
import { createProductController } from '@controllers/products/createProduct';
import { deleteProductController } from '@controllers/products/deleteProduct';
import { getProductByIdController } from '@controllers/products/getProductById';
import { getProductsController } from '@controllers/products/getProductsList';
import { updateProductController } from '@controllers/products/updateProduct';
import { upload } from '@middlewares/upload';
import express from 'express';
import { authMiddleware, isAdmin } from '@middlewares/authMiddleware';
// import { upload } from '@middlewares/upload';

const router = express.Router();

// ADMIN → create product
router.post(
  '/add',
  authMiddleware,
  isAdmin,
  upload.array('images', 5),
  createProductController
);

//  USER + ADMIN → list products
router.get('/list', authMiddleware, getProductsController); // all authenticated users

// USER + ADMIN → get product by id
router.get('/:id', authMiddleware, getProductByIdController);

//  ADMIN → update product by id
router.put(
  '/update/:id',
  authMiddleware, // user must be logged in
  isAdmin,
  upload.array('images'), // multiple file upload
  updateProductController
);

//  ADMIN → delete product
router.delete('/remove/:id', authMiddleware, isAdmin, deleteProductController);

export default router;
