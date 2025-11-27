"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductController = void 0;
const productService = __importStar(require("@services/productService"));
const response_1 = require("@utils/response");
const statusCode_1 = __importDefault(require("@utils/statusCode"));
const cloudinary_1 = __importDefault(require("@config/cloudinary"));
const createProductController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, price, description } = req.body;
        const files = req.files;
        const images = [];
        if (files && files.length > 0) {
            for (const file of files) {
                const uploadRes = await cloudinary_1.default.uploader.upload(file.path, {
                    folder: 'products',
                });
                images.push(uploadRes.secure_url);
            }
        }
        const product = await productService.createProductService(userId, {
            name,
            price: Number(price),
            description,
            images,
            createdById: userId,
        });
        return res.status(statusCode_1.default.CREATED).json((0, response_1.successResponse)({
            message: 'Product created successfully',
            statusCode: statusCode_1.default.CREATED,
            data: product,
        }));
    }
    catch (err) {
        return res.status(statusCode_1.default.BAD_REQUEST).json((0, response_1.errorResponse)({
            message: err.message || 'Product creation failed',
            statusCode: statusCode_1.default.BAD_REQUEST,
        }));
    }
};
exports.createProductController = createProductController;
