// src/config/db.ts
import { PrismaClient } from '../generated/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
}); // No options allowed here

export default prisma;
