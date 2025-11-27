"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserListController = void 0;
const userService_1 = require("@services/userService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const getUserListController = async (req, res) => {
    try {
        const loggedInUserId = req.user?.id;
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        const search = req.query.search ? String(req.query.search) : undefined;
        const sortBy = req.query.sortBy ? String(req.query.sortBy) : undefined;
        const { data, pagination } = await (0, userService_1.getUsersPaginated)({
            page,
            limit,
            search,
            sortBy,
            excludeUserId: loggedInUserId,
        });
        // Normalize fields
        const normalizedData = data.map((user) => ({
            ...user,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            age: user.age ?? 0,
            updatedAt: user.updatedAt || '',
        }));
        return res.json({
            success: true,
            message: 'Users fetched successfully',
            statusCode: statusCode_1.default.OK,
            data: normalizedData,
            pagination,
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
exports.getUserListController = getUserListController;
