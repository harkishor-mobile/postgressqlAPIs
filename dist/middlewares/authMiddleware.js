"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = exports.isAdmin = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const response_1 = require("@utils/response");
const JWT_SECRET = process.env.JWT_SECRET || 'MyJwtSecretKey@123@';
const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(statusCode_1.default.UNAUTHORIZED).json((0, response_1.errorResponse)({
            message: 'No token provided',
            statusCode: statusCode_1.default.UNAUTHORIZED,
        }));
    }
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(statusCode_1.default.UNAUTHORIZED).json((0, response_1.errorResponse)({
            message: 'Invalid authorization header',
            statusCode: statusCode_1.default.UNAUTHORIZED,
        }));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        //  Use 'as any' to assign to Request.user safely
        req.user = decoded;
        return next();
    }
    catch (err) {
        return res.status(statusCode_1.default.UNAUTHORIZED).json((0, response_1.errorResponse)({
            message: 'Invalid or expired token',
            statusCode: statusCode_1.default.UNAUTHORIZED,
        }));
    }
};
exports.authMiddleware = authMiddleware;
// Admin middleware
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(statusCode_1.default.UNAUTHORIZED).json((0, response_1.errorResponse)({
            message: 'Not authenticated',
            statusCode: statusCode_1.default.UNAUTHORIZED,
        }));
    }
    if (user.role !== 'ADMIN') {
        return res.status(statusCode_1.default.FORBIDDEN).json((0, response_1.errorResponse)({
            message: 'Admin access only',
            statusCode: statusCode_1.default.FORBIDDEN,
        }));
    }
    next();
};
exports.isAdmin = isAdmin;
// User middleware
const isUser = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(statusCode_1.default.UNAUTHORIZED).json((0, response_1.errorResponse)({
            message: 'Not authenticated',
            statusCode: statusCode_1.default.UNAUTHORIZED,
        }));
    }
    if (user.role !== 'USER') {
        return res.status(statusCode_1.default.FORBIDDEN).json((0, response_1.errorResponse)({
            message: 'User access only',
            statusCode: statusCode_1.default.FORBIDDEN,
        }));
    }
    next();
};
exports.isUser = isUser;
