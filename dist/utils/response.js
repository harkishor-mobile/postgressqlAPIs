"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const statusCode_1 = __importDefault(require("./statusCode"));
const successResponse = ({ data = null, message = 'Request successful', statusCode = statusCode_1.default.OK, }) => {
    return {
        success: true,
        statusCode,
        message,
        data,
    };
};
exports.successResponse = successResponse;
const errorResponse = ({ message = 'Something went wrong', statusCode = statusCode_1.default.INTERNAL_SERVER_ERROR, data = null, }) => {
    return {
        success: false,
        statusCode,
        message,
        data,
    };
};
exports.errorResponse = errorResponse;
