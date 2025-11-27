"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
// src/services/authService.ts
const db_1 = __importDefault(require("@config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("./userService");
const hidePassword_1 = require("@utils/hidePassword");
const client_1 = require("../generated/client");
// Secret key used for signing JWT tokens
const JWT_SECRET = process.env.JWT_SECRET || 'MyJwtSecretKey@123@';
/**
 * Register a new user
 * 1. Check if the email already exists
 * 2. Hash the user's password
 * 3. Save the user in the database
 */
const registerUser = async (data, file) => {
    const { email, password, firstName, lastName, age, role } = data;
    //  Step 1: Check if email is already registered
    const existingUser = await (0, userService_1.getUserEmail)(email);
    if (existingUser) {
        throw new Error('Email already exists');
    }
    //  Step 2: Encrypt the password before storing it
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // Step 3: Create and return the new user
    const userData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        age: age ? Number(age) : null,
        image: file ? file.path : '', // Prisma requires String, so fallback empty string
        role: role === 'ADMIN' ? client_1.Role.ADMIN : client_1.Role.USER, // set user role
    };
    // Step 4: Create User
    const user = await db_1.default.user.create({
        data: userData,
    });
    return (0, hidePassword_1.hidePassword)(user); // remove password from register response
};
exports.registerUser = registerUser;
/**
 * Login a user
 * 1. Check if the email exists
 * 2. Compare password with hashed password
 * 3. Generate a JWT token
 */
const loginUser = async (email, password) => {
    //  Step 1: Check if user exists with this email
    const user = await (0, userService_1.getUserEmail)(email);
    if (!user)
        throw new Error('Invalid email or password');
    //  Step 2: Compare entered password with hashed password stored in DB
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid email or password');
    //  Step 3: Generate JWT token for authentication
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' } // token validity
    );
    return {
        user: (0, hidePassword_1.hidePassword)(user), // remove password from login response
        token,
    };
};
exports.loginUser = loginUser;
