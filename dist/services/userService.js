"use strict";
//src/services/userService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserEmail = exports.getUserProfile = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.getUsersPaginated = void 0;
const db_1 = __importDefault(require("@config/db"));
const hidePassword_1 = require("@utils/hidePassword");
/**
 * Get paginated users with optional search, sorting, and exclusion of a user
 */
const getUsersPaginated = async ({ page = 1, limit = 10, search, sortBy, excludeUserId, }) => {
    const skip = (page - 1) * limit;
    // Build search filter
    const where = {
        ...(search && {
            OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ],
        }),
        ...(excludeUserId && { id: { not: excludeUserId } }),
    };
    // Sorting
    let orderBy = undefined;
    if (sortBy) {
        const [field, direction] = sortBy.split(':');
        const allowed = ['id', 'firstName', 'lastName', 'age', 'createdAt'];
        if (allowed.includes(field)) {
            orderBy = { [field]: direction === 'desc' ? 'desc' : 'asc' };
        }
    }
    // Total users matching filter
    const total = await db_1.default.user.count({ where });
    // Fetch users with pagination
    const users = await db_1.default.user.findMany({
        skip,
        take: limit,
        where,
        orderBy,
    });
    return {
        data: users.map(hidePassword_1.hidePassword),
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getUsersPaginated = getUsersPaginated;
/**
 * Fetch all users from the database
 */
const getAllUsers = async () => {
    const users = await db_1.default.user.findMany();
    return users.map(hidePassword_1.hidePassword);
};
exports.getAllUsers = getAllUsers;
/**
 * Get a single user by ID
 * @param userId - Numeric user ID
 */
const getUserById = async (userId) => {
    const user = await db_1.default.user.findUnique({ where: { id: userId } });
    return (0, hidePassword_1.hidePassword)(user);
};
exports.getUserById = getUserById;
/**
 * Update user details by ID
 * @param userId - Numeric user ID
 * @param data - Fields to update (firstName, lastName, email, age)
 */
const updateUser = async (userId, data, file) => {
    const updateData = {
        ...data,
    };
    // If new image uploaded → update image path
    if (file) {
        updateData.image = file.path; // Cloudinary URL
    }
    return db_1.default.user.update({
        where: { id: userId },
        data: updateData,
    });
};
exports.updateUser = updateUser;
/**
 * Delete a user by ID
 * @param userId - Numeric user ID
 * DELETE USER WITH CASCADE (works only if FK has ON DELETE CASCADE)
 */
const deleteUser = async (userId) => {
    return db_1.default.user.delete({
        where: { id: userId },
    });
};
exports.deleteUser = deleteUser;
/**
 * Get full user profile including all related addresses
 * @param userId - Numeric user ID
 * Includes: addresses[]
 */
const getUserProfile = async (userId) => {
    const user = await db_1.default.user.findUnique({
        where: { id: userId },
        include: { addresses: true },
    });
    return (0, hidePassword_1.hidePassword)(user);
};
exports.getUserProfile = getUserProfile;
/**
 * Get user by email (used for checking if email already exists)
 * @param email - User email string
 */
const getUserEmail = (email) => {
    return db_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
};
exports.getUserEmail = getUserEmail;
