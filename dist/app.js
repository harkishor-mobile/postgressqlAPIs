"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Routes
const authRoutes_1 = __importDefault(require("@routes/authRoutes"));
const userRoutes_1 = __importDefault(require("@routes/userRoutes"));
const addressRoutes_1 = __importDefault(require("@routes/addressRoutes"));
const productRoutes_1 = __importDefault(require("@routes/productRoutes"));
const cartRoutes_1 = __importDefault(require("@routes/cartRoutes"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
// Define Routes
app.use('/auth', authRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use('/address', addressRoutes_1.default);
app.use('/product', productRoutes_1.default);
app.use('/cart', cartRoutes_1.default);
// Root route
app.get('/', (_req, res) => {
    res.send(`<h1 style="color: blue; text-align: center; font-size: 64px; margin-top:100px;"> ✅ node-postgres-ts 🐘  Running 🏃 </h1>`);
});
exports.default = app;
