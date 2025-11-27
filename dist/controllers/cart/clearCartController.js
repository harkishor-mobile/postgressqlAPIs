"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCartController = void 0;
const cartService_1 = require("@services/cartService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const clearCartController = async (req, res) => {
    try {
        const user = req.user;
        await (0, cartService_1.clearCart)(user.id);
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            message: 'Cart cleared successfully',
            statusCode: statusCode_1.default.OK,
        }));
    }
    catch (error) {
        return res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json((0, response_1.errorResponse)({
            message: error.message || 'Internal server error',
            statusCode: statusCode_1.default.INTERNAL_SERVER_ERROR,
            data: null,
        }));
    }
};
exports.clearCartController = clearCartController;
