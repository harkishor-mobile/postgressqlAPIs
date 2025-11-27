"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureIsAdmin = void 0;
// src/utils/ensureIsAdmin.ts
const db_1 = __importDefault(require("@config/db"));
//  ------------- UTILITY: ADMIN VALIDATION ------------
/**
 * ensureIsAdmin()
 * Verifies if given userId belongs to an admin.
 * - Throws descriptive error if not admin.
 */
const ensureIsAdmin = async (userId) => {
    const user = await db_1.default.user.findUnique({
        where: { id: userId },
        select: { id: true, role: true },
    });
    if (!user) {
        throw new Error('User not found');
    }
    if (user.role !== 'ADMIN') {
        throw new Error('Unauthorized — Admin access required');
    }
    return user; // optional return
};
exports.ensureIsAdmin = ensureIsAdmin;
