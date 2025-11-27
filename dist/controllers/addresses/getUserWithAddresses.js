"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWithAddressesController = void 0;
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const addressService_1 = require("@services/addressService");
const hidePassword_1 = require("@utils/hidePassword");
const getUserWithAddressesController = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const user = await (0, addressService_1.getUserAddressList)(userId);
        if (!user) {
            return res.status(statusCode_1.default.NOT_FOUND).json((0, response_1.errorResponse)({
                message: 'User not found',
                statusCode: statusCode_1.default.NOT_FOUND,
                data: null,
            }));
        }
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            data: (0, hidePassword_1.hidePassword)(user), // remove password from response
            message: 'User with addresses fetched successfully',
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
exports.getUserWithAddressesController = getUserWithAddressesController;
