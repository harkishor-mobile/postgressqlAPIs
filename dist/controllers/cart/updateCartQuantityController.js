"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartQuantityController = void 0;
const cartService_1 = require("@services/cartService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const updateCartQuantityController = async (req, res) => {
    try {
        const user = req.user;
        const { productId, quantity } = req.body;
        const data = await (0, cartService_1.updateCartItemQuantity)(user.id, productId, quantity);
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            message: 'Cart updated',
            data,
            statusCode: statusCode_1.default.OK,
        }));
    }
    catch (error) {
        return res.status(statusCode_1.default.BAD_REQUEST).json((0, response_1.errorResponse)({
            message: error.message,
            statusCode: statusCode_1.default.BAD_REQUEST,
        }));
    }
};
exports.updateCartQuantityController = updateCartQuantityController;
