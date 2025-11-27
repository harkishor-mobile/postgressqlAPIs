"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const loginUser_1 = require("@controllers/auth/loginUser");
const registerUser_1 = require("@controllers/auth/registerUser");
const upload_1 = require("@middlewares/upload");
const express_1 = require("express");
// import { upload } from '@middlewares/upload';
const router = (0, express_1.Router)();
router.post('/register', upload_1.upload.single('image'), registerUser_1.registerController);
router.post('/login', loginUser_1.loginController);
exports.default = router;
