"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
// src/controllers/auth/registerUser.ts
const authServices_1 = require("@services/authServices");
const hidePassword_1 = require("@utils/hidePassword");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const registerController = async (req, res) => {
    try {
        const user = await (0, authServices_1.registerUser)(req.body, req.file);
        return res.status(statusCode_1.default.CREATED).json((0, response_1.successResponse)({
            message: 'User registered successfully',
            data: (0, hidePassword_1.hidePassword)(user),
            statusCode: statusCode_1.default.CREATED,
        }));
    }
    catch (err) {
        return res.status(statusCode_1.default.BAD_REQUEST).json((0, response_1.errorResponse)({
            message: err.message,
            statusCode: statusCode_1.default.BAD_REQUEST,
            data: null,
        }));
    }
};
exports.registerController = registerController;
