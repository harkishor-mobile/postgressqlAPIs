"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAddressesController = void 0;
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const addressService_1 = require("@services/addressService");
const getUserAddressesController = async (req, res) => {
    try {
        const userId = req.user.id;
        const addresses = await (0, addressService_1.getLoggedInUserAddresses)(userId);
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            message: 'Address list fetched successfully',
            data: addresses,
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
exports.getUserAddressesController = getUserAddressesController;
