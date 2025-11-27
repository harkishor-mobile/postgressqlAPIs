"use strict";
// src/controllers/address/getUserAddresses.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAddressesController = void 0;
const addressService_1 = require("@services/addressService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const getUserAddressesController = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const addresses = await (0, addressService_1.getUserAddressesOnly)(userId);
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            data: addresses,
            message: 'User address list fetched successfully',
            statusCode: statusCode_1.default.OK,
        }));
    }
    catch (error) {
        return res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json((0, response_1.errorResponse)({
            message: error.message,
            statusCode: statusCode_1.default.INTERNAL_SERVER_ERROR,
            data: null,
        }));
    }
};
exports.getUserAddressesController = getUserAddressesController;
