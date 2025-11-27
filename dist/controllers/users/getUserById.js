"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdController = void 0;
// src/controllers/users/getUserById.ts
const userService_1 = require("@services/userService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const getUserByIdController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = await (0, userService_1.getUserById)(id);
        if (!user) {
            return res.status(statusCode_1.default.NOT_FOUND).json((0, response_1.errorResponse)({
                message: 'User not found',
                statusCode: statusCode_1.default.NOT_FOUND,
                data: null,
            }));
        }
        // Send consistent JSON response
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            data: user,
            message: 'User fetched successfully',
            statusCode: statusCode_1.default.OK,
        }));
    }
    catch (err) {
        return res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json((0, response_1.errorResponse)({
            message: err.message || 'Internal server error',
            statusCode: statusCode_1.default.INTERNAL_SERVER_ERROR,
            data: null,
        }));
    }
};
exports.getUserByIdController = getUserByIdController;
