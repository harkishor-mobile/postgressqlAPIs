"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = void 0;
// src/controllers/users/updateUser.ts
const userService_1 = require("@services/userService");
const hidePassword_1 = require("@utils/hidePassword");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const updateUserController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        //  Check if user exists first
        const existingUser = await (0, userService_1.getUserById)(id);
        if (!existingUser) {
            return res.status(statusCode_1.default.NOT_FOUND).json((0, response_1.errorResponse)({
                message: 'User not found',
                statusCode: statusCode_1.default.NOT_FOUND,
                data: null,
            }));
        }
        //  update user information
        const updatedUser = await (0, userService_1.updateUser)(id, req.body, req.file);
        // Send consistent JSON response
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            data: (0, hidePassword_1.hidePassword)(updatedUser),
            message: 'User updated successfully',
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
exports.updateUserController = updateUserController;
