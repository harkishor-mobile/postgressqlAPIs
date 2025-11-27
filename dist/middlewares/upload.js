"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
// src/middlewares/upload.ts
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("@config/cloudinary"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: async (req, file) => ({
        folder: 'user_profiles', // you can change folder based on route
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'], // include webp if needed
        public_id: `${Date.now()}-${file.originalname.split('.')[0]}`, // optional unique naming
    }),
});
exports.upload = (0, multer_1.default)({ storage });
