"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyCartListController = void 0;
const cartService_1 = require("@services/cartService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const getMyCartListController = async (req, res) => {
    try {
        const user = req.user;
        const cart = await (0, cartService_1.getCartItems)(user.id);
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            message: 'Cart fetched successfully',
            data: cart,
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
exports.getMyCartListController = getMyCartListController;
