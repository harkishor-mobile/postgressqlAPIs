"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressController = void 0;
const addressService_1 = require("@services/addressService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const deleteAddressController = async (req, res) => {
    try {
        const addressId = Number(req.params.addressId);
        const existing = await (0, addressService_1.getAddressById)(addressId);
        if (!existing) {
            return res.status(statusCode_1.default.NOT_FOUND).json((0, response_1.errorResponse)({
                message: 'Address not found',
                statusCode: statusCode_1.default.NOT_FOUND,
                data: null,
            }));
        }
        await (0, addressService_1.deleteAddress)(addressId);
        return res.status(statusCode_1.default.OK).json((0, response_1.successResponse)({
            data: null,
            message: 'Address deleted successfully',
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
exports.deleteAddressController = deleteAddressController;
