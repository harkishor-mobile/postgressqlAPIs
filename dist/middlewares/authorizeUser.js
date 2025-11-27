"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeUser = void 0;
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const response_1 = require("@utils/response");
const authorizeUser = (req, res, next) => {
    const loggedInUserId = req.user?.id;
    const requestedId = Number(req.params.id);
    if (!requestedId || isNaN(requestedId)) {
        return res.status(statusCode_1.default.BAD_REQUEST).json((0, response_1.errorResponse)({
            message: 'Invalid user ID',
            statusCode: statusCode_1.default.BAD_REQUEST,
        }));
    }
    if (loggedInUserId !== requestedId) {
        return res.status(statusCode_1.default.FORBIDDEN).json((0, response_1.errorResponse)({
            message: 'Access denied',
            statusCode: statusCode_1.default.FORBIDDEN,
        }));
    }
    next();
};
exports.authorizeUser = authorizeUser;
