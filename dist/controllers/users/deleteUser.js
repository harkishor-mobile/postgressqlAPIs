"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = void 0;
// src/controllers/users/deleteUser.ts
const userService_1 = require("@services/userService");
const hidePassword_1 = require("@utils/hidePassword");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const deleteUserController = async (req, res) => {
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
        //  delete user information
        const deletedUser = await (0, userService_1.deleteUser)(id);
        return res.status(statusCode_1.default.OK).json({
            success: true,
            statusCode: statusCode_1.default.OK,
            message: 'User deleted successfully',
            data: (0, hidePassword_1.hidePassword)(deletedUser),
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
exports.deleteUserController = deleteUserController;
