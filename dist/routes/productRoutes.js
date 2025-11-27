"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/productRoutes.ts
const createProduct_1 = require("@controllers/products/createProduct");
const deleteProduct_1 = require("@controllers/products/deleteProduct");
const getProductById_1 = require("@controllers/products/getProductById");
const getProductsList_1 = require("@controllers/products/getProductsList");
const updateProduct_1 = require("@controllers/products/updateProduct");
const upload_1 = require("@middlewares/upload");
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("@middlewares/authMiddleware");
// import { upload } from '@middlewares/upload';
const router = express_1.default.Router();
// ADMIN → create product
router.post('/add', authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, upload_1.upload.array('images', 5), createProduct_1.createProductController);
//  USER + ADMIN → list products
router.get('/list', authMiddleware_1.authMiddleware, getProductsList_1.getProductsController); // all authenticated users
// USER + ADMIN → get product by id
router.get('/:id', authMiddleware_1.authMiddleware, getProductById_1.getProductByIdController);
//  ADMIN → update product by id
router.put('/update/:id', authMiddleware_1.authMiddleware, // user must be logged in
authMiddleware_1.isAdmin, upload_1.upload.array('images'), // multiple file upload
updateProduct_1.updateProductController);
//  ADMIN → delete product
router.delete('/remove/:id', authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, deleteProduct_1.deleteProductController);
exports.default = router;
