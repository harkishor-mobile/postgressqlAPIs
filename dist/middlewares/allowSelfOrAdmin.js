"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowSelfOrAdmin = void 0;
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const response_1 = require("@utils/response");
/**
 * Allows access if requester is ADMIN OR requester id === :id
 * Useful for GET /users/:id and GET /users/profile/:id
 */
const allowSelfOrAdmin = (req, res, next) => {
    const user = req.user;
    const requestedId = Number(req.params.id);
    if (!user) {
        return res.status(statusCode_1.default.UNAUTHORIZED).json((0, response_1.errorResponse)({
            message: 'Not authenticated',
            statusCode: statusCode_1.default.UNAUTHORIZED,
        }));
    }
    if (user.role === 'ADMIN' || user.id === requestedId) {
        return next();
    }
    return res.status(statusCode_1.default.FORBIDDEN).json((0, response_1.errorResponse)({
        message: 'Access denied',
        statusCode: statusCode_1.default.FORBIDDEN,
    }));
};
exports.allowSelfOrAdmin = allowSelfOrAdmin;
