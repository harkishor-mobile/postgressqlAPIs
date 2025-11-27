"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminGetAllCartsController = void 0;
// src/controllers/cart/adminGetAllCartsController.ts
const cartService_1 = require("@services/cartService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const adminGetAllCartsController = async (_, res) => {
    try {
        const result = await (0, cartService_1.getAllCarts)();
        return res.json({
            success: true,
            message: 'All carts fetched successfully',
            data: result,
        });
    }
    catch (error) {
        return res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json((0, response_1.errorResponse)({
            message: error.message || 'Internal server error',
            statusCode: statusCode_1.default.INTERNAL_SERVER_ERROR,
            data: null,
        }));
    }
};
exports.adminGetAllCartsController = adminGetAllCartsController;
