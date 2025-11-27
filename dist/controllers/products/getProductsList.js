"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsController = void 0;
// src/controllers/products/getProductsList.ts
const productService_1 = require("@services/productService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const getProductsController = async (req, res) => {
    try {
        // Extract query params
        const page = req.query.page ? Number(req.query.page) : undefined;
        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const search = req.query.search ? String(req.query.search) : undefined;
        // Call service
        const result = await (0, productService_1.getProductList)({ page, limit, search });
        return res.json({
            success: true,
            message: 'Products fetched successfully',
            statusCode: statusCode_1.default.OK,
            data: result.data,
            pagination: result.pagination,
        });
    }
    catch (err) {
        console.error('Get products error:', err);
        return res.status(statusCode_1.default.BAD_REQUEST).json((0, response_1.errorResponse)({
            message: 'Failed to fetch products',
            statusCode: statusCode_1.default.BAD_REQUEST,
        }));
    }
};
exports.getProductsController = getProductsController;
