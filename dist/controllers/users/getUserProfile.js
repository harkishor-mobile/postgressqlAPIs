"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileController = void 0;
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const userService_1 = require("@services/userService");
const getUserProfileController = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        if (isNaN(userId)) {
            return res.status(statusCode_1.default.BAD_REQUEST).json((0, response_1.errorResponse)({
                message: 'Invalid user ID',
                statusCode: statusCode_1.default.BAD_REQUEST,
                data: null,
            }));
        }
        const user = await (0, userService_1.getUserProfile)(userId);
        if (!user) {
            return res.status(statusCode_1.default.NOT_FOUND).json((0, response_1.errorResponse)({
                message: 'User not found',
                statusCode: statusCode_1.default.NOT_FOUND,
                data: null,
            }));
        }
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            data: user,
            message: 'User profile fetched successfully',
            statusCode: statusCode_1.default.OK,
        }));
    }
    catch (err) {
        console.error(err);
        return res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json((0, response_1.errorResponse)({
            message: err.message || 'Internal server error',
            statusCode: statusCode_1.default.INTERNAL_SERVER_ERROR,
            data: null,
        }));
    }
};
exports.getUserProfileController = getUserProfileController;
