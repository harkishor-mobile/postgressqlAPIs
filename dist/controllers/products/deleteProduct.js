"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = void 0;
// src/controllers/users/deleteUser.ts
const productService_1 = require("@services/productService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const deleteProductController = async (req, res) => {
    try {
        const userId = req.user.id;
        const id = Number(req.params.id);
        //  Check if product exists first
        const existingProduct = await (0, productService_1.getProductById)(id);
        if (!existingProduct) {
            return res.status(statusCode_1.default.NOT_FOUND).json((0, response_1.errorResponse)({
                message: 'Product not found',
                statusCode: statusCode_1.default.NOT_FOUND,
                data: null,
            }));
        }
        //  delete user information
        const deletedUser = await (0, productService_1.deleteProduct)(userId, id);
        return res.status(statusCode_1.default.OK).json({
            success: true,
            statusCode: statusCode_1.default.OK,
            message: 'Product deleted successfully',
            data: deletedUser,
        });
    }
    catch (err) {
        return res.status(statusCode_1.default.BAD_REQUEST).json({
            success: false,
            statusCode: statusCode_1.default.BAD_REQUEST,
            message: err.message || 'Internal server error',
            data: null,
        });
    }
};
exports.deleteProductController = deleteProductController;
