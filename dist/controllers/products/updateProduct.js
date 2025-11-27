"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductController = void 0;
// src/controllers/products/updateProduct.ts
const cloudinary_1 = __importDefault(require("@config/cloudinary"));
const db_1 = __importDefault(require("@config/db"));
const updateProductController = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const removeImages = req.body.removeImages
            ? JSON.parse(req.body.removeImages)
            : [];
        const files = req.files;
        const product = await db_1.default.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // ========== FIXED CLOUDINARY PUBLIC ID LOGIC ================
        const getPublicId = (url) => {
            const afterUpload = url.split('/upload/')[1];
            return afterUpload.split('.')[0]; // remove extension
        };
        // ============ DELETE IMAGES PROPERLY ===========
        for (const img of removeImages) {
            const publicId = getPublicId(img);
            await cloudinary_1.default.uploader.destroy(publicId);
        }
        // Upload new images
        let newUploadedImages = [];
        for (const file of files) {
            const uploadRes = await cloudinary_1.default.uploader.upload(file.path, {
                folder: 'products',
            });
            newUploadedImages.push(uploadRes.secure_url);
        }
        // ================ REBUILD IMAGE LIST  ================
        const finalImages = [
            ...product.images.filter((img) => !removeImages.includes(img)),
            ...newUploadedImages,
        ];
        const updatedProduct = await db_1.default.product.update({
            where: { id: productId },
            data: {
                images: finalImages,
            },
        });
        return res.json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.updateProductController = updateProductController;
