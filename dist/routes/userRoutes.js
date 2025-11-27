"use strict";
// src/routes/userRoute.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deleteUser_1 = require("@controllers/users/deleteUser");
const getUserById_1 = require("@controllers/users/getUserById");
const getUserList_1 = require("@controllers/users/getUserList");
const updateUser_1 = require("@controllers/users/updateUser");
const getUserProfile_1 = require("@controllers/users/getUserProfile");
const authMiddleware_1 = require("@middlewares/authMiddleware");
const authorizeUser_1 = require("@middlewares/authorizeUser");
const upload_1 = require("@middlewares/upload");
const router = (0, express_1.Router)();
// Protected routes
router.get('/list', authMiddleware_1.authMiddleware, getUserList_1.getUserListController);
router.get('/:id', authMiddleware_1.authMiddleware, getUserById_1.getUserByIdController);
router.put('/:id', authMiddleware_1.authMiddleware, authorizeUser_1.authorizeUser, upload_1.upload.single('image'), updateUser_1.updateUserController);
router.get('/profile/:id', authMiddleware_1.authMiddleware, getUserProfile_1.getUserProfileController);
// Only ADMIN can delete any user
router.delete('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, deleteUser_1.deleteUserController);
exports.default = router;
