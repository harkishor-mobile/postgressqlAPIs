"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProductService = exports.getProductById = exports.getProductList = exports.createProductService = void 0;
// src/services/productService.ts
const db_1 = __importDefault(require("@config/db"));
const ensureIsAdmin_1 = require("@utils/ensureIsAdmin");
/**
 * Create new product
 * - Only admins can create
 */
const createProductService = async (actingUserId, data) => {
    await (0, ensureIsAdmin_1.ensureIsAdmin)(actingUserId);
    return db_1.default.product.create({ data });
};
exports.createProductService = createProductService;
/**
 * Fetch paginated list of products
 * - Optional search (name, description)
 * - Available to all users
 */
const getProductList = async (params) => {
    const page = params?.page && params.page > 0 ? params.page : 1;
    const limit = params?.limit && params.limit > 0 ? params.limit : 10;
    const skip = (page - 1) * limit;
    // Build flexible search query
    const where = params?.search
        ? {
            OR: [
                { name: { contains: params.search, mode: 'insensitive' } },
                { description: { contains: params.search, mode: 'insensitive' } },
            ],
        }
        : {};
    const [total, items] = await Promise.all([
        db_1.default.product.count({ where }),
        db_1.default.product.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        }),
    ]);
    return {
        data: items,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getProductList = getProductList;
/**
 * Fetch product by ID
 * - Returns `null` if not found (controller handles)
 */
const getProductById = async (productId) => {
    return db_1.default.product.findUnique({
        where: { id: productId },
    });
};
exports.getProductById = getProductById;
/**
 * Update product
 * - Only Admins can update
 * - Throws error if product doesn't exist
 */
const updateProductService = async (actingUserId, productId, data) => {
    // Ensure admin
    await (0, ensureIsAdmin_1.ensureIsAdmin)(actingUserId);
    try {
        // Update product
        return await db_1.default.product.update({
            where: { id: productId },
            data,
        });
    }
    catch (err) {
        if (err.code === 'P2025') {
            throw new Error('Product not found');
        }
        throw err;
    }
};
exports.updateProductService = updateProductService;
/**
 * Delete product by ID
 * - Only admins can delete
 * - Throws error if product does not exist
 */
const deleteProduct = async (actingUserId, productId) => {
    await (0, ensureIsAdmin_1.ensureIsAdmin)(actingUserId);
    try {
        return await db_1.default.product.delete({
            where: { id: productId },
        });
    }
    catch (err) {
        if (err.code === 'P2025') {
            throw new Error('Product not found');
        }
        throw err;
    }
};
exports.deleteProduct = deleteProduct;
