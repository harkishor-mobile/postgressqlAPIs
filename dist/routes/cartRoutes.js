"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/cartRoutes.ts
const addToCart_1 = require("@controllers/cart/addToCart");
const adminGetAllCartsController_1 = require("@controllers/cart/adminGetAllCartsController");
const clearCartController_1 = require("@controllers/cart/clearCartController");
const getCartItemList_1 = require("@controllers/cart/getCartItemList");
const removeCartItemController_1 = require("@controllers/cart/removeCartItemController");
const updateCartQuantityController_1 = require("@controllers/cart/updateCartQuantityController");
const authMiddleware_1 = require("@middlewares/authMiddleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
// All require auth
router.post('/add', authMiddleware_1.authMiddleware, addToCart_1.addToCartController); // body: { productId, quantity? }
router.get('/list', authMiddleware_1.authMiddleware, getCartItemList_1.getMyCartListController);
router.put('/update', authMiddleware_1.authMiddleware, updateCartQuantityController_1.updateCartQuantityController); // body: { productId, quantity }
router.delete('/remove/:productId', authMiddleware_1.authMiddleware, removeCartItemController_1.removeCartItemController);
router.delete('/clear', authMiddleware_1.authMiddleware, clearCartController_1.clearCartController);
// // Admin
router.get('/admin/all', authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, adminGetAllCartsController_1.adminGetAllCartsController);
exports.default = router;
