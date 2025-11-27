"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByIdController = void 0;
// src/controllers/products/getProductById.ts
const productService_1 = require("@services/productService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        // Validate ID
        const productId = Number(id);
        if (isNaN(productId)) {
            return res.status(statusCode_1.default.BAD_REQUEST).json((0, response_1.errorResponse)({
                message: 'Invalid product ID',
                statusCode: statusCode_1.default.BAD_REQUEST,
            }));
        }
        // Fetch product
        const product = await (0, productService_1.getProductById)(productId);
        // If product not found
        if (!product) {
            return res.status(statusCode_1.default.NOT_FOUND).json((0, response_1.errorResponse)({
                message: 'Product not found',
                statusCode: statusCode_1.default.NOT_FOUND,
            }));
        }
        // Success response
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            message: 'Product detail fetched successfully',
            statusCode: statusCode_1.default.OK,
            data: product,
        }));
    }
    catch (err) {
        console.error('Get product by ID error:', err);
        return res.status(statusCode_1.default.BAD_REQUEST).json((0, response_1.errorResponse)({
            message: 'Failed to fetch product',
            statusCode: statusCode_1.default.BAD_REQUEST,
        }));
    }
};
exports.getProductByIdController = getProductByIdController;
