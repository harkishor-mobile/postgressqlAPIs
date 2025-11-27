"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInUserAddresses = exports.deleteAddress = exports.updateAddress = exports.getUserAddressesOnly = exports.getAddressById = exports.getUserAddressList = exports.createAddress = void 0;
// src/services/addressService.ts
const db_1 = __importDefault(require("@config/db"));
/**
 * Create a new address for a user
 */
const createAddress = async (data) => {
    return db_1.default.address.create({ data });
};
exports.createAddress = createAddress;
/**
 * Get user + their address list (User + addresses)
 * This returns user object PLUS all addresses
 */
const getUserAddressList = async (userId) => {
    return db_1.default.user.findUnique({
        where: { id: userId },
        include: { addresses: true }, // fetch all related addresses
    });
};
exports.getUserAddressList = getUserAddressList;
/**
 * Get a single address by addressId
 */
const getAddressById = async (addressId) => {
    return db_1.default.address.findUnique({
        where: { id: addressId },
    });
};
exports.getAddressById = getAddressById;
/**
 * Get ONLY addresses of a user (without user details)
 */
const getUserAddressesOnly = async (userId) => {
    return db_1.default.address.findMany({
        where: { userId },
    });
};
exports.getUserAddressesOnly = getUserAddressesOnly;
/**
 * Update an address by ID
 */
const updateAddress = async (addressId, data) => {
    return db_1.default.address.update({
        where: { id: addressId },
        data,
    });
};
exports.updateAddress = updateAddress;
/**
 * Delete an address by ID
 */
const deleteAddress = async (addressId) => {
    return db_1.default.address.delete({
        where: { id: addressId },
    });
};
exports.deleteAddress = deleteAddress;
/**
 * Get address list of login user
 * @param {number } userId
 */
const getLoggedInUserAddresses = async (userId) => {
    return db_1.default.address.findMany({
        where: { userId }, //  Correct column
    });
};
exports.getLoggedInUserAddresses = getLoggedInUserAddresses;
