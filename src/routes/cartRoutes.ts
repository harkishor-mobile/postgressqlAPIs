// src/routes/cartRoutes.ts
import { addToCartController } from '@controllers/cart/addToCart';
import { adminGetAllCartsController } from '@controllers/cart/adminGetAllCartsController';
import { clearCartController } from '@controllers/cart/clearCartController';
import { getMyCartListController } from '@controllers/cart/getCartItemList';
import { removeCartItemController } from '@controllers/cart/removeCartItemController';
import { updateCartQuantityController } from '@controllers/cart/updateCartQuantityController';
import { authMiddleware, isAdmin } from '@middlewares/authMiddleware';
import { Router } from 'express';

const router = Router();

// All require auth
router.post('/add', authMiddleware, addToCartController); // body: { productId, quantity? }
router.get('/list', authMiddleware, getMyCartListController);
router.put('/update', authMiddleware, updateCartQuantityController); // body: { productId, quantity }
router.delete('/remove/:productId', authMiddleware, removeCartItemController);

router.delete('/clear', authMiddleware, clearCartController);

// // Admin
router.get('/admin/all', authMiddleware, isAdmin, adminGetAllCartsController);

export default router;
