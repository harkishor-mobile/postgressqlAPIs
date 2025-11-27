"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/db.ts
const client_1 = require("../generated/client");
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
}); // No options allowed here
exports.default = prisma;
