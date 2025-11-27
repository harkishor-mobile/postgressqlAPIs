// src/config/db.ts
import { PrismaClient } from '../generated/client';

const prisma = new PrismaClient(); // No options allowed here

export default prisma;
