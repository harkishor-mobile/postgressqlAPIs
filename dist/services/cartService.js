"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCarts = exports.adminGetAllCarts = exports.clearCart = exports.removeCartItem = exports.updateCartItemQuantity = exports.getCartItems = exports.addToCart = void 0;
// src/services/cartService.ts
const db_1 = __importDefault(require("@config/db"));
/**
 * Add product to cart
 * If item exists → increase quantity
 */
const addToCart = async (userId, productId, quantity = 1) => {
    const product = await db_1.default.product.findUnique({
        where: { id: productId },
    });
    if (!product)
        throw new Error('Product not found');
    const existing = await db_1.default.cartItem.findFirst({
        where: { userId, productId },
    });
    if (existing) {
        return await db_1.default.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + quantity },
        });
    }
    return await db_1.default.cartItem.create({
        data: {
            userId,
            productId,
            quantity,
        },
    });
};
exports.addToCart = addToCart;
/**
 * Get cart items + cart total
 */
const getCartItems = async (userId) => {
    const cartItems = await db_1.default.cartItem.findMany({
        where: { userId },
        include: { product: true },
        orderBy: { createdAt: 'desc' },
    });
    const total = cartItems.reduce((sum, item) => {
        return sum + item.quantity * item.product.price;
    }, 0);
    return { items: cartItems, total };
};
exports.getCartItems = getCartItems;
/**
 * Update item quantity in cart
 */
const updateCartItemQuantity = async (userId, productId, quantity) => {
    const existing = await db_1.default.cartItem.findFirst({
        where: { userId, productId },
    });
    if (!existing)
        throw new Error('Cart item not found');
    if (quantity <= 0) {
        await db_1.default.cartItem.delete({
            where: { id: existing.id },
        });
        return null;
    }
    return await db_1.default.cartItem.update({
        where: { id: existing.id },
        data: { quantity },
    });
};
exports.updateCartItemQuantity = updateCartItemQuantity;
/**
 * Remove single item from cart
 */
const removeCartItem = async (userId, productId) => {
    const existing = await db_1.default.cartItem.findFirst({
        where: { userId, productId },
    });
    if (!existing)
        throw new Error('Cart item not found');
    await db_1.default.cartItem.delete({
        where: { id: existing.id },
    });
    return true;
};
exports.removeCartItem = removeCartItem;
/**
 * Clear full cart
 */
const clearCart = async (userId) => {
    await db_1.default.cartItem.deleteMany({ where: { userId } });
    return true;
};
exports.clearCart = clearCart;
/**
 * Admin: get all user carts
 */
const adminGetAllCarts = async () => {
    const users = await db_1.default.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
            cartItems: {
                include: {
                    product: true,
                },
                orderBy: { createdAt: 'desc' },
            },
        },
        orderBy: { id: 'asc' },
    });
    // --- Format response ---
    const formatted = users.map((user) => {
        const userInfo = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImage: user.image,
        };
        const items = user.cartItems.map((item) => ({
            id: item.id,
            userId: item.userId,
            productId: item.productId,
            quantity: item.quantity,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            product: item.product,
            totalPrice: item.product.price * item.quantity,
        }));
        return {
            userInfo,
            items,
        };
    });
    const totalUsers = formatted.length;
    const totalCartItems = users.reduce((acc, u) => acc + u.cartItems.length, 0);
    return {
        carts: formatted,
        totalUsers,
        totalCartItems,
    };
};
exports.adminGetAllCarts = adminGetAllCarts;
const getAllCarts = async () => {
    // Fetch all users with their cart items
    const users = await db_1.default.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
            cartItems: {
                select: {
                    id: true,
                    productId: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            images: true,
                        },
                    },
                },
            },
        },
    });
    let totalCartItems = 0;
    let totalCartValue = 0;
    const formattedUsers = users.map((user) => {
        const items = user.cartItems.map((item) => {
            const totalPrice = item.product.price * item.quantity;
            totalCartItems++;
            totalCartValue += totalPrice;
            return {
                itemId: item.id,
                productId: item.productId,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                images: item.product.images,
                totalPrice,
            };
        });
        const cartTotal = items.reduce((sum, i) => sum + i.totalPrice, 0);
        return {
            id: user.id,
            name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
            email: user.email,
            profileImage: user.image || '',
            cartTotal,
            items,
        };
    });
    return {
        users: formattedUsers,
        summary: {
            totalUsers: users.length,
            totalCartItems,
            totalCartValue,
        },
    };
};
exports.getAllCarts = getAllCarts;
