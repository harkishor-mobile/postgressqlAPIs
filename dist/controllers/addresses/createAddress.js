"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressController = void 0;
const addressService_1 = require("@services/addressService");
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const createAddressController = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const { street, city, state, zipCode } = req.body;
        const address = await (0, addressService_1.createAddress)({
            userId: loggedInUserId,
            street,
            city,
            state,
            zipCode,
        });
        return res.status(statusCode_1.default.CREATED).json((0, response_1.successResponse)({
            data: address,
            message: 'Address added successfully',
            statusCode: statusCode_1.default.CREATED,
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
exports.createAddressController = createAddressController;
