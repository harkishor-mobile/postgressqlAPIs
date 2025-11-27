// src/utils/ensureIsAdmin.ts
import prisma from '@config/db';

//  ------------- UTILITY: ADMIN VALIDATION ------------
/**
 * ensureIsAdmin()
 * Verifies if given userId belongs to an admin.
 * - Throws descriptive error if not admin.
 */
export const ensureIsAdmin = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role !== 'ADMIN') {
    throw new Error('Unauthorized — Admin access required');
  }

  return user; // optional return
};
