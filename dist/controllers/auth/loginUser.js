"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
// src/controllers/auth/loginUser.ts
const authServices_1 = require("@services/authServices");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await (0, authServices_1.loginUser)(email, password);
        return res.json({
            message: 'Login successfully',
            statusCode: statusCode_1.default.OK,
            data: user, // user object directly under data
            token, // token at top level
        });
    }
    catch (err) {
        return res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json((0, response_1.errorResponse)({
            message: err.message || 'Internal server error',
            statusCode: statusCode_1.default.INTERNAL_SERVER_ERROR,
            data: null,
        }));
    }
};
exports.loginController = loginController;
